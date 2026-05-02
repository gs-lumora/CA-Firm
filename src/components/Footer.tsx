import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Scale, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Footer() {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  return (
    <footer className="bg-navy text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-light">
                <Scale className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <div className="font-serif text-lg">Ghadei &amp; Associates</div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Trusted chartered accountants providing strategic tax, audit, and advisory services since 2008.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-base mb-4 text-gold">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/75">
              <li><Link to="/services" className="hover:text-gold transition-colors">Tax Advisory</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Statutory Audit</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">GST Compliance</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Corporate Advisory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/75">
              <li><Link to="/calculator" className="hover:text-gold transition-colors">Tax Calculator</Link></li>
              <li><Link to="/resources" className="hover:text-gold transition-colors">Resources</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-4 text-gold">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /> Bhubaneswar, Odisha, India</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@ghadeiassociates.in</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
            <ShieldCheck className="h-4 w-4 text-gold" />
            In compliance with ICAI 13th Edition Ethical Standards
          </div>
          <div className="flex items-center gap-6 text-xs text-primary-foreground/60">
            <button onClick={() => setDisclaimerOpen(true)} className="hover:text-gold transition-colors">
              Disclaimer
            </button>
            <span>© {new Date().getFullYear()} Ghadei &amp; Associates. All rights reserved.</span>
          </div>
        </div>
      </div>

      <Dialog open={disclaimerOpen} onOpenChange={setDisclaimerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-navy">Disclaimer</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-3 text-sm text-foreground/80 leading-relaxed pt-2">
                <p>
                  As per the Chartered Accountants Act, 1949, and the rules framed by the Institute of
                  Chartered Accountants of India (ICAI) under the 13th Edition of the Code of Ethics,
                  members of ICAI are not permitted to solicit work or advertise.
                </p>
                <p>
                  By accessing this website, the visitor acknowledges that the information contained herein
                  is provided solely on their request for informational purposes and does not constitute
                  solicitation, advertisement, or inducement of any sort whatsoever from Ghadei &amp;
                  Associates or any of its members.
                </p>
                <p>
                  The information shared on this site is general in nature and should not be construed as
                  professional advice. Visitors are advised to seek independent professional consultation
                  before acting on any information presented here.
                </p>
                <p>
                  Ghadei &amp; Associates is not liable for any consequences arising from action taken
                  based solely on the information contained on this website.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
