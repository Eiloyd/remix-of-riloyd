import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Compass,
  Factory,
  Globe2,
  Handshake,
  Lightbulb,
  Rocket,
  SearchCheck,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/about-global-hero.jpg";
import leadershipImage from "@/assets/about-leadership.jpg";
import visionImage from "@/assets/about-vision.jpg";
import mapImage from "@/assets/global-map.jpg";
import logoAsset from "@/assets/riloyd-logo.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Riloyd | Insight, Decisions and Execution" },
      { name: "description", content: "RILOYD is a business advisory firm helping businesses make informed decisions across strategy, funding, growth, transformation and risk." },
      { property: "og:title", content: "About Riloyd | Insight, Decisions and Execution" },
      { property: "og:description", content: "Discover how RILOYD combines research, strategic thinking and an execution perspective to help businesses move forward with clarity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const advisoryOverview = [
  { icon: UsersRound, label: "Who We Serve", copy: "Founders, growing businesses, enterprises, investors and stakeholders navigating important moments." },
  { icon: Compass, label: "What We Do", copy: "We bring structure to complex choices through research, strategy, commercial insight and execution planning." },
  { icon: Lightbulb, label: "How We Think", copy: "We examine the wider business context, challenge assumptions and connect each decision to measurable outcomes." },
  { icon: Handshake, label: "Our Difference", copy: "We work as a long-term advisory partner—bringing direction, perspective and practical momentum." },
];

const comparison = [
  ["Solves a defined problem", "Understands the wider business"],
  ["Project focused", "Relationship focused"],
  ["Recommendations", "Decisions + direction"],
  ["Short-term engagement", "Long-term partnership"],
  ["Advice", "Advisory + execution perspective"],
];

const audiences = [
  { icon: Rocket, title: "Founders & Entrepreneurs", copy: "For businesses building their next stage of growth." },
  { icon: TrendingUp, title: "SMEs & Growing Businesses", copy: "For businesses looking to scale, transform or restructure." },
  { icon: Factory, title: "Manufacturers & Enterprises", copy: "For operational, strategic and market challenges." },
  { icon: Building2, title: "Startups", copy: "For strategy, funding readiness and growth planning." },
  { icon: BarChart3, title: "Investors & Business Stakeholders", copy: "For research, analysis and business evaluation." },
];

const solutionApproach = [
  { icon: SearchCheck, title: "Understand the context", copy: "We begin with evidence—your market, business model, constraints and opportunities." },
  { icon: Target, title: "Clarify the decision", copy: "We identify what matters most, frame the choices and establish a clear direction." },
  { icon: Compass, title: "Shape the path forward", copy: "We translate strategy into priorities, responsibilities and an achievable action plan." },
  { icon: Check, title: "Keep action measurable", copy: "We stay focused on outcomes so progress can be evaluated and decisions can evolve." },
];

const differentiators = [
  { icon: SearchCheck, title: "Insight Before Action", copy: "Every recommendation begins with evidence, context and a clear understanding of the decision." },
  { icon: Compass, title: "Wider Business Perspective", copy: "We connect strategy, capital, operations, markets and risk rather than viewing challenges in isolation." },
  { icon: Handshake, title: "Partnership Mindset", copy: "We build relationships around long-term business progress, not only the delivery of a single project." },
  { icon: Target, title: "Execution-Oriented Advice", copy: "Our thinking is designed to become practical priorities, informed choices and measurable action." },
  { icon: Globe2, title: "Global Outlook, Local Context", copy: "International perspective is balanced with the commercial realities of each business and market." },
];

const markets = ["India", "Singapore", "UAE", "UK", "USA", "Canada", "Australia", "Europe"];

function ImageBrand() {
  return <img src={logoAsset.url} alt="Riloyd" className="absolute right-5 top-5 z-20 h-9 w-auto object-contain sm:right-8 sm:top-8 sm:h-11" decoding="async" />;
}

function AboutPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative min-h-[590px] overflow-hidden border-b border-border sm:min-h-[650px]">
        <img src={heroImage} width={1920} height={900} alt="Earth connected by international business routes" className="absolute inset-0 h-full w-full object-cover object-[64%_center]" decoding="async" fetchPriority="high" />
        <div className="about-hero-shade absolute inset-0" />
        <ImageBrand />
        <div className="relative z-10 mx-auto flex min-h-[590px] max-w-[1380px] items-center px-5 py-20 sm:min-h-[650px] sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="eyebrow text-[10px] font-bold uppercase text-soft">About Riloyd</p>
            <h1 className="headline mt-5 text-[clamp(2.55rem,5.3vw,5.25rem)] font-black uppercase leading-[.92]">Business decisions.<br /><span className="text-primary">Backed by insight.</span><br />Driven by execution.</h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">RILOYD is a business advisory firm helping leaders navigate critical decisions across strategy, funding, sales growth, transformation and risk management.</p>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-soft sm:text-sm">We combine research, rigorous analysis and strategic thinking with an execution-oriented perspective—helping businesses move from uncertainty to clarity, and from plans to measurable action.</p>
            <Button asChild size="lg" className="mt-8 rounded-full px-7 font-bold"><Link to="/contact">Start a Conversation <ArrowRight size={16} /></Link></Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-[1380px] sm:grid-cols-2 lg:grid-cols-4">
          {advisoryOverview.map(({ icon: Icon, label, copy }) => <article key={label} className="border-b border-border px-5 py-8 sm:border-r sm:px-6 lg:border-b-0 lg:px-7 last:border-r-0"><Icon size={28} strokeWidth={1.7} className="text-primary" /><h2 className="mt-4 text-sm font-extrabold uppercase">{label}</h2><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{copy}</p></article>)}
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-[1380px] lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col justify-center px-5 py-14 sm:px-6 lg:px-12 lg:py-20">
            <p className="eyebrow text-[10px] font-bold uppercase text-soft">Who we are</p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-[.98] sm:text-5xl">More than consultants. <span className="text-primary">Partners in better decisions.</span></h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">We look beyond an isolated problem to understand the business around it—its ambitions, economics, market realities and ability to execute. That wider view helps us provide advice that is commercially grounded, connected and useful.</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">Our role is to help leadership teams ask sharper questions, evaluate choices with confidence and turn the right decisions into forward movement.</p>
          </div>
          <div className="relative min-h-[410px] lg:min-h-[560px]"><img src={leadershipImage} width={1600} height={900} loading="lazy" alt="Business leader considering a city growth strategy" className="absolute inset-0 h-full w-full object-cover object-center" decoding="async" /><div className="about-image-shade absolute inset-0" /><ImageBrand /></div>
        </div>
      </section>

      <section className="border-b border-border bg-card py-14 text-card-foreground sm:py-20">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="eyebrow text-[10px] font-bold uppercase">What we do</p><h2 className="mt-4 text-3xl font-black uppercase sm:text-5xl">End-to-end business solutions</h2></div><p className="max-w-2xl text-sm leading-relaxed text-card-foreground/70">Our work connects insight, decisions and implementation. Rather than repeating a fixed list of services, we shape the right combination of expertise around the business question—then create a practical route from diagnosis to action.</p></div>
          <div className="mt-10 grid gap-px bg-secondary sm:grid-cols-2 lg:grid-cols-4">
            {solutionApproach.map(({ icon: Icon, title, copy }, index) => <article key={title} className="bg-card p-6"><span className="text-xs font-black text-primary">0{index + 1}</span><Icon size={29} className="mt-7 text-primary" /><h3 className="mt-4 text-sm font-extrabold">{title}</h3><p className="mt-2 text-xs leading-relaxed text-card-foreground/70">{copy}</p></article>)}
          </div>
          <Button asChild variant="outline" className="mt-8 rounded-full border-primary px-6 text-xs font-bold"><Link to="/services">View Our Services <ArrowRight size={14} /></Link></Button>
        </div>
      </section>

      <section className="border-b border-border bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-12">
          <p className="eyebrow text-[10px] font-bold uppercase text-soft">Consultant vs advisory partner</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-[.98] sm:text-5xl">We don&apos;t just give answers. <span className="text-primary">We help businesses make better decisions.</span></h2>
          <div className="mt-10 overflow-hidden border border-border">
            <div className="grid grid-cols-2 bg-surface text-[11px] font-extrabold uppercase sm:text-sm"><div className="p-4 sm:p-6">Traditional Consultant</div><div className="border-l border-border p-4 text-primary sm:p-6">RILOYD Business Advisory Partner</div></div>
            {comparison.map(([consultant, riloyd]) => <div key={consultant} className="grid grid-cols-2 border-t border-border text-[11px] leading-relaxed sm:text-sm"><div className="p-4 text-muted-foreground sm:p-6">{consultant}</div><div className="flex items-start gap-2 border-l border-border p-4 font-semibold sm:p-6"><Check size={16} className="mt-0.5 shrink-0 text-primary" />{riloyd}</div></div>)}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-12">
          <p className="eyebrow text-[10px] font-bold uppercase text-soft">Who we work with</p>
          <h2 className="mt-4 text-3xl font-black uppercase sm:text-5xl">Built around business realities.</h2>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{audiences.map(({ icon: Icon, title, copy }) => <article key={title} className="border border-border bg-background p-5"><Icon size={30} className="text-primary" /><h3 className="mt-5 text-sm font-extrabold leading-snug">{title}</h3><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="eyebrow text-[10px] font-bold uppercase text-soft">Why businesses choose Riloyd</p><h2 className="mt-4 text-3xl font-black uppercase leading-[.98] sm:text-5xl">Clarity for the decision. <span className="text-primary">Momentum for what follows.</span></h2></div><p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">Businesses choose RILOYD when the answer cannot come from a template. We bring disciplined analysis, independent thinking and a practical execution perspective to decisions that shape growth, resilience and long-term value.</p></div>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">{differentiators.map(({ icon: Icon, title, copy }) => <article key={title} className="bg-background p-6"><Icon size={30} strokeWidth={1.7} className="text-primary" /><h3 className="mt-5 text-sm font-extrabold leading-snug">{title}</h3><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="relative min-h-[560px] overflow-hidden border-b border-border">
        <img src={mapImage} width={1600} height={656} loading="lazy" alt="World map with subtle connections between Riloyd markets" className="absolute inset-0 h-full w-full object-cover object-center" decoding="async" />
        <div className="about-global-shade absolute inset-0" />
        <ImageBrand />
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1380px] items-center px-5 py-16 sm:px-6 lg:px-12">
          <div className="max-w-3xl"><p className="eyebrow text-[10px] font-bold uppercase text-soft">Our global perspective</p><h2 className="mt-4 text-4xl font-black uppercase leading-[.95] sm:text-6xl">Business has <span className="text-primary">no borders.</span></h2><p className="mt-5 max-w-xl text-sm leading-relaxed text-soft">RILOYD brings an international perspective to business decisions while respecting the commercial realities of each market. We connect insight, networks and opportunity across regions.</p><div className="mt-8 flex max-w-2xl flex-wrap gap-2">{markets.map((market) => <Link key={market} to="/global-presence/$slug" params={{ slug: market === "UK" ? "uk" : market === "USA" ? "usa" : market.toLowerCase() }} className="border border-border bg-background/70 px-4 py-2 text-xs font-bold transition-colors hover:border-primary">{market}</Link>)}</div><Button asChild className="mt-8 rounded-full px-6 font-bold"><Link to="/global-presence">Explore Global Presence <ArrowRight size={15} /></Link></Button></div>
        </div>
      </section>

      <section className="relative min-h-[540px] overflow-hidden border-b border-border">
        <img src={visionImage} width={1600} height={700} loading="lazy" alt="Leader looking beyond a mountain horizon" className="absolute inset-0 h-full w-full object-cover object-[67%_center]" decoding="async" />
        <div className="about-vision-shade absolute inset-0" />
        <ImageBrand />
        <div className="relative z-10 mx-auto flex min-h-[540px] max-w-[1380px] items-center px-5 py-16 sm:px-6 lg:px-12"><div className="max-w-2xl"><p className="eyebrow text-[10px] font-bold uppercase text-soft">Our philosophy</p><h2 className="mt-5 text-4xl font-black uppercase leading-[.94] sm:text-6xl">Think beyond today.<br /><span className="text-primary">Build for tomorrow.</span></h2><p className="mt-6 max-w-xl text-sm leading-relaxed text-soft sm:text-base">Businesses evolve. Markets change. Opportunities emerge. Risks shift. RILOYD exists to help businesses understand these changes, make informed decisions and build what comes next.</p></div></div>
      </section>

      <section className="relative min-h-[340px] overflow-hidden">
        <img src={heroImage} width={1920} height={900} loading="lazy" alt="Connected global business landscape" className="absolute inset-0 h-full w-full object-cover object-[66%_center]" decoding="async" />
        <div className="about-hero-shade absolute inset-0" />
        <ImageBrand />
        <div className="relative z-10 mx-auto flex min-h-[340px] max-w-[1380px] items-center px-5 py-14 sm:px-6 lg:px-12"><div className="max-w-2xl"><p className="eyebrow text-[10px] font-bold uppercase text-soft">The next decision</p><h2 className="mt-4 text-4xl font-black uppercase leading-[.95] sm:text-5xl">Move forward with <span className="text-primary">clarity.</span></h2><p className="mt-4 max-w-lg text-sm text-soft">Talk to RILOYD about the business decision in front of you.</p><Button asChild size="lg" className="mt-6 rounded-full px-7 font-bold"><Link to="/contact">Start a Conversation <ArrowRight size={16} /></Link></Button></div></div>
      </section>
    </main>
  );
}