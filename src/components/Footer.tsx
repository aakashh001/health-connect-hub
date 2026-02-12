import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Heart className="h-5 w-5 text-primary fill-primary" />
              <span className="text-gradient">InnovaRise</span>
            </div>
            <p className="text-sm text-muted-foreground">Transparent healthcare access for everyone.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-secondary-foreground">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/search" className="block text-muted-foreground hover:text-foreground transition-colors">Search Hospitals</Link>
              <Link to="/register-doctor" className="block text-muted-foreground hover:text-foreground transition-colors">Register Clinic</Link>
              <Link to="/login" className="block text-muted-foreground hover:text-foreground transition-colors">Login</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-secondary-foreground">Legal</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-secondary-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground">support@innovarise.com</p>
            <p className="text-sm text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2026 InnovaRise. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
