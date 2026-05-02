import { createFileRoute } from "@tanstack/react-router";
import { Award, Target, Heart, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Ghadei & Associates — Chartered Accountants" },
      { name: "description", content: "Founded in 2008, Ghadei & Associates is a multi-disciplinary CA firm built on integrity, technical excellence, and lasting client partnerships." },
      { property: "og:title", content: "About Ghadei & Associates" },
      { property: "og:description", content: "Our story, values, and approach to chartered accountancy." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Award, title: "Excellence", desc: "Uncompromising technical standards in every engagement, supported by continuous professional development." },
  { icon: Target, title: "Integrity", desc: "Independent counsel without conflict. We measure success by the quality of advice, not the size of the invoice." },
  { icon: Heart, title: "Partnership", desc: "Long-horizon relationships with clients we know personally — most have been with us for over a decade." },
  { icon: Sparkles, title: "Clarity", desc: "Complex regulations translated into actionable, jargon-free guidance you can confidently act on." },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Our Firm</p>
        <h1 className="font-serif text-4xl lg:text-6xl text-navy mb-6 leading-tight">A practice built on quiet conviction.</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Founded in 2008 in Bhubaneswar, Ghadei &amp; Associates has grown from a two-partner practice into a respected multi-disciplinary firm — without ever losing the personal attention that defined our earliest engagements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-20">
        {values.map((v) => (
          <Card key={v.title} className="p-7 border-border">
            <v.icon className="h-8 w-8 text-gold mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-xl text-navy mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </Card>
        ))}
      </div>

      <div className="bg-secondary/40 rounded-2xl p-10 lg:p-14">
        <h2 className="font-serif text-3xl text-navy mb-6">Our Approach</h2>
        <div className="space-y-5 text-foreground/80 leading-relaxed">
          <p>
            We believe great chartered accountancy lies at the intersection of technical rigour and contextual understanding. Numbers tell only part of the story; the rest comes from genuinely understanding a client's business, family circumstances, and long-term ambitions.
          </p>
          <p>
            That is why our partners are personally involved in every significant engagement, why we deliberately limit the number of clients we take on, and why we invest heavily in continuous training across our team.
          </p>
          <p>
            Whether we are advising a third-generation business family on succession, guiding a startup through its first audit, or representing a corporate before the ITAT, the standard remains the same: considered, conflict-free advice, delivered with absolute discretion.
          </p>
        </div>
      </div>
    </div>
  );
}
