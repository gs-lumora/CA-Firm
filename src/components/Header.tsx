import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Calendar, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "./BookingModal";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/calculator", label: "Tax Calculator" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-md gradient-navy shadow-md">
              <Scale className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg font-semibold text-navy">Ghadei &amp; Associates</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Chartered Accountants</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-foreground/80 hover:text-navy transition-colors"
                activeProps={{ className: "text-navy font-semibold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setBookingOpen(true)}
              className="hidden sm:inline-flex bg-navy hover:bg-navy-light text-primary-foreground"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Consultation
            </Button>
            <button
              className="lg:hidden p-2 text-navy"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium text-foreground/80 border-b border-border/60 last:border-0"
                  activeProps={{ className: "text-navy font-semibold" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                onClick={() => { setOpen(false); setBookingOpen(true); }}
                className="mt-4 bg-navy hover:bg-navy-light text-primary-foreground"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Consultation
              </Button>
            </nav>
          </div>
        )}
      </header>
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
