import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { fetchHospitals, fetchDoctorsBySpecialization, fetchAvailableSlots, Hospital, Doctor, TimeSlot } from "@/api/placeholder";
import Navbar from "@/components/Navbar";
import HospitalCard from "@/components/HospitalCard";
import DoctorCard from "@/components/DoctorCard";
import SlotSelector from "@/components/SlotSelector";
import { Search, MapPin, Loader2 } from "lucide-react";

const states = ["Tamil Nadu", "Karnataka", "Maharashtra", "Delhi", "Kerala"];
const specializations = ["Cardiology", "Orthopedics", "General Medicine", "Pediatrics", "Dermatology"];

export default function SearchPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ state: "", area: "", pincode: "" });
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Specialization step
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // Slot step
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    const res = await fetchHospitals(filters);
    setHospitals(res);
    setLoading(false);
  };

  const handleSelectHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setSelectedSpec("");
    setDoctors([]);
  };

  const handleSpecChange = async (spec: string) => {
    setSelectedSpec(spec);
    if (!selectedHospital) return;
    setLoadingDoctors(true);
    const res = await fetchDoctorsBySpecialization(selectedHospital.id, spec);
    setDoctors(res);
    setLoadingDoctors(false);
  };

  const handleViewSlots = async (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setLoadingSlots(true);
    setSelectedSlot(null);
    const res = await fetchAvailableSlots(doctor.id, "2026-02-15");
    setSlots(res);
    setLoadingSlots(false);
  };

  const handleSlotSelect = (slotId: string, time: string) => {
    setSelectedSlot(slotId);
    setSelectedSlotTime(time);
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedSlotTime) return;
    navigate(`/book-appointment?doctorId=${selectedDoctor.id}&doctorName=${encodeURIComponent(selectedDoctor.name)}&slot=${encodeURIComponent(selectedSlotTime)}&fee=${encodeURIComponent(selectedDoctor.consultingFee)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Hospitals & Clinics</h1>
          <p className="text-muted-foreground">Search by location to discover healthcare options near you</p>
        </div>

        {/* Search filters */}
        <div className="bg-card rounded-lg card-shadow border border-border p-6 mb-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>State</Label>
              <Select onValueChange={v => setFilters(p => ({ ...p, state: v }))}>
                <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                <SelectContent>
                  {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Area</Label>
              <Input placeholder="e.g., Chennai" value={filters.area} onChange={e => setFilters(p => ({ ...p, area: e.target.value }))} />
            </div>
            <div>
              <Label>Pincode</Label>
              <Input placeholder="e.g., 600001" value={filters.pincode} onChange={e => setFilters(p => ({ ...p, pincode: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSearch} disabled={loading} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Search
            </Button>
            <Button variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" /> Use My Location
            </Button>
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {hospitals.length} Hospital{hospitals.length !== 1 ? "s" : ""} Found
            </h2>
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : hospitals.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No hospitals found. Try different filters.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitals.map(h => (
                  <HospitalCard key={h.id} hospital={h} onSelect={handleSelectHospital} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Specialization Dialog */}
        <Dialog open={!!selectedHospital} onOpenChange={() => { setSelectedHospital(null); setDoctors([]); }}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedHospital?.name}</DialogTitle>
            </DialogHeader>

            <div className="mb-4">
              <Label>Select Specialization</Label>
              <Select onValueChange={handleSpecChange} value={selectedSpec}>
                <SelectTrigger><SelectValue placeholder="Choose specialization" /></SelectTrigger>
                <SelectContent>
                  {(selectedHospital?.specializations || specializations).map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {loadingDoctors ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : selectedSpec && doctors.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No doctors available for this specialization.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctors.map(d => <DoctorCard key={d.id} doctor={d} onViewSlots={handleViewSlots} />)}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Slot Selection Dialog */}
        <Dialog open={!!selectedDoctor} onOpenChange={() => { setSelectedDoctor(null); setSlots([]); setSelectedSlot(null); }}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Book with {selectedDoctor?.name}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground mb-4">Select an available time slot for Feb 15, 2026</p>
            {loadingSlots ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : (
              <>
                <SlotSelector slots={slots} selectedSlot={selectedSlot} onSelectSlot={handleSlotSelect} />
                {selectedSlot && (
                  <Button className="w-full mt-4" size="lg" onClick={handleBookAppointment}>
                    Continue to Booking
                  </Button>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
