## Findings

The live homepage/header sign-in buttons do not call Google directly. They open the sign-in modal, and the modal's Google button calls the shared auth handler.

Exact live click path:

```text
src/components/HomeDashboard.tsx:648
onClick={openSignIn}
  -> src/context/sign-in-modal.tsx:23
     <SignInModal open={isOpen} onClose={close} />
  -> src/components/SignInModal.tsx:150
     onClick={handleGoogle}
  -> src/components/SignInModal.tsx:63
     await signInWithGoogle()
  -> src/context/auth-context.tsx:106
     supabase.auth.signInWithOAuth(...)
```

There is also a legacy `/login` page button:

```text
src/routes/login.tsx:200
onClick={handleGoogle}
  -> src/routes/login.tsx:83
     await signInWithGoogle()
  -> src/context/auth-context.tsx:106
     supabase.auth.signInWithOAuth(...)
```

## Plan

1. Edit only `src/context/auth-context.tsx`, because it is the real shared handler used by both visible Google buttons.
2. Keep the UI unchanged.
3. Remove the brittle `skipBrowserRedirect: true` manual redirect flow from the OAuth call.
4. Ensure the actual OAuth request uses exactly:

```ts
redirectTo: `${window.location.origin}/auth/callback`
```

inside `options` passed to `supabase.auth.signInWithOAuth`.
5. Preserve `queryParams: { prompt: "select_account" }` unless it conflicts with redirect behavior.
6. Verify by inspecting the resulting handler and, if possible, checking the generated OAuth URL path uses `/auth/callback` instead of the site root hash flow.