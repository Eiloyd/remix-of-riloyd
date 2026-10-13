import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProfileDetail } from "@/components/people-profiles";
import { peopleGroups } from "@/lib/people-config";

export const Route = createFileRoute("/team/$slug")({
  loader: ({ params }) => {
    const profile = peopleGroups.team.profiles.find((p) => p.slug === params.slug);
    if (!profile) throw notFound();
    return { profile };
  },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.profile.name} | Riloyd` }, { name: "description", content: loaderData.profile.summary }, { property: "og:title", content: `${loaderData.profile.name} | Riloyd` }, { property: "og:description", content: loaderData.profile.summary }, { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary" }] : [{ title: "Profile not found | Riloyd" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <main className="p-16 text-center">Profile not found.</main>,
  errorComponent: () => <main className="p-16 text-center">Something went wrong.</main>,
  component: ProfilePage,
});

function ProfilePage() {
  const { profile } = Route.useLoaderData();
  return <ProfileDetail group="team" profile={profile} />;
}
