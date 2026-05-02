import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowRight, FileText, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Tax Updates & Insights | Ghadei & Associates" },
      { name: "description", content: "Latest tax updates, GST norms, and ICAI standards from India's leading chartered accountants." },
      { property: "og:title", content: "Latest Tax Updates & Insights" },
      { property: "og:description", content: "Stay informed with timely analysis from Ghadei & Associates." },
    ],
  }),
  component: ResourcesPage,
});

const articles = [
  {
    title: "Union Budget 2026: Key Changes for Individual Taxpayers",
    excerpt: "An in-depth analysis of revised slab rates, the enhanced Section 87A rebate threshold, and what salaried professionals need to plan for in the year ahead.",
    category: "Budget Analysis",
    date: "April 18, 2026",
    readTime: "8 min",
  },
  {
    title: "New GST Compliance Norms for SMEs: A Checklist",
    excerpt: "The CBIC's recent notification introduces material changes to e-invoicing thresholds and ITC reconciliation. Here is your practical, step-by-step checklist.",
    category: "GST",
    date: "April 12, 2026",
    readTime: "6 min",
  },
  {
    title: "Understanding the 13th Edition ICAI Ethical Standards",
    excerpt: "The newly revised Code of Ethics introduces sharper guidance on independence, fees, and digital advertising. What every practising CA must know.",
    category: "Profession",
    date: "April 5, 2026",
    readTime: "10 min",
  },
  {
    title: "Deadline Alert: Q1 Advance Tax Filing Dates",
    excerpt: "The first instalment of advance tax for FY 2026-27 is due 15 June. We summarise the calculation method, applicable taxpayers, and penalty exposures.",
    category: "Compliance",
    date: "March 28, 2026",
    readTime: "4 min",
  },
  {
    title: "Digital Currency Taxation: What You Need to Know",
    excerpt: "From the 30% flat rate to TDS under Section 194S, our complete primer on the tax treatment of crypto, NFTs, and other Virtual Digital Assets.",
    category: "Tax Advisory",
    date: "March 21, 2026",
    readTime: "7 min",
  },
];

function ResourcesPage() {
  const [feature, ...rest] = articles;
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-2xl mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Insights & Analysis</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Latest Tax Updates</h1>
        <p className="text-muted-foreground">Considered analysis on regulation, compliance, and strategy from our partners.</p>
      </div>

      {/* Featured */}
      <Card className="overflow-hidden border-border mb-10 group cursor-pointer hover:shadow-xl transition-shadow">
        <div className="grid md:grid-cols-2">
          <div className="gradient-navy h-64 md:h-auto flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
            <FileText className="h-20 w-20 text-gold relative" strokeWidth={1} />
          </div>
          <div className="p-8 lg:p-10">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="inline-flex items-center gap-1 bg-gold/15 text-navy px-2.5 py-1 rounded font-medium"><Tag className="h-3 w-3" /> Featured · {feature.category}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {feature.date}</span>
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl text-navy mb-3 group-hover:text-navy-light transition-colors">{feature.title}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{feature.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-navy font-semibold text-sm">Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {rest.map((a) => (
          <Card key={a.title} className="p-7 border-border group cursor-pointer hover:shadow-lg hover:border-navy/30 transition-all">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="bg-secondary text-navy px-2 py-0.5 rounded font-medium">{a.category}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.date}</span>
              <span>· {a.readTime}</span>
            </div>
            <h3 className="font-serif text-xl text-navy mb-2 group-hover:text-navy-light transition-colors">{a.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{a.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-navy text-sm font-semibold">Read more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center bg-secondary/40 rounded-2xl p-12">
        <h3 className="font-serif text-2xl text-navy mb-3">Need clarity on a recent change?</h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Our advisors can interpret the latest notifications in the context of your specific situation.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-navy-light transition-colors">
          Speak to an Advisor <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
