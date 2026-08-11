-- Keep SMK abbreviation searches scoped to the official SMK school type.
-- Expanded official-name and school-code searches retain their existing scope.

begin;

create or replace function public.search_schools(
  search_query text,
  max_results integer default 12
)
returns table (
  id uuid,
  school_code text,
  school_name text,
  school_type text,
  state text,
  district text,
  postcode text
)
language sql
stable
security invoker
set search_path = ''
as $$
  with sanitized as (
    select regexp_replace(
      regexp_replace(
        lower(btrim(coalesce(search_query, ''))),
        '[%_]+',
        ' ',
        'g'
      ),
      '[[:space:]]+',
      ' ',
      'g'
    ) as term
  ),
  normalized as (
    select
      term,
      case
        when term ~ '^s[.]?[[:space:]]*m[.]?[[:space:]]+sains([[:space:]]|$)'
          then btrim(regexp_replace(
            term,
            '^s[.]?[[:space:]]*m[.]?[[:space:]]+sains[[:space:]]*',
            'sekolah menengah sains '
          ))
        when term ~ '^s[.]?[[:space:]]*m[.]?[[:space:]]*k[.]?([[:space:]]|$)'
          then btrim(regexp_replace(
            term,
            '^s[.]?[[:space:]]*m[.]?[[:space:]]*k[.]?[[:space:]]*',
            'sekolah menengah kebangsaan '
          ))
        else term
      end as name_term,
      case
        when term ~ '^s[.]?[[:space:]]*m[.]?[[:space:]]*k[.]?([[:space:]]|$)'
          then 'smk'
        when term ~ '^s[.]?[[:space:]]*m[.]?[[:space:]]+sains([[:space:]]|$)'
          then 'sm_sains'
        else null
      end as abbreviation_family
    from sanitized
  )
  select
    s.id,
    s.school_code,
    s.school_name,
    s.school_type,
    s.state,
    s.district,
    s.postcode
  from public.schools s
  cross join normalized q
  where s.active
    and char_length(q.term) >= 3
    and (
      (
        lower(s.school_name) like '%' || q.name_term || '%'
        and (q.abbreviation_family is distinct from 'smk' or s.school_type = 'SMK')
      )
      or lower(coalesce(s.school_code, '')) like '%' || q.term || '%'
    )
  order by
    case
      when lower(s.school_name) = q.name_term then 0
      when lower(s.school_name) like q.name_term || '%' then 1
      when lower(s.school_name) like '% ' || q.name_term || '%' then 2
      else 3
    end,
    s.school_name,
    s.state,
    s.district nulls last
  limit least(greatest(coalesce(max_results, 12), 1), 20);
$$;

revoke all on function public.search_schools(text, integer) from public, anon;
grant execute on function public.search_schools(text, integer) to authenticated;

comment on function public.search_schools(text, integer) is
  'Capped active-school search with conservative, type-safe SMK and SM Sains prefix expansion.';

commit;
