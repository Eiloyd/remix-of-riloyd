import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initials, peopleGroups, type PersonGroup, type PersonProfile } from "@/lib/people-config";

const profileRoutes = {
  investors: "/investors/$slug",
  mentors: "/mentors/$slug",
  team: "/team/$slug",
} as const;

const listRoutes = { investors: "/investors", mentors: "/mentors", team: "/team" } as const;

export function ProfileGrid({ group }: { group: PersonGroup }) {
  const config = peopleGroups[group];
  return <section className="border-b border-border py-14 sm:py-20">
    <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-12">
      <p className="eyebrow text-[10px] font-bold uppercase text-soft">Profiles</p>
      <h2 className="mt-4 text-3xl font-black uppercase sm:text-5xl">{config.label}</h2>
      <p className="mt-3 text-xs text-muted-foreground">Sample profiles shown — real profiles will be added soon.</p>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {config.profiles.map((p) => <Link key={p.slug} to={profileRoutes[group]} params={{ slug: p.slug }} className="group border border-border bg-surface p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <div className="flex items-center gap-4"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-black text-primary-foreground">{initials(p.name)}</span><div><h3 className="font-extrabold">{p.name}</h3><p className="text-xs text-muted-foreground">{p.role}</p></div></div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-primary">View profile <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></span>
        </Link>)}
      </div>
    </div>
  </section>;
}

export function ProfileDetail({ group, profile }: { group: PersonGroup; profile: PersonProfile }) {
  const config = peopleGroups[group];
  return <main className="bg-background text-foreground">
    <section className="border-b border-border py-14 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-6">
        <Link to={listRoutes[group]} className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary"><ArrowLeft size={14} /> Back to {config.label}</Link>
        <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
          <div className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-md bg-primary text-6xl font-black text-primary-foreground">{initials(profile.name)}</div>
          <div>
            <p className="eyebrow text-[10px] font-bold uppercase text-soft">{config.singular} · Sample profile</p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-[.95] sm:text-5xl">{profile.name}</h1>
            <p className="mt-3 font-bold text-primary">{profile.role}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={13} /> {profile.location}</p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">{profile.focus.map((f) => <span key={f} className="border border-border px-3 py-1.5 text-xs font-bold">{f}</span>)}</div>
            <Button asChild className="mt-8 rounded-full px-6 font-bold"><Link to="/contact">Get in touch <ArrowRight size={15} /></Link></Button>
          </div>
        </div>
      </div>
    </section>
  </main>;
}
