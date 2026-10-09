-- Mathematics Form 1 objective quiz audit: metadata only.
-- Eight Form 1 Maths objective banks were repaired to 30 questions each
-- (missing BM/DLP pairs added; one unpaired extra Chapter 12 item removed).
-- complete_catalog_quiz() checks correct answers per difficulty against these
-- counts, so the rows must match the live banks. Values come from
-- buildQuizCatalog(); max_xp follows the unchanged 'objective' formula
-- (15 per Easy, 25 per Medium, 35 per Hard, plus 25 pass bonus).
-- No other rows, legacy key mappings, functions or schema are touched.

do $$
declare
  ready integer;
begin
  -- Each row must be an active Form 1 Maths objective row in exactly its
  -- pre-audit state, or already in its corrected state (re-run is a no-op).
  select count(*) into ready
  from public.quiz_catalog as catalog
  join (values
    ('quiz-v2:math-objective:math:form-1:chapter-7:bm:objective-2',   'Chapter 7',  'bm',  29, 0, 29, 0, 750,  30, 0, 30, 0, 775),
    ('quiz-v2:math-objective:math:form-1:chapter-9:bm:objective-2',   'Chapter 9',  'bm',  29, 0, 29, 0, 750,  30, 0, 30, 0, 775),
    ('quiz-v2:math-objective:math:form-1:chapter-10:bm:objective-2',  'Chapter 10', 'bm',  29, 0, 29, 0, 750,  30, 0, 30, 0, 775),
    ('quiz-v2:math-objective:math:form-1:chapter-9:bm:objective-3',   'Chapter 9',  'bm',  29, 0, 0, 29, 1040, 30, 0, 0, 30, 1075),
    ('quiz-v2:math-objective:math:form-1:chapter-10:bm:objective-3',  'Chapter 10', 'bm',  29, 0, 0, 29, 1040, 30, 0, 0, 30, 1075),
    ('quiz-v2:math-objective:math:form-1:chapter-13:dlp:objective-3', 'Chapter 13', 'dlp', 29, 0, 0, 29, 1040, 30, 0, 0, 30, 1075),
    ('quiz-v2:math-objective:math:form-1:chapter-8:dlp:objective-3',  'Chapter 8',  'dlp', 28, 0, 0, 28, 1005, 30, 0, 0, 30, 1075),
    ('quiz-v2:math-objective:math:form-1:chapter-12:bm:objective-3',  'Chapter 12', 'bm',  31, 0, 0, 31, 1110, 30, 0, 0, 30, 1075)
  ) as expected (quiz_key, chapter_key, lang,
                 old_total, old_easy, old_medium, old_hard, old_max_xp,
                 new_total, new_easy, new_medium, new_hard, new_max_xp)
    on catalog.quiz_key = expected.quiz_key
  where catalog.is_active
    and catalog.kind = 'math-objective'
    and catalog.formula = 'objective'
    and catalog.subject_id = 'math'
    and catalog.form = 1
    and catalog.chapter_key = expected.chapter_key
    and catalog.lang = expected.lang
    and catalog.timer_bonus_allowed = false
    and (
      (catalog.total_questions, catalog.easy_count, catalog.medium_count, catalog.hard_count, catalog.max_xp)
        = (expected.old_total, expected.old_easy, expected.old_medium, expected.old_hard, expected.old_max_xp)
      or (catalog.total_questions, catalog.easy_count, catalog.medium_count, catalog.hard_count, catalog.max_xp)
        = (expected.new_total, expected.new_easy, expected.new_medium, expected.new_hard, expected.new_max_xp)
    );
  if ready <> 8 then
    raise exception 'Expected eight active Form 1 Maths objective quiz catalog rows in their known state, found %', ready;
  end if;
end $$;

update public.quiz_catalog as catalog
set total_questions = corrected.total_questions,
    easy_count = corrected.easy_count,
    medium_count = corrected.medium_count,
    hard_count = corrected.hard_count,
    max_xp = corrected.max_xp,
    updated_at = now()
from (values
    ('quiz-v2:math-objective:math:form-1:chapter-7:bm:objective-2',   30, 0, 30, 0, 775),
    ('quiz-v2:math-objective:math:form-1:chapter-9:bm:objective-2',   30, 0, 30, 0, 775),
    ('quiz-v2:math-objective:math:form-1:chapter-10:bm:objective-2',  30, 0, 30, 0, 775),
    ('quiz-v2:math-objective:math:form-1:chapter-9:bm:objective-3',   30, 0, 0, 30, 1075),
    ('quiz-v2:math-objective:math:form-1:chapter-10:bm:objective-3',  30, 0, 0, 30, 1075),
    ('quiz-v2:math-objective:math:form-1:chapter-13:dlp:objective-3', 30, 0, 0, 30, 1075),
    ('quiz-v2:math-objective:math:form-1:chapter-8:dlp:objective-3',  30, 0, 0, 30, 1075),
    ('quiz-v2:math-objective:math:form-1:chapter-12:bm:objective-3',  30, 0, 0, 30, 1075)
) as corrected (quiz_key, total_questions, easy_count, medium_count, hard_count, max_xp)
where catalog.quiz_key = corrected.quiz_key
  and catalog.is_active
  and catalog.kind = 'math-objective'
  and catalog.subject_id = 'math'
  and catalog.form = 1;
