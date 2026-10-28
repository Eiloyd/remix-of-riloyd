<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- This remix starts with an empty Drizzle migration history; create future database changes through the migration tool rather than restoring the source project's copied migrations, so the new database has its own history.

- Keep each detailed service layout in `src/components/services/` and select it by slug in `src/routes/services.$slug.tsx`, so service URLs retain one shared metadata and navigation route.
- Keep the Global Presence experience in its own `/global-presence` route, but reach it only from the footer while it is unpublished: no header navigation item and no promoted links elsewhere, and `noindex` on both routes, so the pages stay out of sight until the user re-enables them.
- Keep the full company story in a dedicated `/about` route, while the homepage retains only a short About teaser, so the navigation and metadata remain clear.
- Keep market content centralized and render each country through `/global-presence/$slug`, so the hub and the footer country list stay consistent.
- Keep Investors, Mentors and Team as public pages; employee verification goes through security-definer database functions and admins manage records at `/admin`, so codes stay hashed and never reach the browser.
- Optimize static images offline before serving them; preserve dimensions and transparency, use lossless compression for logos, and keep the original format when conversion would increase file size, so appearance stays consistent without runtime image processing.
- Investor, Mentor and Team profiles live in the backend, are readable only by signed-in users and editable only by admins at /admin, so no sample or private profile data ships in the site code.
