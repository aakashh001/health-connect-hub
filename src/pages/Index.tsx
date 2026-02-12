import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Shield, Clock, CheckCircle, ArrowRight, Building2, UserCheck, CalendarCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Shield, title: "Transparent Government Data", description: "Access verified information about government hospitals near you." },
  { icon: UserCheck, title: "Verified Clinic Doctors", description: "All clinic doctors are admin-verified before listing." },
  { icon: Clock, title: "Real-time Slot Booking", description: "Book available appointment slots instantly online." },
  { icon: CheckCircle, title: "Admin Approved Listings", description: "Every listing is reviewed for quality and accuracy." },
];

const steps = [
  { icon: Search, label: "Search", desc: "Find hospitals by location" },
  { icon: Building2, label: "Select Hospital", desc: "Choose from verified listings" },
  { icon: UserCheck, label: "Choose Doctor", desc: "View doctor profiles & fees" },
  { icon: CalendarCheck, label: "Book Appointment", desc: "Pick a slot and confirm" },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-4 animate-fade-in leading-tight">
            Transparent Healthcare<br />Access for Everyone
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Discover Government Hospitals & Verified Local Clinics Near You
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/search">
              <Button size="lg" variant="secondary" className="font-semibold gap-2">
                <Search className="h-4 w-4" /> Search Hospitals
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Doctor Login
              </Button>
            </Link>
            <Link to="/register-doctor">
              <Button size="lg" variant="outline" className="font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Register Clinic
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why InnovaRise?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-card-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary-foreground">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mb-4">
                  <s.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-secondary-foreground mb-1">{s.label}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute right-0 top-6 translate-x-1/2 h-6 w-6 text-primary/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
