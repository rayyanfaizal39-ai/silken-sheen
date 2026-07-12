# AcadeMY Brain Database

## 1. Purpose

Supabase is the source of truth for AcadeMY Brain.

It stores:

- uploaded content records
- original file locations
- processing status
- generated notes
- generated quiz questions
- generated flashcards
- approvals
- quiz sessions
- student attempts
- AI generation jobs

Pinecone is used only for semantic search and retrieval.

n8n is used only for automation and processing.

---

# 2. Main Data Flow

```text
Uploaded File
    ↓
content_documents
    ↓
n8n processing
    ↓
Pinecone chunks
    ↓
generated_notes
question_bank
flashcards
    ↓
approval
    ↓
published content
    ↓
student quiz sessions
