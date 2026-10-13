import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/riloyd-logo.png.asset.json";
import darkLogo from "@/assets/riloyd-logo-dark.png";
import globalGlossy from "@/assets/riloyd-global-glossy.png.asset.json";
import globalLight from "@/assets/riloyd-global-light.png.asset.json";
import { serviceOrder, serviceConfigs } from "@/lib/service-config";
import { marketOrder, marketConfigs } from "@/lib/market-config";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isGlobalPage = pathname.startsWith("/global-presence");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("riloyd-theme");
    const next = stored === "dark" || stored === "light" ? stored : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.style.colorScheme = next;
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("riloyd-theme", next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.style.colorScheme = next;
  }

  const navItems = [
    { label: "Home", to: "/" as const },
    { label: "About", to: "/about" as const },
    { label: "Services", to: "/services" as const },
    { label: "Global Presence", to: "/global-presence" as const },
    { label: "Contact", to: "/contact" as const },
  ];

  return <header className="relative z-30 border-b border-border bg-background text-foreground">
    <div className="mx-auto grid h-[70px] max-w-[1380px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-12">
      <Link to="/" aria-label={isGlobalPage ? "Riloyd Global home" : "Riloyd home"} className="block h-[59px] w-[188px] shrink-0 sm:w-[208px]"><img src={isGlobalPage ? (theme === "light" ? globalLight.url : globalGlossy.url) : (theme === "light" ? darkLogo : logoAsset.url)} alt={isGlobalPage ? "Riloyd Global" : "Riloyd"} className="h-full w-full object-contain object-left" decoding="async" /></Link>
      <nav aria-label="Main navigation" className="hidden items-center justify-center gap-6 text-xs font-bold xl:gap-9 lg:flex">
        {navItems.map((item) => <Link key={item.label} to={item.to} className={`nav-link ${pathname === item.to ? "nav-active" : ""}`}>{item.label}</Link>)}
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <Button type="button" variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
        <Button asChild variant="outline" className="hidden h-8 rounded-full border-primary px-4 text-[11px] font-bold lg:inline-flex"><Link to="/register">Register Now <ArrowRight size={14} /></Link></Button>
        <Button type="button" variant="ghost" size="icon" className="h-9 w-9 lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu size={19} /></Button>
      </div>
    </div>
    {menuOpen && <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full z-40 flex flex-col border-b border-border bg-background px-5 py-3 shadow-xl lg:hidden">
      {navItems.map((item) => <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)} className="border-b border-border py-3 text-sm font-semibold last:border-0">{item.label}</Link>)}
      <Link to="/register" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-bold text-primary">Register Now →</Link>
    </nav>}
  </header>;
}

export function SiteFooter() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(document.documentElement.classList.contains("light") ? "light" : "dark"));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
    return () => observer.disconnect();
  }, []);
  return <footer className="border-t border-border bg-background text-foreground">
    <div className="mx-auto grid max-w-[1380px] grid-cols-2 gap-x-5 gap-y-9 px-5 py-11 sm:px-6 md:grid-cols-3 lg:grid-cols-[1.25fr_.7fr_1fr_1fr_.75fr] lg:px-12">
      <div className="col-span-2 md:col-span-3 lg:col-span-1"><Link to="/" aria-label="Riloyd home"><img src={theme === "light" ? darkLogo : logoAsset.url} alt="Riloyd" className="h-auto w-36" decoding="async" /></Link><p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">RILOYD helps ambitious businesses find expertise, capital and opportunities for sustainable growth.</p></div>
      <div><h2 className="text-xs font-bold">Explore</h2><div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground"><Link to="/">Home</Link><Link to="/about">About</Link><Link to="/investors">Investors</Link><Link to="/mentors">Mentors</Link><Link to="/team">Our Team</Link><Link to="/contact">Contact</Link><Link to="/register">Register</Link></div></div>
      <div><h2 className="text-xs font-bold">Our Services</h2><div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground">{serviceOrder.map((key) => { const service = serviceConfigs[key]; return service ? <Link key={key} to="/services/$slug" params={{ slug: service.slug }}>{service.shortTitle}</Link> : null; })}</div></div>
      <div><h2 className="text-xs font-bold">Global Presence</h2><div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-muted-foreground lg:grid-cols-1">{marketOrder.map((key) => { const market = marketConfigs[key]; return <Link key={key} to="/global-presence/$slug" params={{ slug: market.slug }}>{market.name}</Link>; })}</div></div>
      <div><h2 className="text-xs font-bold">Connect</h2><div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground"><Link to="/contact">Send an enquiry</Link><a href="mailto:hello@riloyd.com">Email us</a></div><Link to="/global-presence" aria-label="Explore Riloyd Global presence"><img src={theme === "light" ? globalLight.url : globalGlossy.url} alt="Riloyd Global — explore our global presence" loading="lazy" className="mt-5 h-16 w-auto max-w-full object-contain object-left" decoding="async" /></Link></div>
    </div>
    <div className="border-t border-border px-5 py-5 text-center text-[10px] text-muted-foreground">© {new Date().getFullYear()} RILOYD. All rights reserved.</div>
  </footer>;
}