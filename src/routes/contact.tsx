import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Ghadei & Associates — Chartered Accountants" },
      { name: "description", content: "Get in touch with Ghadei & Associates for tax, audit, and advisory consultations. Confidential, no-obligation inquiry form." },
      { property: "og:title", content: "Contact Ghadei & Associates" },
      { property: "og:description", content: "Reach our partners directly for confidential consultation." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  service: z.string().optional(),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(1000),
});

const SERVICES = ["Tax Advisory", "GST Compliance", "Statutory Audit", "Corporate Advisory", "Startup Consulting", "Other"];

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      service: fd.get("service"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_inquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      service: parsed.data.service || null,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) { toast.error("Could not submit. Please try again."); return; }
    setDone(true);
    toast.success("Thank you. We'll respond within one business day.");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Contact</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Begin a Conversation</h1>
        <p className="text-muted-foreground">All inquiries are received personally by a partner and treated with complete confidentiality.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-4 lg:col-span-1">
          <Card className="p-6 border-border">
            <Mail className="h-5 w-5 text-gold mb-3" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Email</p>
            <p className="text-navy font-medium">info@ghadeiassociates.in</p>
          </Card>
          <Card className="p-6 border-border">
            <Phone className="h-5 w-5 text-gold mb-3" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Phone</p>
            <p className="text-navy font-medium">+91 98765 43210</p>
          </Card>
          <Card className="p-6 border-border">
            <MapPin className="h-5 w-5 text-gold mb-3" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Office</p>
            <p className="text-navy font-medium leading-relaxed">2nd Floor, Forum Mart,<br />Saheed Nagar, Bhubaneswar,<br />Odisha 751007</p>
          </Card>
        </div>

        <Card className="p-8 border-border lg:col-span-2">
          {done ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-14 w-14 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-navy mb-2">Inquiry Received</h3>
              <p className="text-muted-foreground">A partner will respond to you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-serif text-2xl text-navy mb-4">Send us a message</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required maxLength={100} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" type="tel" maxLength={20} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="service">Service of Interest</Label>
                  <Select name="service">
                    <SelectTrigger id="service"><SelectValue placeholder="Select a service" /></SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" name="message" rows={5} required maxLength={1000} placeholder="Briefly describe your situation or question..." />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="bg-navy hover:bg-navy-light">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Inquiry
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
