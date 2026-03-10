import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import TimeInput from "@/components/TimeInput";
import StatCard from "@/components/StatCard";
import PaceTable from "@/components/PaceTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { tenKFaqs } from "@/data/faqs";
import {
  TEN_K_MILES, TEN_K_KM,
  timeToSeconds, formatPace, formatTime,
  calculatePace, paceToSpeed, generateSplits,
} from "@/utils/calculations";
import { RotateCcw } from "lucide-react";

export default function TenKPaceCalculator() {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("50");
  const [seconds, setSeconds] = useState("0");
  const [unit, setUnit] = useState<"miles" | "km">("miles");

  const totalSeconds = useMemo(() =>
    timeToSeconds(parseInt(hours) || 0, parseInt(minutes) || 0, parseInt(seconds) || 0),
  [hours, minutes, seconds]);

  const results = useMemo(() => {
    if (totalSeconds <= 0) return null;
    const pacePerMile = calculatePace(totalSeconds, TEN_K_MILES);
    const pacePerKm = calculatePace(totalSeconds, TEN_K_KM);
    const speedMph = paceToSpeed(pacePerMile);
    const speedKph = paceToSpeed(pacePerKm);
    const splitDistance = unit === "miles" ? TEN_K_MILES : TEN_K_KM;
    const splits = generateSplits(totalSeconds, splitDistance, 1, "even");
    return { pacePerMile, pacePerKm, speedMph, speedKph, splits };
  }, [totalSeconds, unit]);

  const reset = () => { setHours("0"); setMinutes("50"); setSeconds("0"); };

  return (
    <ToolPageLayout
      title="10K Pace Calculator"
      description="Calculate your 10K pace per mile and kilometer, plus detailed split tables for your target finish time."
      toolId="10k-pace"
      faqs={tenKFaqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="calculator-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Enter Your Goal</h2>
          <div className="space-y-5">
            <TimeInput hours={hours} minutes={minutes} seconds={seconds}
              onHoursChange={setHours} onMinutesChange={setMinutes} onSecondsChange={setSeconds} />
            <div>
              <Label className="text-sm font-medium mb-2 block">Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "miles" | "km")}>
                <SelectTrigger className="bg-white" data-testid="select-unit"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="miles">Miles</SelectItem>
                  <SelectItem value="km">Kilometers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={reset} className="w-full" data-testid="button-reset">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="results-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Your Pace</h2>
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
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm">Enter a target time to see your pace</div>
          )}
        </div>
      </div>

      {results && results.splits.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">{unit === "miles" ? "Mile" : "KM"} Splits</h3>
          <PaceTable
            headers={["Split", unit === "miles" ? "Mile" : "KM", "Split Time", "Cumulative"]}
            rows={results.splits.map((s) => [String(s.split), s.distance.toFixed(1), s.splitTime, s.cumulativeTime])}
          />
        </div>
      )}
    </ToolPageLayout>
  );
}
