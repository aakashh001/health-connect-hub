import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchAppointments, approveAppointment, rejectAppointment, Appointment } from "@/api/placeholder";
import Navbar from "@/components/Navbar";
import { CalendarCheck, User, Phone, Clock, AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function DoctorDashboard() {
  const { user, doctorApproved } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctorApproved) {
      fetchAppointments(user?.id?.replace("d_", "d")).then(data => {
        setAppointments(data);
        setLoading(false);
      });
    }
  }, [doctorApproved, user]);

  if (!doctorApproved) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertCircle className="h-16 w-16 text-warning mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Awaiting Admin Approval</h1>
          <p className="text-muted-foreground">Your account is pending verification. You'll be notified once approved.</p>
        </div>
      </div>
    );
  }

  const handleAction = async (id: string, action: "approve" | "reject") => {
    const fn = action === "approve" ? approveAppointment : rejectAppointment;
    await fn(id);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: action === "approve" ? "approved" : "rejected" } : a));
    toast({ title: `Appointment ${action === "approve" ? "Approved" : "Rejected"}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <CalendarCheck className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Doctor Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome, {user?.name}</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-foreground">Upcoming Appointments</h2>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : appointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No appointments yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map(a => (
              <div key={a.id} className="bg-card rounded-lg card-shadow border border-border p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-card-foreground">{a.patientName}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    a.status === "approved" ? "bg-accent/10 text-accent" :
                    a.status === "rejected" ? "bg-destructive/10 text-destructive" :
                    "bg-warning/10 text-warning"
                  }`}>
                    {a.status}
                  </span>
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  <p>Age: {a.age} | Gender: {a.gender}</p>
                  <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{a.contact}</div>
                  <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{a.slotTime} • {a.date}</div>
                  <p className="text-card-foreground font-medium">{a.problem}</p>
                </div>
                {a.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1" onClick={() => handleAction(a.id, "approve")}>
                      <CheckCircle className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1 text-destructive" onClick={() => handleAction(a.id, "reject")}>
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
