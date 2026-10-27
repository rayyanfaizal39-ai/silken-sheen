-- REVIEW / STAGING ONLY. Do not run against production without approval.
-- Install pg_cron + pg_net and store these secrets in Vault first:
-- nova_project_url = the existing project's URL
-- nova_worker_secret = a dedicated random secret of at least 32 characters,
--                      identical to NOVA_WORKER_SECRET in the Edge Function.
-- No keys or project identifiers are embedded in this repository.
-- One tick collects completed batches and submits a bounded new group.
select cron.schedule('nova-batch-submit-collect','*/10 * * * *',$$
  select net.http_post(
    url:=(select decrypted_secret from vault.decrypted_secrets where name='nova_project_url')||'/functions/v1/nova-batch-worker',
    headers:=jsonb_build_object('Content-Type','application/json','x-nova-worker-secret',
      (select decrypted_secret from vault.decrypted_secrets where name='nova_worker_secret')),
    body:='{}'::jsonb,timeout_milliseconds:=120000
  );
$$);
-- Kill schedule: select cron.unschedule('nova-batch-submit-collect');
