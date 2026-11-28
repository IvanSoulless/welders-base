
# Welders Base 2.0

The Worker serves the application and authenticates every request for the shared catalog and PNG signatures. Staff can search, copy signatures and paste tab-separated stamp/name columns into Excel. Folder import and cropping affect the current tab. An administrator can explicitly publish those changes to the shared database.

## Local verification

Use Node.js 22 or newer and run `npm ci`, then `npm test`. For a browser check, create an ignored `.dev.vars` file with synthetic values for `SHARED_PASSWORD`, `ADMIN_PASSWORD` and `SESSION_SECRET`. Use different passwords and a session secret of at least 32 characters. Run:

```sh
npx wrangler d1 migrations apply DB --local
npm run dev
```

Open the local URL Wrangler prints. To check the installable PWA, use a browser that supports installation. Test login, browser restart with remember-me enabled, import of a synthetic PNG named `AB12 - Test Name.png`, copying and pasting into Excel, and admin publication with a second browser window. The service worker keeps a public app shell available offline. Shared data requires a network connection.

## Cloudflare setup for a coordinated cutover

1. Use a dedicated D1 database on Workers Free. Set the D1 UUID in the Wrangler configuration. Bind only the `public/` directory as Worker static assets. The catalog and PNGs are stored in D1 behind the Worker. The app accepts PNGs up to 1.9 MB. D1 Free allows 500 MB per database and temporarily rejects operations when its daily quotas are exhausted. [D1 limits](https://developers.cloudflare.com/d1/platform/limits/)
2. Apply the D1 migrations to the new environment. Configure strong, distinct `SHARED_PASSWORD` and `ADMIN_PASSWORD` values and a random `SESSION_SECRET` through Cloudflare Worker secrets. Enter secrets through Cloudflare or its CLI prompts. Changing any of these values invalidates existing sessions after the new configuration is active. The admin can also revoke all sessions immediately. Remembered sessions renew for 30 days with use. Unchecked sessions use a browser-session cookie and an eight-hour rolling server expiry. [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
3. With approval, deploy to a separate HTTPS hostname first and configure the zone to bypass cache for `/api/*`. Sign in as an admin, import the authorized PNG folder, review import errors and select **Опубликовать импорт**. An interrupted or conflicting publish can leave unpublished private images in D1. Keep track of total database storage as the catalog grows. [Static asset routing](https://developers.cloudflare.com/workers/static-assets/binding/)
4. Verify with both roles that direct catalog and signature requests return 401 after logout, that staff cannot publish, and that API responses carry `Cache-Control: private, no-store`. Verify installation, copy/paste, and the existing signature tools on the devices used by staff.
5. Coordinate the switch from the old static site. Its public copies and Git history remain subject to the access controls on the original host and repository. Restrict or retire that access through a separate approved decision, including old Pages URLs and caches. A branch commit alone cannot make previously distributed files private.

Failed login attempts share limits across roles. The Worker admits eight attempts per IP and 120 across all IPs per 60-second window. Staff behind shared network egress share the IP limit.
