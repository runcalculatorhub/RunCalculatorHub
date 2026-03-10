import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import PaceTable from "@/components/PaceTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { splitCalculatorFaqs } from "@/data/faqs";
import {
  timeToSeconds, generateSplits,
  FIVE_K_MILES, FIVE_K_KM, TEN_K_MILES, TEN_K_KM,
  HALF_MARATHON_MILES, HALF_MARATHON_KM, MARATHON_MILES, MARATHON_KM,
} from "@/utils/calculations";
import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";

const distancePresets = [
  { label: "5K", miles: FIVE_K_MILES, km: FIVE_K_KM },
  { label: "10K", miles: TEN_K_MILES, km: TEN_K_KM },
  { label: "Half Marathon", miles: HALF_MARATHON_MILES, km: HALF_MARATHON_KM },
  { label: "Marathon", miles: MARATHON_MILES, km: MARATHON_KM },
];

export default function SplitCalculator() {
  const [raceDistance, setRaceDistance] = useState("Marathon");
  const [hours, setHours] = useState("4");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [splitUnit, setSplitUnit] = useState<"mile" | "km" | "5k">("mile");

  const totalSeconds = useMemo(() =>
    timeToSeconds(parseInt(hours) || 0, parseInt(minutes) || 0, parseInt(seconds) || 0),
  [hours, minutes, seconds]);

  const preset = distancePresets.find((d) => d.label === raceDistance);
  const totalDistance = splitUnit === "km" || splitUnit === "5k" ? (preset?.km || MARATHON_KM) : (preset?.miles || MARATHON_MILES);
  const splitInterval = splitUnit === "5k" ? 5 : 1;

  const splits = useMemo(() => {
    if (totalSeconds <= 0) return [];
    return generateSplits(totalSeconds, totalDistance, splitInterval, "even");
  }, [totalSeconds, totalDistance, splitInterval]);

  const reset = () => { setRaceDistance("Marathon"); setHours("4"); setMinutes("0"); setSeconds("0"); setSplitUnit("mile"); };

  return (
    <ToolPageLayout
      title="Split Calculator"
      description="Generate detailed split tables for any race distance. Choose your interval and target time for a complete race plan."
      toolId="split-calculator"
      faqs={splitCalculatorFaqs}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-card-border p-6 mb-6" data-testid="calculator-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Set Up Your Splits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Race Distance</Label>
              <Select value={raceDistance} onValueChange={setRaceDistance}>
                <SelectTrigger className="bg-white" data-testid="select-distance"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {distancePresets.map((d) => (
                    <SelectItem key={d.label} value={d.label}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Split Interval</Label>
              <Select value={splitUnit} onValueChange={(v) => setSplitUnit(v as "mile" | "km" | "5k")}>
                <SelectTrigger className="bg-white" data-testid="select-split-unit"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mile">Per Mile</SelectItem>
                  <SelectItem value="km">Per Kilometer</SelectItem>
                  <SelectItem value="5k">Per 5K</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Label className="text-sm font-medium mb-2 block">Target Finish Time</Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Input type="number" min="0" placeholder="HH" value={hours}
                  onChange={(e) => setHours(e.target.value)} className="text-center bg-white" data-testid="input-hours" />
                <span className="text-xs text-muted-foreground mt-1 block text-center">Hours</span>
              </div>
              <div>
                <Input type="number" min="0" max="59" placeholder="MM" value={minutes}
                  onChange={(e) => setMinutes(e.target.value)} className="text-center bg-white" data-testid="input-minutes" />
                <span className="text-xs text-muted-foreground mt-1 block text-center">Minutes</span>
              </div>
              <div>
                <Input type="number" min="0" max="59" placeholder="SS" value={seconds}
                  onChange={(e) => setSeconds(e.target.value)} className="text-center bg-white" data-testid="input-seconds" />
                <span className="text-xs text-muted-foreground mt-1 block text-center">Seconds</span>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={reset} className="w-full mt-4" data-testid="button-reset">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>

        {splits.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {raceDistance} Split Table
            </h3>
            <PaceTable
              headers={["Split", splitUnit === "5k" ? "Distance (km)" : splitUnit === "km" ? "KM" : "Mile", "Split Time", "Cumulative"]}
              rows={splits.map((s) => [String(s.split), s.distance.toFixed(1), s.splitTime, s.cumulativeTime])}
            />
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
