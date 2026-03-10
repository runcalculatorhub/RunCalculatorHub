import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeInputProps {
  hours: string;
  minutes: string;
  seconds: string;
  onHoursChange: (v: string) => void;
  onMinutesChange: (v: string) => void;
  onSecondsChange: (v: string) => void;
  label?: string;
  showHours?: boolean;
}

export default function TimeInput({
  hours,
  minutes,
  seconds,
  onHoursChange,
  onMinutesChange,
  onSecondsChange,
  label = "Target Finish Time",
  showHours = true,
}: TimeInputProps) {
  return (
    <div>
      <Label className="text-sm font-medium text-foreground mb-2 block">{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        {showHours && (
          <div>
            <Input
              type="number"
              min="0"
              max="23"
              placeholder="HH"
              value={hours}
              onChange={(e) => onHoursChange(e.target.value)}
              className="text-center bg-white"
              data-testid="input-hours"
            />
            <span className="text-xs text-muted-foreground mt-1 block text-center">Hours</span>
          </div>
        )}
        <div>
          <Input
            type="number"
            min="0"
            max="59"
            placeholder="MM"
            value={minutes}
            onChange={(e) => onMinutesChange(e.target.value)}
            className="text-center bg-white"
            data-testid="input-minutes"
          />
          <span className="text-xs text-muted-foreground mt-1 block text-center">Minutes</span>
        </div>
        <div>
          <Input
            type="number"
            min="0"
            max="59"
            placeholder="SS"
            value={seconds}
            onChange={(e) => onSecondsChange(e.target.value)}
            className="text-center bg-white"
            data-testid="input-seconds"
          />
          <span className="text-xs text-muted-foreground mt-1 block text-center">Seconds</span>
        </div>
      </div>
    </div>
  );
}
