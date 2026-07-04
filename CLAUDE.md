# CLAUDE.md

# AcadeMY AI Developer Guide

This document defines how every AI coding session should work.

---

# Mission

AcadeMY is building the future Education Operating System.

We are not building isolated features.

We are building reusable systems.

Every implementation should improve today's product while preparing for tomorrow's technology.

---

# Before Writing Code

Always read these documents first:

docs/ACADEMY_PRINCIPLES.md

docs/ACADEMY_ARCHITECTURE.md

docs/FEATURE_FLAGS.md

docs/DATABASE_GUIDE.md

docs/CONTENT_STANDARDS.md

---

# Development Philosophy

Always prefer:

Reusable architecture

Single source of truth

Shared business logic

Simple student experience

Scalable infrastructure

Avoid:

Duplicated logic

Hardcoded plan names

Temporary hacks

Breaking existing architecture

---

# AcadeMY Brain

The AcadeMY Brain is the single source of truth.

It owns:

Analytics

Learning History

Quiz History

Knowledge Engine

Question Bank

Recommendation Engine

Future AI Context

Do not duplicate these systems.

Extend them.

---

# Feature Flags

Never check subscription plans directly.

Correct:

hasFeature(userPlan, "parent_dashboard")

Wrong:

if (plan === "Captain")

Plans change.

Features remain.

---

# Premium Philosophy

Learning quality must remain equal.

Premium unlocks:

Insights

Reports

Analytics

Convenience

Automation

Never better educational content.

---

# AI Philosophy

Today:

Rule-based intelligence.

Knowledge Engine.

Analytics.

Recommendations.

Tomorrow:

Local AI

Cloud AI

Agentic AI

Never build architecture that depends entirely on AI.

The platform must work without AI.

---

# Database Philosophy

Every table should have one responsibility.

Examples:

quiz_history

knowledge_engine

user_progress

Future tables:

question_bank

question_attempts

content_sources

cikgu_ai_usage

Avoid duplicated information.

---

# UI Philosophy

Students:

Simple

Fun

Motivating

Parents:

Professional

Clear

Insightful

Teachers:

Efficient

Powerful

Admin:

Fast

Productive

---

# Cost Philosophy

Prefer systems that create reusable assets.

Good:

Generate 100 quiz questions.

Bad:

Call AI every time a student clicks.

Always consider operational cost.

---

# Long-Term Vision

Current Stage

Learning Platform

↓

Analytics Platform

↓

AcadeMY Brain

↓

Agentic AI

↓

Teacher Platform

↓

School Platform

↓

Education Operating System

---

# Important Rules

Never break MVP.

Never reduce learning quality.

Never duplicate business logic.

Always reuse the AcadeMY Brain.

Always reuse Feature Flags.

Always document significant architectural changes.

Think long-term.

---

# Final Principle

Build tomorrow's pillars today.

Every line of code should move AcadeMY one step closer to becoming the operating system for learning.    

## Decision Filter

Before implementing a feature, ask:

1. Does this solve a real user problem today?
2. Can this become part of the AcadeMY Brain later?
3. Can this be reused by Parents, Teachers, Schools, or AI?
4. Is there a simpler solution?
5. Will this increase long-term maintenance?
6. Does this respect AcadeMY Principles?

If the answer is "No" to most of these, reconsider the implementation.