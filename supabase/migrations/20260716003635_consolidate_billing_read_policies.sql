begin;

drop policy if exists "Users can read own subscriptions" on public.subscriptions;
drop policy if exists "Admins can read all subscriptions" on public.subscriptions;
drop policy if exists "Users can read own payment transactions" on public.payment_transactions;
drop policy if exists "Admins can read all payment transactions" on public.payment_transactions;
drop policy if exists "Users can read own invoices" on public.invoices;
drop policy if exists "Admins can read all invoices" on public.invoices;

create policy "Users or admins can read subscriptions" on public.subscriptions
  for select to authenticated
  using ((select auth.uid()) = user_id or (select public.is_admin()));

create policy "Users or admins can read payment transactions" on public.payment_transactions
  for select to authenticated
  using ((select auth.uid()) = user_id or (select public.is_admin()));

create policy "Users or admins can read invoices" on public.invoices
  for select to authenticated
  using ((select auth.uid()) = user_id or (select public.is_admin()));

commit;
