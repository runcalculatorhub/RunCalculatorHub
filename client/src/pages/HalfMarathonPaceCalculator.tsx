import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import TimeInput from "@/components/TimeInput";
import StatCard from "@/components/StatCard";
import PaceTable from "@/components/PaceTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { halfMarathonFaqs } from "@/data/faqs";
import {
  HALF_MARATHON_MILES, HALF_MARATHON_KM,
  timeToSeconds, formatPace, formatTime,
  calculatePace, generateSplits,
} from "@/utils/calculations";
import { RotateCcw } from "lucide-react";

export default function HalfMarathonPaceCalculator() {
  const [hours, setHours] = useState("1");
  const [minutes, setMinutes] = useState("45");
  const [seconds, setSeconds] = useState("0");
  const [unit, setUnit] = useState<"miles" | "km">("miles");

  const totalSeconds = useMemo(() =>
    timeToSeconds(parseInt(hours) || 0, parseInt(minutes) || 0, parseInt(seconds) || 0),
  [hours, minutes, seconds]);

  const results = useMemo(() => {
    if (totalSeconds <= 0) return null;
    const pacePerMile = calculatePace(totalSeconds, HALF_MARATHON_MILES);
    const pacePerKm = calculatePace(totalSeconds, HALF_MARATHON_KM);
    const fiveKSplit = (totalSeconds / HALF_MARATHON_KM) * 5;
    const splitDistance = unit === "miles" ? HALF_MARATHON_MILES : HALF_MARATHON_KM;
    const splits = generateSplits(totalSeconds, splitDistance, 1, "even");
    return { pacePerMile, pacePerKm, fiveKSplit, splits };
  }, [totalSeconds, unit]);

  const reset = () => { setHours("1"); setMinutes("45"); setSeconds("0"); };

  const examples = (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">Example Half Marathon Times</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { goal: "1:30 Half", pace: "6:52/mi", kmPace: "4:16/km" },
          { goal: "1:45 Half", pace: "8:01/mi", kmPace: "4:58/km" },
          { goal: "2:00 Half", pace: "9:09/mi", kmPace: "5:41/km" },
        ].map((ex, i) => (
          <div key={i} className="bg-white rounded-xl border border-card-border p-5" data-testid={`example-${i}`}>
            <h3 className="font-semibold text-foreground mb-2">{ex.goal}</h3>
            <p className="text-sm text-muted-foreground">Pace: {ex.pace} ({ex.kmPace})</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <ToolPageLayout
      title="Half Marathon Pace Calculator"
      description="Calculate your half marathon pace, splits, and 5K estimates. Enter your target finish time to get a detailed plan."
      toolId="half-marathon-pace"
      faqs={halfMarathonFaqs}
      belowCalculator={examples}
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
                <SelectTrigger className="bg-white" data-testid="select-unit">
                  <SelectValue />
                </SelectTrigger>
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
                <StatCard label="5K Split" value={formatTime(results.fiveKSplit)} />
                <StatCard label="Finish Time" value={formatTime(totalSeconds)} />
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
