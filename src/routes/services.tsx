import { createFileRoute } from "@tanstack/react-router";
import { Calculator, FileCheck, Briefcase, TrendingUp, Building2, Users, Globe, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Tax, Audit & Advisory — Ghadei & Associates" },
      { name: "description", content: "Comprehensive chartered accountant services: tax planning, statutory audit, GST, corporate advisory, FEMA, and startup consulting." },
      { property: "og:title", content: "Services | Ghadei & Associates" },
      { property: "og:description", content: "Tax, audit, and advisory services for individuals and enterprises." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Calculator, title: "Tax Advisory & Planning", desc: "Strategic income tax planning for individuals, HNIs, professionals, and corporates. Includes residency planning, capital gains optimisation, and trust structures.", items: ["Personal & HNI Tax Planning", "Corporate Tax Advisory", "Capital Gains Optimisation", "Estate & Succession Planning"] },
  { icon: FileCheck, title: "Statutory & Internal Audit", desc: "Independent audits compliant with the Companies Act, ICAI standards, and applicable industry regulations.", items: ["Statutory Audit", "Internal Audit", "Tax Audit (44AB)", "Stock & Concurrent Audit"] },
  { icon: Briefcase, title: "GST & Indirect Taxes", desc: "End-to-end GST registration, return filing, ITC reconciliation, audits, and litigation support.", items: ["GST Registration & Returns", "ITC Reconciliation", "GST Audit", "Departmental Representation"] },
  { icon: TrendingUp, title: "Corporate Advisory", desc: "Strategic counsel on M&A, valuations, due diligence, and transaction structuring.", items: ["M&A Advisory", "Business Valuation", "Financial Due Diligence", "Transaction Structuring"] },
  { icon: Building2, title: "Company Formation & ROC", desc: "Incorporation, ongoing ROC compliance, and secretarial services for private and public companies.", items: ["Pvt Ltd / LLP / OPC Setup", "Annual ROC Filings", "Director KYC & Changes", "Secretarial Compliance"] },
  { icon: Globe, title: "FEMA & International Tax", desc: "Cross-border advisory on FEMA, transfer pricing, expatriate taxation, and DTAA optimisation.", items: ["FEMA Compliance", "Transfer Pricing", "Expatriate Taxation", "DTAA Advisory"] },
  { icon: Users, title: "Startup & SME Advisory", desc: "Founders' agreements, ESOP design, fundraising support, and CFO services for high-growth ventures.", items: ["ESOP Design & Valuation", "Fundraising Support", "Virtual CFO Services", "Founder Advisory"] },
  { icon: Scale, title: "Litigation & Representation", desc: "Representation before tax authorities, CIT(A), ITAT, and other appellate forums.", items: ["Income Tax Litigation", "GST Litigation", "Appeals & Representations", "Settlement Commission"] },
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-2xl mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Practice Areas</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Services Built on Decades of Practice</h1>
        <p className="text-muted-foreground">A full-service chartered accountancy firm offering integrated solutions across taxation, assurance, and advisory.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s) => (
          <Card key={s.title} className="p-7 border-border hover:border-navy/30 hover:shadow-lg transition-all">
            <div className="flex items-start gap-5">
              <div className="h-12 w-12 rounded-md bg-navy/5 flex items-center justify-center flex-shrink-0">
                <s.icon className="h-6 w-6 text-navy" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="text-sm text-foreground/80 flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-gold" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
