import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { registerDoctor } from "@/api/placeholder";
import Navbar from "@/components/Navbar";
import { UserPlus } from "lucide-react";

const specializations = ["Cardiology", "Orthopedics", "General Medicine", "Pediatrics", "Dermatology", "Neurology", "Gynecology", "ENT"];

export default function RegisterDoctor() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", experience: "", designation: "",
    specialization: "", clinicName: "", clinicLocation: "", consultingFee: "", bio: "",
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await registerDoctor(form);
    setLoading(false);
    if (res.success) {
      toast({ title: "Registration Submitted!", description: res.message });
      navigate("/login");
    } else {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <UserPlus className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-foreground">Register Your Clinic</h1>
            <p className="text-muted-foreground text-sm mt-1">Submit your details for admin verification</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-lg card-shadow border border-border p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input required value={form.fullName} onChange={e => update("fullName", e.target.value)} placeholder="Dr. Full Name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" required value={form.email} onChange={e => update("email", e.target.value)} placeholder="doctor@clinic.com" />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" required value={form.password} onChange={e => update("password", e.target.value)} placeholder="••••••••" />
              </div>
              <div>
                <Label>Experience</Label>
                <Input required value={form.experience} onChange={e => update("experience", e.target.value)} placeholder="e.g., 10 years" />
              </div>
              <div>
                <Label>Designation</Label>
                <Input required value={form.designation} onChange={e => update("designation", e.target.value)} placeholder="e.g., Senior Cardiologist" />
              </div>
              <div>
                <Label>Specialization</Label>
                <Select onValueChange={v => update("specialization", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {specializations.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Clinic Name</Label>
                <Input required value={form.clinicName} onChange={e => update("clinicName", e.target.value)} placeholder="Clinic Name" />
              </div>
              <div>
                <Label>Clinic Location</Label>
                <Input required value={form.clinicLocation} onChange={e => update("clinicLocation", e.target.value)} placeholder="Area, City" />
              </div>
              <div>
                <Label>Consulting Fee</Label>
                <Input required value={form.consultingFee} onChange={e => update("consultingFee", e.target.value)} placeholder="e.g., ₹500" />
              </div>
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea value={form.bio} onChange={e => update("bio", e.target.value)} placeholder="Brief professional bio..." rows={3} />
            </div>
            <div>
              <Label>Upload Certifications</Label>
              <Input type="file" accept=".pdf,.jpg,.png" multiple className="cursor-pointer" />
              <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG files accepted</p>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Submitting..." : "Submit Registration"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
