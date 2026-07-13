import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  checkContentLibraryBucket,
  deleteContentLibraryEntry,
  getContentLibraryEntries,
  updateContentLibraryMetadata,
  updateContentLibraryStatus,
  CONTENT_LIBRARY_BUCKET,
  type StorageBucketCheckResult,
} from './-admin.server';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type {
  ContentLibraryRow,
  ContentLibraryMetadataInput,
  ContentLibraryStatus,
} from '../lib/admin.types';
import { Panel, Pill, fmtDate } from '../components/admin/ui';

export const Route = createFileRoute('/admin/content-library')({
  loader: async () => {
    try {
      const [entries, bucketExists] = await Promise.all([
        getContentLibraryEntries({ data: {} }),
        checkContentLibraryBucket(),
      ]);
      return { entries, bucketCheck: bucketExists };
    } catch (e) {
      console.error('[admin] getContentLibraryEntries failed:', e);
      return {
        entries: [] as ContentLibraryRow[],
        bucketCheck: {
          ok: false,
          exists: false,
          reason: 'unknown',
          bucketId: CONTENT_LIBRARY_BUCKET,
          errorMessage: e instanceof Error ? e.message : 'unknown error',
          errorCode: null,
          statusCode: null,
          supabaseUrl: null,
          rawResponse: null,
          listBucketsResponse: null,
        } satisfies StorageBucketCheckResult,
      };
    }
  },
  component: ContentLibraryPage,
});

const STATUS_LABEL: Record<ContentLibraryStatus, string> = {
  uploaded: 'Uploaded',
  processing: 'Processing',
  text_extracted: 'Text Extracted',
  ready_for_generation: 'Ready for Generation',
  generated: 'Generated',
  published: 'Published',
  failed: 'Failed',
};

const SOURCE_TYPES = ['Textbook', 'Worksheet', 'Past Year Paper', 'Teacher Notes', 'Other'];
const LANGUAGES = ['Bahasa Malaysia', 'English'];

