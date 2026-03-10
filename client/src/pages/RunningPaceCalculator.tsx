import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { runningPaceFaqs } from "@/data/faqs";
import {
  timeToSeconds, formatPace, formatTime,
  calculatePace, paceToSpeed, milesToKm, kmToMiles,
} from "@/utils/calculations";
import { RotateCcw } from "lucide-react";

export default function RunningPaceCalculator() {
  const [distance, setDistance] = useState("5");
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("40");
  const [seconds, setSeconds] = useState("0");

  const totalSeconds = useMemo(() =>
    timeToSeconds(parseInt(hours) || 0, parseInt(minutes) || 0, parseInt(seconds) || 0),
  [hours, minutes, seconds]);

  const results = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    if (dist <= 0 || totalSeconds <= 0) return null;

    const distMiles = distanceUnit === "miles" ? dist : kmToMiles(dist);
    const distKm = distanceUnit === "km" ? dist : milesToKm(dist);

    const pacePerMile = calculatePace(totalSeconds, distMiles);
    const pacePerKm = calculatePace(totalSeconds, distKm);
    const speedMph = paceToSpeed(pacePerMile);
    const speedKph = paceToSpeed(pacePerKm);

    return { pacePerMile, pacePerKm, speedMph, speedKph };
  }, [distance, distanceUnit, totalSeconds]);

  const reset = () => {
    setDistance("5"); setDistanceUnit("miles"); setHours("0"); setMinutes("40"); setSeconds("0");
  };

  const howToUse = (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">How to Calculate Running Pace</h2>
      <div className="bg-white rounded-xl border border-card-border p-6">
        <div className="prose prose-sm text-muted-foreground max-w-none space-y-3">
          <p>Running pace is calculated by dividing your total running time by the distance covered. The result tells you how long it takes to run one mile or one kilometer.</p>
          <p>For example, if you ran 5 miles in 40 minutes, your pace is 40 ÷ 5 = 8:00 per mile. To convert to kilometers, divide 40 by 8.05 (5 miles in km) = 4:58 per km.</p>
          <p>This calculator handles all the math for you. Simply enter your distance and time, and it shows your pace in both miles and kilometers, plus your average speed.</p>
        </div>
      </div>
    </section>
  );

  return (
    <ToolPageLayout
      title="Running Pace Calculator"
      description="Calculate your running pace per mile and per kilometer for any distance and time. Find your speed in mph and kph."
      toolId="running-pace"
      faqs={runningPaceFaqs}
      belowCalculator={howToUse}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="calculator-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Enter Your Run</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium mb-2 block">Distance</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="bg-white"
                  data-testid="input-distance"
                  placeholder="e.g. 5"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Unit</Label>
                <Select value={distanceUnit} onValueChange={(v) => setDistanceUnit(v as "miles" | "km")}>
                  <SelectTrigger className="bg-white" data-testid="select-distance-unit"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="miles">Miles</SelectItem>
                    <SelectItem value="km">Kilometers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Time</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Input type="number" min="0" max="23" placeholder="HH" value={hours}
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
            <Button variant="outline" onClick={reset} className="w-full" data-testid="button-reset">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="results-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Your Pace & Speed</h2>
          {results ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Pace/Mile" value={formatPace(results.pacePerMile)} accent />
                <StatCard label="Pace/KM" value={formatPace(results.pacePerKm)} accent />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Speed (mph)" value={results.speedMph.toFixed(1)} />
                <StatCard label="Speed (kph)" value={results.speedKph.toFixed(1)} />
              </div>
              <StatCard label="Total Time" value={formatTime(totalSeconds)} />
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm">Enter distance and time to see your pace</div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
