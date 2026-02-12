import { Hospital } from "@/api/placeholder";
import { Building2, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  hospital: Hospital;
  onSelect: (hospital: Hospital) => void;
}

export default function HospitalCard({ hospital, onSelect }: Props) {
  return (
    <div className="bg-card rounded-lg p-5 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-card-foreground">{hospital.name}</h3>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          hospital.type === "Government"
            ? "bg-primary/10 text-primary"
            : "bg-accent/10 text-accent"
        }`}>
          {hospital.type}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
        <MapPin className="h-3.5 w-3.5" />
        {hospital.address}
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
        <Tag className="h-3.5 w-3.5" />
        {hospital.specializations.slice(0, 3).join(", ")}{hospital.specializations.length > 3 ? "..." : ""}
      </div>
      <Button size="sm" className="w-full" onClick={() => onSelect(hospital)}>
        View Specializations
      </Button>
    </div>
  );
}
