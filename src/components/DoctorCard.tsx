import { Doctor } from "@/api/placeholder";
import { User, Briefcase, Stethoscope, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  doctor: Doctor;
  onViewSlots: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onViewSlots }: Props) {
  return (
    <div className="bg-card rounded-lg p-5 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">{doctor.name}</h3>
          <p className="text-xs text-muted-foreground">{doctor.designation}</p>
        </div>
      </div>
      <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-3.5 w-3.5" />
          <span>{doctor.experience} experience</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope className="h-3.5 w-3.5" />
          <span>{doctor.specialization}</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee className="h-3.5 w-3.5" />
          <span>{doctor.consultingFee}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{doctor.bio}</p>
      <Button size="sm" className="w-full" onClick={() => onViewSlots(doctor)}>
        View Slots
      </Button>
    </div>
  );
}
