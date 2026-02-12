import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { submitAppointment } from "@/api/placeholder";
import Navbar from "@/components/Navbar";
import { CalendarCheck, CheckCircle } from "lucide-react";

export default function BookAppointment() {
  const [params] = useSearchParams();
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const doctorId = params.get("doctorId") || "";
  const doctorName = params.get("doctorName") || "";
  const slot = params.get("slot") || "";
  const fee = params.get("fee") || "";

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ patientName: "", age: "", gender: "", problem: "", contact: "" });

  if (!isAuthenticated || role !== "user") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Login Required</h1>
          <p className="text-muted-foreground mb-6">Please sign in with Google to book an appointment.</p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await submitAppointment({
      patientName: form.patientName,
      age: parseInt(form.age),
      gender: form.gender,
      problem: form.problem,
      contact: form.contact,
      doctorId,
      doctorName,
      slotTime: slot,
      date: "2026-02-15",
    });
    setLoading(false);
    if (res.success) {
      setSubmitted(true);
      toast({ title: "Appointment Booked!", description: res.message });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
          <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Appointment Confirmed!</h1>
          <p className="text-muted-foreground mb-1">Doctor: {doctorName}</p>
          <p className="text-muted-foreground mb-6">Time: {slot} | Fee: {fee}</p>
          <Button onClick={() => navigate("/search")}>Search More</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <CalendarCheck className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
            <p className="text-muted-foreground text-sm mt-1">{doctorName} • {slot} • {fee}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-lg card-shadow border border-border p-6 space-y-4">
            <div>
              <Label>Patient Name</Label>
              <Input required value={form.patientName} onChange={e => setForm(p => ({ ...p, patientName: e.target.value }))} placeholder="Full name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Age</Label>
                <Input type="number" required min={1} max={120} value={form.age} onChange={e => setForm(p => ({ ...p, age: e.target.value }))} placeholder="Age" />
              </div>
              <div>
                <Label>Gender</Label>
                <Select onValueChange={v => setForm(p => ({ ...p, gender: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Problem Description</Label>
              <Textarea required value={form.problem} onChange={e => setForm(p => ({ ...p, problem: e.target.value }))} placeholder="Describe your symptoms..." rows={3} />
            </div>
            <div>
              <Label>Contact Number</Label>
              <Input required value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Booking..." : "Confirm Appointment"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
