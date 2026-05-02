import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Calculator, FileCheck, Briefcase, TrendingUp,
  ClipboardList, Search, Lightbulb, ShieldCheck, Star, Quote, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookingModal } from "@/components/BookingModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ghadei & Associates | Chartered Accountants in India" },
      { name: "description", content: "Premier CA firm specializing in tax advisory, GST compliance, audit, and corporate advisory. Book a consultation today." },
      { property: "og:title", content: "Ghadei & Associates | Chartered Accountants" },
      { property: "og:description", content: "Trusted advisors for tax, audit, and corporate strategy." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Calculator, title: "Tax Advisory", desc: "Strategic income tax planning for individuals and businesses." },
  { icon: FileCheck, title: "Statutory Audit", desc: "Independent audits compliant with ICAI and Companies Act." },
  { icon: Briefcase, title: "GST Compliance", desc: "End-to-end GST registration, filing, and advisory." },
  { icon: TrendingUp, title: "Corporate Advisory", desc: "M&A, due diligence, and growth strategy for enterprises." },
];

const process = [
  { icon: ClipboardList, step: "01", title: "Discover", desc: "We start with a detailed consultation to understand your financial position and objectives." },
  { icon: Search, step: "02", title: "Analyse", desc: "Our team reviews documents, identifies risks, and uncovers opportunities for optimization." },
  { icon: Lightbulb, step: "03", title: "Strategise", desc: "We craft a tailored, compliant action plan aligned to your long-term goals." },
  { icon: ShieldCheck, step: "04", title: "Execute", desc: "Implementation, filing, and ongoing advisory with full transparency at every step." },
];

const cases = [
  { sector: "Manufacturing SME", result: "₹42L Annual Tax Savings", desc: "Restructured a Bhubaneswar-based manufacturer's holdings, unlocking substantial deductions under Section 80JJAA and depreciation planning." },
  { sector: "Tech Startup", result: "Successful Series A Diligence", desc: "Led financial due diligence and FEMA compliance for a SaaS startup, enabling a smooth ₹18Cr fundraise from a Tier-1 fund." },
  { sector: "Family Office", result: "30% Estate Tax Reduction", desc: "Architected a multi-generational wealth structure including HUF, trust, and gifting strategies for a third-generation business family." },
];

function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-36 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold mb-6">
              <Star className="h-3.5 w-3.5 fill-gold" /> ICAI Registered · Est. 2008
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] mb-6">
              Strategic Counsel.<br/>
              <span className="text-gold italic">Uncompromising</span> Compliance.
            </h1>
            <p className="text-lg text-primary-foreground/75 max-w-xl mb-10 leading-relaxed">
              Ghadei &amp; Associates partners with discerning individuals, founders, and enterprises to navigate India's complex tax and regulatory landscape with clarity and conviction.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => setBookingOpen(true)} className="bg-gold text-navy hover:bg-gold/90 font-semibold">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Consultation
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/calculator">
                  Try Tax Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/10 rounded-2xl blur-2xl" />
              <Card className="relative bg-primary-foreground/5 border-primary-foreground/10 backdrop-blur-sm p-8 text-primary-foreground">
                <div className="grid grid-cols-2 gap-6">
                  <Stat value="500+" label="Clients Served" />
                  <Stat value="17" label="Years of Practice" />
                  <Stat value="₹2,400Cr+" label="Audits Conducted" />
                  <Stat value="98%" label="Client Retention" />
                </div>
                <div className="border-t border-primary-foreground/10 mt-6 pt-6">
                  <Quote className="h-5 w-5 text-gold mb-2" />
                  <p className="text-sm italic text-primary-foreground/80 leading-relaxed">
                    "Their advice has been instrumental in shaping our group's tax strategy across three jurisdictions."
                  </p>
                  <p className="text-xs text-primary-foreground/60 mt-3">— CFO, Listed Manufacturing Group</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Our Practice</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Comprehensive Financial Expertise</h2>
          <p className="text-muted-foreground">From statutory compliance to strategic advisory — a complete suite of services delivered by chartered professionals.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Card key={s.title} className="p-7 border-border hover:border-navy/30 transition-all hover:shadow-lg group">
              <div className="h-12 w-12 rounded-md bg-navy/5 flex items-center justify-center mb-5 group-hover:bg-navy group-hover:text-gold transition-colors">
                <s.icon className="h-6 w-6 text-navy group-hover:text-gold transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-navy mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">How We Work</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-navy mb-4">A Disciplined, Four-Step Engagement</h2>
            <p className="text-muted-foreground">Our methodology blends rigour with clarity. Every engagement follows a structured path designed to maximise value while minimising friction.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={p.step} className="relative">
                <Card className="p-7 h-full border-border bg-card relative">
                  <div className="text-5xl font-serif text-gold/30 absolute top-4 right-5">{p.step}</div>
                  <p.icon className="h-8 w-8 text-navy mb-4" strokeWidth={1.5} />
                  <h3 className="font-serif text-xl text-navy mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </Card>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT SUCCESS */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Client Success</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Outcomes That Speak Quietly</h2>
          <p className="text-muted-foreground">Selected case studies from engagements where strategic counsel produced measurable results.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <Card key={c.sector} className="p-8 border-border bg-card">
              <p className="text-xs uppercase tracking-wider text-slate-brand mb-3">{c.sector}</p>
              <p className="font-serif text-2xl text-gold mb-4">{c.result}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="gradient-navy rounded-2xl px-8 py-16 lg:px-16 text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          <div className="relative">
            <h2 className="font-serif text-4xl lg:text-5xl mb-4">Ready to bring clarity to your finances?</h2>
            <p className="text-primary-foreground/75 max-w-xl mx-auto mb-8">Schedule a confidential, no-obligation consultation with a senior partner.</p>
            <Button size="lg" onClick={() => setBookingOpen(true)} className="bg-gold text-navy hover:bg-gold/90 font-semibold">
              <Calendar className="mr-2 h-5 w-5" /> Book a Consultation
            </Button>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl text-gold mb-1">{value}</div>
      <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">{label}</div>
    </div>
  );
}