function bytesToSize(bytes: number): string {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function serializeSupabaseError(error: unknown) {
  if (!error || typeof error !== 'object') return null;
  const maybe = error as {
    code?: unknown;
    message?: unknown;
    details?: unknown;
    hint?: unknown;
  };
  return {
    code: typeof maybe.code === 'string' || typeof maybe.code === 'number' ? maybe.code : null,
    message: typeof maybe.message === 'string' ? maybe.message : null,
    details: typeof maybe.details === 'string' ? maybe.details : null,
    hint: typeof maybe.hint === 'string' ? maybe.hint : null,
  };
}

const EMPTY_METADATA: ContentLibraryMetadataInput = {
  title: '',
  subject: '',
  form: '',
  chapter: '',
  topic: '',
  language: '',
  source_type: '',
  tags: [],
};

function ContentLibraryPage() {
  const { entries: initialEntries, bucketCheck } = Route.useLoaderData() as {
    entries: ContentLibraryRow[];
    bucketCheck: StorageBucketCheckResult;
  };

  const [entries, setEntries] = useState<ContentLibraryRow[]>(initialEntries);
  const [dragActive, setDragActive] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ContentLibraryMetadataInput>(EMPTY_METADATA);
  const [editingRow, setEditingRow] = useState<ContentLibraryRow | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(() => {
    getContentLibraryEntries({ data: {} })
      .then(setEntries)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  function pickFile(file: File) {
    setPendingFile(file);
    setMetadata({ ...EMPTY_METADATA, title: file.name.replace(/\.[^.]+$/, '') });
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) pickFile(file);
  }

  async function confirmUpload() {
    if (!pendingFile || !metadata.title.trim()) return;
    setUploading(true);
    try {
      const path = `${Date.now()}-${pendingFile.name}`;
      console.log('[content-library] upload step start', {
        step: 'file_selected',
        file_name: pendingFile.name,
        file_type: pendingFile.type || 'application/octet-stream',
        file_size: pendingFile.size,
        bucket: CONTENT_LIBRARY_BUCKET,
        path,
      });
      const { data: authData } = await supabase.auth.getUser();
      console.log('[content-library] upload step complete', {
        step: 'auth.getUser',
        auth_uid: authData.user?.id ?? null,
        auth_email: authData.user?.email ?? null,
        has_session: Boolean(authData.user),
      });
      console.log('[content-library] browser upload context', {
        auth_uid: authData.user?.id ?? null,
        auth_email: authData.user?.email ?? null,
        query: {
          table: 'storage.objects',
          operation: 'upload',
          bucket: CONTENT_LIBRARY_BUCKET,
          path,
        },
      });
      console.log('[upload] storage start', {
        bucket: CONTENT_LIBRARY_BUCKET,
        object_path: path,
      });
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(CONTENT_LIBRARY_BUCKET)
        .upload(path, pendingFile);
      console.log('[upload] storage result', {
        bucket: CONTENT_LIBRARY_BUCKET,
        object_path: path,
        data: uploadData ?? null,
        error: serializeSupabaseError(uploadError),
      });
      if (uploadError) {
        console.error('[content-library] storage upload failed', {
          bucket: CONTENT_LIBRARY_BUCKET,
          object_path: path,
          error: serializeSupabaseError(uploadError),
        });
        throw uploadError;
      }

      console.log('[upload] metadata insert start', {
        bucket: CONTENT_LIBRARY_BUCKET,
        object_path: path,
      });
      const insertQuery = "from('content_library').insert({...}).select('*').single()";
      const insertPayload = {
        file_path: path,
        file_name: pendingFile.name,
        file_type: pendingFile.type || 'application/octet-stream',
        file_size: pendingFile.size,
        title: metadata.title,
        subject: metadata.subject ?? null,
        form: metadata.form ?? null,
        chapter: metadata.chapter ?? null,
        topic: metadata.topic ?? null,
        language: metadata.language ?? null,
        source_type: metadata.source_type ?? null,
        tags: metadata.tags ?? [],
        status: 'uploaded',
        uploaded_by: authData.user?.id ?? null,
      };
      const { data: createdEntry, error: insertError } = await supabase
        .from('content_library')
        .insert(insertPayload)
        .select('*')
        .single();
      console.log('[upload] metadata insert result', {
        table: 'content_library',
        query: insertQuery,
        data: createdEntry ?? null,
        count: createdEntry ? 1 : 0,
        error: serializeSupabaseError(insertError),
      });
      if (insertError) {
        console.error('[content-library] content_library insert failed', {
          table: 'content_library',
          query: insertQuery,
          data: createdEntry ?? null,
          count: createdEntry ? 1 : 0,
          error: serializeSupabaseError(insertError),
        });
        throw insertError;
      }
      setToast(`Uploaded "${pendingFile.name}"`);
      setPendingFile(null);
      setMetadata(EMPTY_METADATA);
      refresh();
    } catch (e) {
      console.error('[content-library] upload failed:', e);
      console.error('[content-library] upload failed raw error object', e);
      setToast(`Upload failed: ${e instanceof Error ? e.message : 'unknown error'}`);
    } finally {
      setUploading(false);
    }
  }

  async function saveMetadataEdit() {
    if (!editingRow) return;
    try {
      await updateContentLibraryMetadata({ data: { id: editingRow.id, metadata } });
      setEditingRow(null);
      refresh();
      setToast('Metadata updated');
    } catch (e) {
      setToast(`Update failed: ${e instanceof Error ? e.message : 'unknown error'}`);
    }
  }

  async function handleDelete(row: ContentLibraryRow) {
    if (!confirm(`Delete "${row.title}"? This removes the file and its record permanently.`)) return;
    try {
      await deleteContentLibraryEntry({ data: { id: row.id, file_path: row.file_path } });
      refresh();
      setToast('Deleted');
    } catch (e) {
      setToast(`Delete failed: ${e instanceof Error ? e.message : 'unknown error'}`);
    }
  }

  async function handleProcessFile(row: ContentLibraryRow) {
    // Text-extraction pipeline isn't wired up yet — this only advances the
    // status so the UI/DB shape is exercised end-to-end ahead of the real
    // OCR/parse step landing later.
    try {
      await updateContentLibraryStatus({ data: { id: row.id, status: 'processing' } });
      refresh();
      setToast('Marked as Processing (pipeline coming soon)');
    } catch (e) {
      setToast(`Failed: ${e instanceof Error ? e.message : 'unknown error'}`);
    }
  }

  function pipelineComingSoon(label: string) {
    setToast(`${label} — pipeline coming soon`);
  }

  async function handlePreview(row: ContentLibraryRow) {
    if (!isSupabaseConfigured) return;
    const { data } = await supabase.storage
      .from(CONTENT_LIBRARY_BUCKET)
      .createSignedUrl(row.file_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, '_blank', 'noopener');
  }

  if (!bucketCheck.ok) {
    return (
      <div className="admin-content">
        <Panel title="Content · Content Library">
          <div className="setup-notice">
            <h2>⚠ Supabase Storage check failed</h2>
            <p style={{ marginBottom: 12 }}>
              The app could not confirm the <code>content-library</code> bucket. This panel shows
              the actual Supabase response instead of collapsing everything into a missing-bucket
              message.
            </p>
            <pre>{`Bucket:       ${bucketCheck.bucketId}
Reason:       ${bucketCheck.reason}
Status:       ${bucketCheck.statusCode ?? 'n/a'}
Code:         ${bucketCheck.errorCode ?? 'n/a'}
Message:      ${bucketCheck.errorMessage ?? 'n/a'}
Supabase URL: ${bucketCheck.supabaseUrl ?? 'n/a'}`}</pre>
            <pre>{`Raw response:
${JSON.stringify(bucketCheck.rawResponse, null, 2)}

listBuckets():
${JSON.stringify(bucketCheck.listBucketsResponse, null, 2)}`}</pre>
            <p style={{ marginTop: 12, color: 'var(--muted)', fontSize: 12.5 }}>
              If this says <code>missing_bucket</code>, the bucket truly is absent. If it says{' '}
              <code>permission_denied</code>, the storage policy or auth context is the issue. If it
              says <code>wrong_project</code>, the app is pointed at a different Supabase project.
              If it says <code>network_error</code>, the request never reached Supabase
              successfully.
            </p>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div className="admin-content">
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 26, zIndex: 60 }}>
          <div className="chip chip-orange" style={{ position: 'static', padding: '8px 14px' }}>
            {toast}
          </div>
        </div>
      )}

      <Panel
        title="Content · Content Library"
        badge={<span className="chip chip-orange">{entries.length} files</span>}
      >
        <p style={{ marginBottom: 16 }}>
          Upload raw source material — the intake step for the Notes/Quiz/Flashcard/Mindmap
          generation pipeline.
        </p>

        <div
          className={`dropzone ${dragActive ? 'active' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div>📤 Drag & drop a file here, or click to browse</div>
          <div className="hint">PDF, image, DOCX, or TXT</div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.docx,.txt"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) pickFile(file);
              e.target.value = '';
            }}
          />
        </div>
      </Panel>

      <Panel title="Files">
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject / Form / Chapter</th>
                <th>File</th>
                <th>Status</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((row) => (
                <tr key={row.id}>
                  <td><span className="cell-name"><span className="nm">{row.title}</span></span></td>
                  <td style={{ color: 'var(--muted)' }}>
                    {[row.subject, row.form, row.chapter].filter(Boolean).join(' · ') || '—'}
                  </td>
                  <td style={{ color: 'var(--muted)' }}>
                    {row.file_name} <span style={{ color: 'var(--faint)' }}>({bytesToSize(row.file_size)})</span>
                  </td>
                  <td><Pill kind={row.status}>{STATUS_LABEL[row.status]}</Pill></td>
                  <td style={{ color: 'var(--muted)' }}>{fmtDate(row.created_at)}</td>
                  <td>
                    <div className="file-actions">
                      <button className="btn" onClick={() => handlePreview(row)}>Preview</button>
                      <button
                        className="btn"
                        onClick={() => {
                          setEditingRow(row);
                          setMetadata({
                            title: row.title,
                            subject: row.subject ?? '',
                            form: row.form ?? '',
                            chapter: row.chapter ?? '',
                            topic: row.topic ?? '',
                            language: row.language ?? '',
                            source_type: row.source_type ?? '',
                            tags: row.tags,
                          });
                        }}
                      >
                        Edit metadata
                      </button>
                      <button className="btn" onClick={() => handleProcessFile(row)}>Process file</button>
                      <button className="btn" onClick={() => pipelineComingSoon('Generate Notes')}>Generate Notes</button>
                      <button className="btn" onClick={() => pipelineComingSoon('Generate Quiz')}>Generate Quiz</button>
                      <button className="btn" onClick={() => pipelineComingSoon('Generate Flashcards')}>Generate Flashcards</button>
                      <button className="btn" onClick={() => pipelineComingSoon('Generate Mindmap')}>Generate Mindmap</button>
                      <button className="btn" onClick={() => pipelineComingSoon('Publish')}>Publish</button>
                      <button className="btn" style={{ color: 'var(--red)' }} onClick={() => handleDelete(row)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!entries.length && (
                <tr>
                  <td colSpan={6}>
                    <div className="empty">No files uploaded yet.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* ── Upload metadata modal ── */}
      {pendingFile && (
        <div className="modal-backdrop" onClick={() => !uploading && setPendingFile(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <h2>Upload "{pendingFile.name}"</h2>
            <MetadataForm metadata={metadata} setMetadata={setMetadata} />
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setPendingFile(null)} disabled={uploading}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmUpload} disabled={uploading || !metadata.title.trim()}>
                {uploading ? 'Uploading…' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit metadata modal ── */}
      {editingRow && (
        <div className="modal-backdrop" onClick={() => setEditingRow(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <h2>Edit metadata</h2>
            <MetadataForm metadata={metadata} setMetadata={setMetadata} />
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setEditingRow(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveMetadataEdit} disabled={!metadata.title.trim()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetadataForm({
  metadata,
  setMetadata,
}: {
  metadata: ContentLibraryMetadataInput;
  setMetadata: (m: ContentLibraryMetadataInput) => void;
}) {
  return (
    <div className="form-grid">
      <div className="form-field full">
        <label>Title</label>
        <input value={metadata.title} onChange={(e) => setMetadata({ ...metadata, title: e.target.value })} />
      </div>
      <div className="form-field">
        <label>Subject</label>
        <input value={metadata.subject ?? ''} onChange={(e) => setMetadata({ ...metadata, subject: e.target.value })} />
      </div>
      <div className="form-field">
        <label>Form level</label>
        <input value={metadata.form ?? ''} onChange={(e) => setMetadata({ ...metadata, form: e.target.value })} />
      </div>
      <div className="form-field">
        <label>Chapter</label>
        <input value={metadata.chapter ?? ''} onChange={(e) => setMetadata({ ...metadata, chapter: e.target.value })} />
      </div>
      <div className="form-field">
        <label>Topic</label>
        <input value={metadata.topic ?? ''} onChange={(e) => setMetadata({ ...metadata, topic: e.target.value })} />
      </div>
      <div className="form-field">
        <label>Language</label>
        <select value={metadata.language ?? ''} onChange={(e) => setMetadata({ ...metadata, language: e.target.value })}>
          <option value="">—</option>
          {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div className="form-field">
        <label>Source type</label>
        <select value={metadata.source_type ?? ''} onChange={(e) => setMetadata({ ...metadata, source_type: e.target.value })}>
          <option value="">—</option>
          {SOURCE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-field full">
        <label>Tags (comma separated)</label>
        <input
          value={(metadata.tags ?? []).join(', ')}
          onChange={(e) =>
            setMetadata({
              ...metadata,
              tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
            })
          }
        />
      </div>
    </div>
  );
}
