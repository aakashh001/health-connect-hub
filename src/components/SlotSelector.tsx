import { TimeSlot } from "@/api/placeholder";
import { Clock } from "lucide-react";

interface Props {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelectSlot: (slotId: string, time: string) => void;
}

export default function SlotSelector({ slots, selectedSlot, onSelectSlot }: Props) {
  if (slots.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No available slots for this date.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {slots.map(slot => (
        <button
          key={slot.id}
          onClick={() => onSelectSlot(slot.id, slot.time)}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-lg text-sm font-medium transition-all border ${
            selectedSlot === slot.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-card-foreground border-border hover:border-primary hover:bg-primary/5"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          {slot.time}
        </button>
      ))}
    </div>
  );
}
