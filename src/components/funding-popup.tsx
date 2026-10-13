import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Rocket, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import posterAsset from "@/assets/funding-programme-poster.webp.asset.json";
import {
  fundingApplicationSchema,
  submitFundingApplication,
  type FundingApplication,
} from "@/lib/funding-popup.functions";

const STORAGE_KEY = "riloyd-funding-popup-dismissed";
const stages = ["Idea", "Prototype / MVP", "Early Revenue", "Growth", "Scaling"];
const industries = ["Technology", "Healthcare", "Consumer & FMCG", "Education", "Manufacturing", "Financial Services", "Agriculture", "Real Estate", "Professional Services", "Other"];

const empty: FundingApplication = { founderName: "", email: "", mobile: "", startupName: "", stage: "", industry: "", description: "" };

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function FundingPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FundingApplication>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FundingApplication, string>>>({});
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const submit = useServerFn(submitFundingApplication);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const change = (open: boolean) => {
    setOpen(open);
    if (!open) sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const set = (k: keyof FundingApplication, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFailure(null);
    const parsed = fundingApplicationSchema.safeParse(form);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof FundingApplication] ??= issue.message;
      setErrors(next);
      return;
    }
    setBusy(true);
    try {
      const res = await submit({ data: parsed.data });
      setCode(res.applicationCode);
      setForm(empty);
    } catch {
      setFailure("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const err = (k: keyof FundingApplication) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <>
      <Dialog open={open} onOpenChange={change}>
        <DialogContent className="max-h-[92vh] w-[96vw] max-w-5xl overflow-y-auto border-primary/30 bg-background p-0 sm:rounded-xl [&>button]:hidden">
          <button
            type="button"
            onClick={() => change(false)}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 text-foreground hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="grid md:grid-cols-[1fr_1.05fr]">
            <div className="bg-background">
              <img
                src={posterAsset.url}
                alt="Riloyd Startup Funding Programme – Grant up to ₹22.5 Lakhs for the top 3 startups: 1st ₹10 Lakhs, 2nd ₹7.5 Lakhs, 3rd ₹5 Lakhs"
                width={1086}
                height={1448}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-background p-6 sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Registrations Open
              </span>
              <DialogTitle className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                Apply Your <span className="text-primary">Startup</span> Now
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-muted-foreground">
                Grant up to ₹22.5 Lakhs for the top 3 startups, plus investor connect and mentorship.
              </DialogDescription>

              {code ? (
                <div className="mt-8 rounded-lg border border-primary/30 bg-primary/5 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
                  <p className="mt-3 font-semibold text-foreground">Application received!</p>
                  <p className="mt-1 text-sm text-muted-foreground">Your reference: <b className="text-foreground">{code}</b></p>
                  <button type="button" onClick={() => change(false)} className="mt-5 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Close</button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
                  <div>
                    <input className={inputCls} placeholder="Founder Name *" value={form.founderName} onChange={(e) => set("founderName", e.target.value)} maxLength={100} />
                    {err("founderName")}
                  </div>
                  <div>
                    <input className={inputCls} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={255} />
                    {err("email")}
                  </div>
                  <div>
                    <div className="flex">
                      <span className="flex items-center rounded-l-md border border-r-0 border-border bg-muted px-3 text-sm text-muted-foreground">+91</span>
                      <input className={`${inputCls} rounded-l-none`} inputMode="numeric" placeholder="Mobile Number *" value={form.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} />
                    </div>
                    {err("mobile")}
                  </div>
                  <div>
                    <input className={inputCls} placeholder="Startup Name *" value={form.startupName} onChange={(e) => set("startupName", e.target.value)} maxLength={120} />
                    {err("startupName")}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <select className={inputCls} value={form.stage} onChange={(e) => set("stage", e.target.value)} aria-label="Startup Stage">
                        <option value="">Startup Stage *</option>
                        {stages.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      {err("stage")}
                    </div>
                    <div>
                      <select className={inputCls} value={form.industry} onChange={(e) => set("industry", e.target.value)} aria-label="Industry / Sector">
                        <option value="">Industry / Sector *</option>
                        {industries.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      {err("industry")}
                    </div>
                  </div>
                  <div>
                    <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Short Description about your startup *" value={form.description} onChange={(e) => set("description", e.target.value.slice(0, 200))} />
                    <div className="flex justify-between">{err("description") ?? <span />}<span className="text-xs text-muted-foreground">{form.description.length}/200</span></div>
                  </div>
                  {failure && <p className="text-sm text-destructive">{failure}</p>}
                  <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
                    <Rocket className="h-4 w-4" /> {busy ? "Submitting…" : "Submit Application"}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">Your information is safe with us.</p>
                </form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {!open && (
        <button
          type="button"
          onClick={() => { setCode(null); setOpen(true); }}
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:scale-105"
        >
          <Rocket className="h-4 w-4" /> Startup Funding – Apply Now
        </button>
      )}
    </>
  );
}
