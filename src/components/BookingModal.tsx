import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  preferred_time: z.string().min(1, "Select a time"),
  service_type: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

const TIMES = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const SERVICES = ["Tax Advisory", "GST Compliance", "Statutory Audit", "Corporate Advisory", "Startup Consulting", "Other"];

interface Props { open: boolean; onOpenChange: (v: boolean) => void; }

export function BookingModal({ open, onOpenChange }: Props) {
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date) { toast.error("Please pick a preferred date"); return; }

    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      preferred_time: fd.get("preferred_time"),
      service_type: fd.get("service_type"),
      notes: fd.get("notes"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("consultation_bookings").insert({
      ...parsed.data,
      preferred_date: format(date, "yyyy-MM-dd"),
    });
    setLoading(false);

    if (error) {
      toast.error("Could not submit booking. Please try again.");
      return;
    }

    setDone(true);
    toast.success("Consultation requested. We'll be in touch shortly.");
  }

  function handleOpenChange(v: boolean) {
    if (!v) { setDone(false); setDate(undefined); }
    onOpenChange(v);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-navy mb-2">Booking Received</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Thank you. A senior advisor will confirm your consultation within one business day.
            </p>
            <Button onClick={() => handleOpenChange(false)} className="bg-navy hover:bg-navy-light">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-navy">Book a Consultation</DialogTitle>
              <DialogDescription>
                Schedule a private, no-obligation consultation with our senior advisors.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required maxLength={100} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" required maxLength={20} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className={cn("w-full justify-start font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="preferred_time">Preferred Time</Label>
                  <Select name="preferred_time" required>
                    <SelectTrigger id="preferred_time"><SelectValue placeholder="Select time" /></SelectTrigger>
                    <SelectContent>
                      {TIMES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="service_type">Service of Interest</Label>
                <Select name="service_type">
                  <SelectTrigger id="service_type"><SelectValue placeholder="Select a service" /></SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" name="notes" rows={3} maxLength={1000} placeholder="Briefly describe what you'd like to discuss..." />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-navy hover:bg-navy-light">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Request Consultation
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
