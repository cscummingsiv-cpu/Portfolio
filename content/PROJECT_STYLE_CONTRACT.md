# Project Page Style Contract

All project detail pages must follow this contract for consistency, compression, and outcome-first narrative.

---

## Overall Tone

- **Operator-led, outcome-first**
- Reads like: "Here's the system. Here's why it mattered. Here's the impact."
- Avoid marketing fluff, resume phrasing, or internal-doc verbosity

---

## Required Section Order

```
1. Project Identity + Category (top)
2. Problem / Solution (concise, above the fold)
3. Outcome (primary emphasis, visually dominant)
4. System Architecture (high-level, non-generic)
```

**Outcome is the visual anchor. It appears after Problem/Solution but is the most prominent section on the page.**

---

## Section-by-Section Rules

### 1. Project Identity + Category

**Purpose:** Establish what category of system this is.

**Rules:**
- Title: Clear, specific name
- Category label: One of `Content Production`, `Revenue Operations`, `Data & Analytics`, `GTM Systems`
- Description: Max **20 words**, includes primary metric or scale
- Stack tags: 4–5 max, ordered by importance

---

### 2. Problem / Solution (Two-Column)

**Purpose:** Concise constraint + system description above the fold.

**Problem rules:**
- Max **2 sentences**
- State the constraint that prevented scale/speed
- No implementation details

**Solution rules:**
- Max **2 sentences**
- Describe what the system does architecturally
- No repetition of Problem language

---

### 3. Outcome (PRIMARY SECTION)

**Purpose:** Business results. Visually dominant. This is what the visitor remembers.

**Rules:**
- **Metrics first**: Large, centered, max 2 metrics
- **Impact statement**: 1–2 sentences, declarative
- Each metric appears **once** (not repeated in prose)
- Prefer declarative statements: "Enabled $20M+ growth" over "The platform helped enable..."

**Metric priority:**
1. Revenue impact ($20M+)
2. Time saved (50+ hrs/week)
3. Output multiplier (2x)
4. Speed improvement (24h → instant)
5. Cost savings ($5K/month)

---

### 4. System Architecture

**Purpose:** How the system works at a high level.

**Rules:**
- 5–6 steps max
- Each step: **Strong verb** + **why it matters**
- No filler words: ~~leverages~~, ~~utilizes~~, ~~end-to-end~~
- No adjectives: ~~robust~~, ~~scalable~~, ~~powerful~~

**Good step format:**
```
Pull — Fetches daily revenue data from Sheets and BigQuery
Compute — Calculates day-over-day deltas by vertical
Flag — Identifies movers, missing data, and deal state changes
```

**Bad step format:**
```
Data Collection — Leverages robust data pipelines to collect information
Processing — Utilizes advanced processing capabilities
```

---

## Deduplication Rules

| Rule | Enforcement |
|------|-------------|
| Each metric appears **once** | In Outcome section only |
| No phrase repeated on same page | Check before publishing |
| No implementation trivia | Unless it directly explains impact |

---

## Forbidden Language

| Forbidden | Why | Replace With |
|-----------|-----|--------------|
| "Foundational" | Marketing fluff | Omit |
| "Enabling teams to" | Passive | Direct impact statement |
| "Leverages" / "Utilizes" | Corporate speak | "Uses" or just the verb |
| "End-to-end" | Overused | Describe the actual scope |
| "Robust" / "Scalable" | Empty adjectives | Show scale via metrics |
| "Helped to..." | Hedging | "Enabled" or "Saved" |
| "60+ workflows" in Outcome | Implementation trivia | Focus on output/revenue |

---

## Quality Checklist

Before publishing any project page:

- [ ] Category label is present and consistent with taxonomy
- [ ] Description ≤ 20 words with metric or scale
- [ ] Problem ≤ 2 sentences, states constraint
- [ ] Solution ≤ 2 sentences, architectural level
- [ ] Outcome has max 2 large metrics, centered
- [ ] Outcome statement is declarative, not descriptive
- [ ] No metric appears more than once on page
- [ ] System Architecture steps use strong verbs
- [ ] No forbidden language
- [ ] No repeated phrases

---

*Last updated: January 2025*
