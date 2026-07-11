# AcadeMY Knowledge Library

## 1. Purpose

The AcadeMY Knowledge Library is the approved academic knowledge source for:

- automatic quiz generation
- shuffled paid quizzes
- Cikgu AI answers
- flashcard generation
- explanations
- weak-topic revision
- future learning recommendations

Only approved content may be used in live student features.

---

## 2. System Responsibilities

### Supabase

Supabase is the source of truth.

It stores:

- original files
- document metadata
- content approval status
- question bank
- quiz sessions
- question attempts
- user subscriptions
- generation jobs

### Pinecone

Pinecone is the semantic search layer.

It stores:

- text chunks
- vector embeddings
- searchable metadata
- references to original documents

Pinecone does not permanently manage quizzes.

### n8n

n8n is the automation layer.

It handles:

- file ingestion
- PDF text extraction
- content cleaning
- text splitting
- embedding generation
- Pinecone indexing
- question generation
- validation
- duplicate checking
- background question expansion

### AcadeMY

The AcadeMY application handles:

- admin uploads
- subscription access
- quiz delivery
- question shuffling
- answer shuffling
- scores
- quiz history
- student analytics

---

## 3. Supported Subjects

- Bahasa Melayu
- English
- Mathematics
- Science
- Sejarah
- Geography

Supported forms:

- Form 1
- Form 2
- Form 3

---

## 4. Content Types

### Academic sources

- textbook
- AcadeMY note
- chapter summary
- reference material
- worked example
- teacher material
- approved external educational content

### Assessment sources

- existing AcadeMY question
- question bank
- exam paper
- trial paper
- answer scheme
- model answer
- exam reference

### Revision sources

- flashcard
- key fact
- explanation
- common mistake
- weak-topic revision content

---

## 5. Standard Source Type Values

Use these exact values:

- textbook
- academy_note
- reference
- exam_paper
- trial_paper
- answer_scheme
- question_bank
- flashcard
- teacher_material
- generated_question

---

## 6. Library Structure

Example:

```text
AcadeMY Knowledge Library
└── Sejarah
    └── Form 1
        └── Chapter 1
            ├── Textbook
            ├── AcadeMY Notes
            ├── References
            ├── Existing Questions
            ├── Exam Papers
            ├── Answer Schemes
            ├── Flashcards
            └── Generated Questions