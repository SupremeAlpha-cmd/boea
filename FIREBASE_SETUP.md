# BOEA Firebase setup — admin auth + live CMS

This branch replaces the old client-side admin password and the hardcoded
livestream passkeys with Firebase Authentication + Realtime Database. Until
these steps are done, the site keeps working on bundled defaults and the
admin portal shows "Firebase is not connected" instead of letting anyone in.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com → Add project (any name, e.g. `boea-site`).
2. **Build → Realtime Database → Create database** → Start in **test mode** for
   now (you will lock it down in step 4), choose a region.
3. **Build → Authentication → Sign-in method → Email/Password → Enable.**
4. **Build → Authentication → Users → Add user** — this is the admin account.
   Use a real email the admin controls and a strong password. There is no
   password anywhere in the repo anymore; this console user is the only key.
5. **Project Settings → Your apps → Web app (`</>`) → Register app** and copy
   the config values.

## 2. Set the environment variables

Locally, create `.env` (never committed — it is gitignored) from
`.env.example` and fill in all five values:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

On Vercel: Project → Settings → Environment Variables → add the same five,
then redeploy. The admin login stays disabled until a deployed build has them.

## 3. Publish the database rules

In the console: **Realtime Database → Rules → paste `database.rules.json`**
from this repo → Publish. Or with the Firebase CLI:

```bash
firebase deploy --only database
```

What the rules mean:

- `cms/*` — public read, **admin-only write**. This is the live content:
  sponsors, gallery, blog, recipients, stream config, passkey hashes.
- `admin/*` — admin-only read/write (audit trail).
- `pageviews` — anyone may append (analytics tracking), admin-only read.

## 4. First sign-in + fresh passkeys

1. Deploy, open `/admin`, sign in with the console user from step 1.
2. Go to **Live Stream PPV → Passkey Manager** and generate fresh passkeys.
   Each code is shown **once** — copy it immediately and send it to its
   holder. Only the SHA-256 hash is stored; a code cannot be recovered
   afterwards, only revoked and re-generated.
3. **Old built-in passkeys no longer work.** Anyone holding one needs a new
   code from the admin. This is deliberate: the old codes shipped in the
   public JS bundle, so they must be treated as compromised.
4. Re-publish anything the admin previously "saved" — old admin edits lived
   only in that browser's localStorage and never reached visitors. The first
   save from the new portal publishes that collection to everyone.

## 5. What changed, honestly

- **Admin login** is now real: Firebase Auth email + password, with
  re-authentication required for password changes. Sessions persist per the
  "remember me" choice (7 days local, session-only otherwise).
- **Passkeys** are hashes, not codes, and generated codes are long random
  strings — but hashes sit on a public-read path (visitors must verify
  against them), so a short or guessable code could still be brute-forced
  offline. The generator no longer makes short codes. If passkeys ever need
  to be truly secret, the next step is a server-side check (Cloud Function)
  instead of client-side hash comparison — that is a follow-up, not
  something this branch pretends to have done.
- **Purchased PPV passes** are still local receipts (from the checkout
  flow), unchanged by this branch.
- **If Firebase is down or unconfigured**, public pages fall back to bundled
  defaults + last cached copy, and admin saves warn "saved on this browser
  only" instead of silently pretending to publish.

## 6. Rollback

Merging this branch is the point of no return for the old admin password:
once deployed, the old password and old passkeys stop working everywhere.
To roll back, redeploy `main` — but note the old credentials were public in
the bundle, so rollback restores a known-weak gate, not a safe one.
