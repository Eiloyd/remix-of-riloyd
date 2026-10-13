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

- Keep each detailed service layout in `src/components/services/` and select it by slug in `src/routes/services.$slug.tsx`, so service URLs retain one shared metadata and navigation route.
- Keep the Global Presence experience in its own `/global-presence` route, linked from the homepage, because it is a distinct content destination rather than a service detail.
- Keep the full company story in a dedicated `/about` route, while the homepage retains only a short About teaser, so the navigation and metadata remain clear.
- Keep market content centralized and render each country through `/global-presence/$slug`, so hub, footer and About links stay consistent.
- Keep Investors, Mentors and Team as footer-linked public pages without inventing personal profiles, so real identities can be added only from supplied information.
