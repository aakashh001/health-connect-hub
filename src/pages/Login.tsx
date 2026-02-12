import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Heart, LogIn } from "lucide-react";

export default function Login() {
  const { loginAsUser, loginAsDoctor, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    loginAsUser();
    toast({ title: "Welcome!", description: "Logged in successfully." });
    navigate("/search");
  };

  const handleDoctorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const approved = await loginAsDoctor(doctorEmail, doctorPassword);
    setLoading(false);
    if (approved) {
      toast({ title: "Welcome, Doctor!", description: "Redirecting to dashboard." });
      navigate("/doctor-dashboard");
    } else {
      toast({ title: "Awaiting Approval", description: "Your account is pending admin approval.", variant: "destructive" });
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await loginAsAdmin(adminEmail, adminPassword);
    setLoading(false);
    if (success) {
      toast({ title: "Admin Access", description: "Welcome, Super Admin." });
      navigate("/admin-dashboard");
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Heart className="h-10 w-10 text-primary fill-primary mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-foreground">Login to InnovaRise</h1>
            <p className="text-muted-foreground text-sm mt-1">Choose your account type</p>
          </div>

          <Tabs defaultValue="user" className="bg-card rounded-lg card-shadow border border-border p-6">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="user">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <p className="text-sm text-muted-foreground mb-6 text-center">Sign in with your Google account to book appointments.</p>
              <Button className="w-full gap-2" size="lg" onClick={handleGoogleLogin}>
                <LogIn className="h-4 w-4" /> Sign in with Google
              </Button>
            </TabsContent>

            <TabsContent value="doctor">
              <form onSubmit={handleDoctorLogin} className="space-y-4">
                <div>
                  <Label htmlFor="d-email">Email</Label>
                  <Input id="d-email" type="email" required value={doctorEmail} onChange={e => setDoctorEmail(e.target.value)} placeholder="doctor@clinic.com" />
                </div>
                <div>
                  <Label htmlFor="d-pass">Password</Label>
                  <Input id="d-pass" type="password" required value={doctorPassword} onChange={e => setDoctorPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Doctor Login"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">Demo: doctor@clinic.com (approved)</p>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <Label htmlFor="a-email">Email</Label>
                  <Input id="a-email" type="email" required value={adminEmail} onChange={e => setAdminEmail(e.target.value)} placeholder="admin@innovarise.com" />
                </div>
                <div>
                  <Label htmlFor="a-pass">Password</Label>
                  <Input id="a-pass" type="password" required value={adminPassword} onChange={e => setAdminPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Admin Login"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">Demo: admin@innovarise.com / admin123</p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
