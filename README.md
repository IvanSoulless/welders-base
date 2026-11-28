
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

1. Create a dedicated D1 database and private R2 bucket. Set the database UUID and bucket name in the Wrangler configuration. Disable public development URLs and public custom domains on R2. Bind only the `public/` directory as Worker static assets. [D1 configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) · [Private R2 bindings](https://developers.cloudflare.com/r2/get-started/workers-api/)
2. Apply the D1 migrations to the new environment. Configure strong, distinct `SHARED_PASSWORD` and `ADMIN_PASSWORD` values and a random `SESSION_SECRET` through Cloudflare Worker secrets. Enter secrets through Cloudflare or its CLI prompts. Changing any of these values invalidates existing sessions after the new configuration is active. The admin can also revoke all sessions immediately. Remembered sessions renew for 30 days with use. Unchecked sessions use a browser-session cookie and an eight-hour rolling server expiry. [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
3. With approval, deploy to a separate HTTPS hostname first and configure the zone to bypass cache for `/api/*`. Sign in as an admin, import the previously authorized PNG folder, review import errors and select **Опубликовать импорт**. Legacy files can also be seeded directly into private R2 as `db.json` and `signatures/<filename>`. For large catalogs verify the Worker subrequest quota. Publishing checks the R2 object for each catalog entry. An interrupted or conflicting publish can leave unreferenced private objects. Avoid deleting a referenced object. [Static asset routing](https://developers.cloudflare.com/workers/static-assets/binding/)
4. Verify with both roles that direct catalog and signature requests return 401 after logout, that staff cannot publish, and that API responses carry `Cache-Control: private, no-store`. Verify installation, copy/paste, and the existing signature tools on the devices used by staff.
5. Coordinate the switch from the old static site. Its public copies and Git history remain subject to the access controls on the original host and repository. Restrict or retire that access through a separate approved decision, including old Pages URLs and caches. A branch commit alone cannot make previously distributed files private.

Failed login attempts share limits across roles. The Worker admits eight attempts per IP and 120 across all IPs per 60-second window. Staff behind shared network egress share the IP limit.
