import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchAllDoctors, fetchAppointments, approveDoctor, rejectDoctor, Doctor, Appointment } from "@/api/placeholder";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, CalendarCheck, UserCheck, UserX, Loader2, Trash2, Stethoscope, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAllDoctors(), fetchAppointments()]).then(([d, a]) => {
      setDoctors(d);
      setAppointments(a);
      setLoading(false);
    });
  }, []);

  const handleDoctorAction = async (id: string, action: "approve" | "reject") => {
    const fn = action === "approve" ? approveDoctor : rejectDoctor;
    await fn(id);
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: action === "approve" ? "approved" : "rejected" } : d));
    toast({ title: `Doctor ${action === "approve" ? "Approved" : "Rejected"}` });
  };

  const handleRemove = (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
    toast({ title: "Doctor Removed" });
  };

  const stats = [
    { label: "Total Doctors", value: doctors.length, icon: Stethoscope },
    { label: "Approved", value: doctors.filter(d => d.status === "approved").length, icon: UserCheck },
    { label: "Total Bookings", value: appointments.length, icon: CalendarCheck },
    { label: "Pending", value: doctors.filter(d => d.status === "pending").length, icon: Clock },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Manage doctors and appointments</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-card rounded-lg card-shadow border border-border p-5 text-center">
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="doctors">
          <TabsList className="mb-6">
            <TabsTrigger value="doctors" className="gap-1"><Users className="h-4 w-4" /> Doctors</TabsTrigger>
            <TabsTrigger value="appointments" className="gap-1"><CalendarCheck className="h-4 w-4" /> Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="doctors">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3 px-4 font-medium text-muted-foreground">Name</th>
                    <th className="py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Specialization</th>
                    <th className="py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Clinic</th>
                    <th className="py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(d => (
                    <tr key={d.id} className="border-b border-border">
                      <td className="py-3 px-4 text-card-foreground font-medium">{d.name}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{d.specialization}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{d.clinicName || "N/A"}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          d.status === "approved" ? "bg-accent/10 text-accent" :
                          d.status === "rejected" ? "bg-destructive/10 text-destructive" :
                          "bg-warning/10 text-warning"
                        }`}>{d.status}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1.5">
                          {d.status === "pending" && (
                            <>
                              <Button size="sm" variant="ghost" onClick={() => handleDoctorAction(d.id, "approve")}><UserCheck className="h-4 w-4 text-accent" /></Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDoctorAction(d.id, "reject")}><UserX className="h-4 w-4 text-destructive" /></Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => handleRemove(d.id)}><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3 px-4 font-medium text-muted-foreground">Patient</th>
                    <th className="py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Doctor</th>
                    <th className="py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Date/Time</th>
                    <th className="py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(a => (
                    <tr key={a.id} className="border-b border-border">
                      <td className="py-3 px-4 text-card-foreground font-medium">{a.patientName}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{a.doctorName}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{a.date} • {a.slotTime}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          a.status === "approved" ? "bg-accent/10 text-accent" :
                          a.status === "rejected" ? "bg-destructive/10 text-destructive" :
                          "bg-warning/10 text-warning"
                        }`}>{a.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
