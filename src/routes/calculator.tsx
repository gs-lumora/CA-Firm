import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, CheckCircle2, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Income Tax Calculator FY 2025-26 | Old vs New Regime | Ghadei & Associates" },
      { name: "description", content: "Compare your income tax liability under the New and Old regimes for FY 2025-26. Includes Section 87A rebate up to ₹12L." },
      { property: "og:title", content: "Tax Calculator FY 2025-26 — Old vs New Regime" },
      { property: "og:description", content: "Free interactive calculator comparing both tax regimes." },
    ],
  }),
  component: CalculatorPage,
});

function calcNewRegime(income: number, deduction: number) {
  const taxable = Math.max(0, income - deduction);
  const slabs = [
    { upto: 400000, rate: 0 },
    { upto: 800000, rate: 0.05 },
    { upto: 1200000, rate: 0.10 },
    { upto: 1600000, rate: 0.15 },
    { upto: 2000000, rate: 0.20 },
    { upto: 2400000, rate: 0.25 },
    { upto: Infinity, rate: 0.30 },
  ];
  let tax = 0; let prev = 0;
  for (const s of slabs) {
    if (taxable > prev) { tax += (Math.min(taxable, s.upto) - prev) * s.rate; prev = s.upto; }
    else break;
  }
  // Section 87A rebate — zero tax if taxable income ≤ 12L
  const rebate = taxable <= 1200000 ? tax : 0;
  const taxAfterRebate = Math.max(0, tax - rebate);
  const cess = taxAfterRebate * 0.04;
  return { taxable, taxBeforeRebate: tax, rebate, taxAfterRebate, cess, total: taxAfterRebate + cess };
}

function calcOldRegime(income: number, deduction: number) {
  const taxable = Math.max(0, income - deduction);
  const slabs = [
    { upto: 250000, rate: 0 },
    { upto: 500000, rate: 0.05 },
    { upto: 1000000, rate: 0.20 },
    { upto: Infinity, rate: 0.30 },
  ];
  let tax = 0; let prev = 0;
  for (const s of slabs) {
    if (taxable > prev) { tax += (Math.min(taxable, s.upto) - prev) * s.rate; prev = s.upto; }
    else break;
  }
  // Section 87A under old regime: full rebate up to ₹12,500 if taxable ≤ 5L
  const rebate = taxable <= 500000 ? Math.min(tax, 12500) : 0;
  const taxAfterRebate = Math.max(0, tax - rebate);
  const cess = taxAfterRebate * 0.04;
  return { taxable, taxBeforeRebate: tax, rebate, taxAfterRebate, cess, total: taxAfterRebate + cess };
}

const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

