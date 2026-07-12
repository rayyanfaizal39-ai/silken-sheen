# AcadeMY Content Pipeline

## 1. Purpose

The content pipeline defines how educational files become approved knowledge and quiz questions inside AcadeMY.

The pipeline must support:

- textbooks
- AcadeMY notes
- exam papers
- trial papers
- answer schemes
- question banks
- flashcards
- reference materials
- approved educational content

---

## 2. Main Pipeline

```text
Content File
    ↓
Upload
    ↓
Store Original File
    ↓
Create Document Record
    ↓
Extract Text
    ↓
Clean Text
    ↓
Classify Content
    ↓
Split into Chunks
    ↓
Add Metadata
    ↓
Create Embeddings
    ↓
Store in Pinecone
    ↓
Generate Questions
    ↓
Validate Questions
    ↓
Save to Supabase
    ↓
Approve
    ↓
Publish to Students