import type { AdminFilters } from '../../lib/admin.types';

const SUBJECTS = ['Mathematics', 'Science', 'Biology', 'Physics', 'Chemistry', 'Sejarah', 'Bahasa Melayu', 'English'];
const FORMS = ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5'];

export function Filters({
  value,
  onChange,
  onApply,
  onReset,
}: {
  value: AdminFilters;
  onChange: (next: AdminFilters) => void;
  onApply: () => void;
  onReset: () => void;
}) {
  const set = (patch: Partial<AdminFilters>) => onChange({ ...value, ...patch });

  return (
    <div className="filter-bar">
      <div className="filter-field">
        <label>From</label>
        <input
          type="date"
          value={value.start ?? ''}
          onChange={(e) => set({ start: e.target.value || null })}
        />
      </div>
      <div className="filter-field">
        <label>To</label>
        <input
          type="date"
          value={value.end ?? ''}
          onChange={(e) => set({ end: e.target.value || null })}
        />
      </div>
      <div className="filter-field">
        <label>Subject</label>
        <select value={value.subject ?? ''} onChange={(e) => set({ subject: e.target.value || null })}>
          <option value="">All</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="filter-field">
        <label>Form</label>
        <select value={value.form ?? ''} onChange={(e) => set({ form: e.target.value || null })}>
          <option value="">All</option>
          {FORMS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div className="filter-field">
        <label>Plan</label>
        <select value={value.plan ?? ''} onChange={(e) => set({ plan: (e.target.value || null) as AdminFilters['plan'] })}>
          <option value="">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <div className="filter-field">
        <label>Role</label>
        <select value={value.role ?? ''} onChange={(e) => set({ role: (e.target.value || null) as AdminFilters['role'] })}>
          <option value="">All</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={onApply}>Apply</button>
      <button className="btn btn-ghost" onClick={onReset}>Reset</button>
    </div>
  );
}