function CalculatorPage() {
  const [income, setIncome] = useState(1500000);
  const [newDed, setNewDed] = useState(75000);
  const [oldDed, setOldDed] = useState(50000);

  const newR = useMemo(() => calcNewRegime(income, newDed), [income, newDed]);
  const oldR = useMemo(() => calcOldRegime(income, oldDed), [income, oldDed]);
  const recommended: "new" | "old" = newR.total <= oldR.total ? "new" : "old";
  const savings = Math.abs(newR.total - oldR.total);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 border border-border px-4 py-1.5 text-xs font-medium text-navy mb-4">
          <Calculator className="h-3.5 w-3.5" /> FY 2025-26 · AY 2026-27
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Income Tax Calculator</h1>
        <p className="text-muted-foreground">Compare your liability under the New and Old regimes including the latest Section 87A rebate (up to ₹12 Lakh taxable income under the New Regime).</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="p-7 lg:col-span-1 h-fit lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl text-navy mb-6">Your Details</h2>
          <div className="space-y-5">
            <div>
              <Label htmlFor="income">Annual Income (₹)</Label>
              <Input id="income" type="number" min={0} value={income} onChange={(e) => setIncome(Number(e.target.value) || 0)} className="mt-1.5" />
              <input type="range" min={0} max={5000000} step={50000} value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full mt-3 accent-[var(--navy)]" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₹0</span><span>₹50L</span></div>
            </div>
            <div>
              <Label htmlFor="newDed">Standard Deduction — New Regime (₹)</Label>
              <Input id="newDed" type="number" min={0} value={newDed} onChange={(e) => setNewDed(Number(e.target.value) || 0)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="oldDed">Standard Deduction — Old Regime (₹)</Label>
              <Input id="oldDed" type="number" min={0} value={oldDed} onChange={(e) => setOldDed(Number(e.target.value) || 0)} className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1">Add 80C, 80D and other deductions here for accurate Old Regime comparison.</p>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recommendation banner */}
          <Card className={`p-7 border-2 ${recommended === "new" ? "border-gold bg-gold/5" : "border-navy bg-navy/5"}`}>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-navy" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-brand mb-1">Recommended for You</p>
                <h3 className="font-serif text-2xl text-navy mb-1">
                  {recommended === "new" ? "New Tax Regime" : "Old Tax Regime"}
                </h3>
                {savings > 0 ? (
                  <p className="text-sm text-foreground/80 flex items-center gap-1.5">
                    <TrendingDown className="h-4 w-4 text-gold" />
                    You save <span className="font-semibold text-navy">₹{fmt(savings)}</span> versus the {recommended === "new" ? "Old" : "New"} regime.
                  </p>
                ) : (
                  <p className="text-sm text-foreground/80">Both regimes yield the same liability for your inputs.</p>
                )}
              </div>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6">
            <RegimeCard title="New Regime" highlighted={recommended === "new"} r={newR} deduction={newDed} />
            <RegimeCard title="Old Regime" highlighted={recommended === "old"} r={oldR} deduction={oldDed} />
          </div>

          <Card className="p-6 bg-secondary/40">
            <h4 className="font-serif text-lg text-navy mb-3">New Regime Slabs (FY 2025-26)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Slab range="₹0 – 4L" rate="Nil" />
              <Slab range="₹4 – 8L" rate="5%" />
              <Slab range="₹8 – 12L" rate="10%" />
              <Slab range="₹12 – 16L" rate="15%" />
              <Slab range="₹16 – 20L" rate="20%" />
              <Slab range="₹20 – 24L" rate="25%" />
              <Slab range="Above ₹24L" rate="30%" />
              <Slab range="Sec. 87A" rate="≤ ₹12L = Nil" />
            </div>
          </Card>

          <p className="text-xs text-muted-foreground text-center">
            Estimates exclude surcharge for incomes above ₹50L. For complete planning,{" "}
            <a href="/contact" className="text-navy underline">consult our advisors</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Slab({ range, rate }: { range: string; rate: string }) {
  return (
    <div className="bg-card border border-border rounded p-2.5">
      <div className="text-muted-foreground">{range}</div>
      <div className="font-semibold text-navy">{rate}</div>
    </div>
  );
}

function RegimeCard({ title, highlighted, r, deduction }: {
  title: string; highlighted: boolean;
  r: ReturnType<typeof calcNewRegime>; deduction: number;
}) {
  return (
    <Card className={`p-6 ${highlighted ? "border-navy shadow-lg" : "border-border"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl text-navy">{title}</h3>
        {highlighted && <span className="text-[10px] font-semibold uppercase tracking-wider bg-gold text-navy px-2 py-0.5 rounded">Best</span>}
      </div>
      <Row label="Standard Deduction" value={`₹${fmt(deduction)}`} />
      <Row label="Taxable Income" value={`₹${fmt(r.taxable)}`} />
      <Row label="Tax Before Rebate" value={`₹${fmt(r.taxBeforeRebate)}`} />
      <Row label="Sec. 87A Rebate" value={`– ₹${fmt(r.rebate)}`} />
      <Row label="Health & Education Cess (4%)" value={`₹${fmt(r.cess)}`} />
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-baseline">
        <span className="font-semibold text-navy">Total Tax Payable</span>
        <span className="font-serif text-2xl text-navy">₹{fmt(r.total)}</span>
      </div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}
