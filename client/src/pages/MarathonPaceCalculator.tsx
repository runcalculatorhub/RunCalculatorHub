import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import TimeInput from "@/components/TimeInput";
import StatCard from "@/components/StatCard";
import PaceTable from "@/components/PaceTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { marathonFaqs } from "@/data/faqs";
import {
  MARATHON_MILES, MARATHON_KM,
  timeToSeconds, formatPace, formatTime,
  calculatePace, milePaceToKmPace,
  generateSplits,
} from "@/utils/calculations";
import { RotateCcw } from "lucide-react";

export default function MarathonPaceCalculator() {
  const [hours, setHours] = useState("4");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [unit, setUnit] = useState<"miles" | "km">("miles");
  const [strategy, setStrategy] = useState<"even" | "negative" | "conservative">("even");

  const totalSeconds = useMemo(() =>
    timeToSeconds(parseInt(hours) || 0, parseInt(minutes) || 0, parseInt(seconds) || 0),
  [hours, minutes, seconds]);

  const results = useMemo(() => {
    if (totalSeconds <= 0) return null;
    const pacePerMile = calculatePace(totalSeconds, MARATHON_MILES);
    const pacePerKm = calculatePace(totalSeconds, MARATHON_KM);
    const halfSplit = totalSeconds / 2;
    const splitInterval = unit === "miles" ? 1 : 1;
    const splitDistance = unit === "miles" ? MARATHON_MILES : MARATHON_KM;
    const splits = generateSplits(totalSeconds, splitDistance, splitInterval, strategy);

    return { pacePerMile, pacePerKm, halfSplit, splits };
  }, [totalSeconds, unit, strategy]);

  const reset = () => {
    setHours("4");
    setMinutes("0");
    setSeconds("0");
    setUnit("miles");
    setStrategy("even");
  };

  const examples = (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">Example Marathon Pacing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { goal: "3:30 Marathon", pace: "8:01/mi", kmPace: "4:58/km" },
          { goal: "4:00 Marathon", pace: "9:09/mi", kmPace: "5:41/km" },
          { goal: "4:30 Marathon", pace: "10:18/mi", kmPace: "6:24/km" },
        ].map((ex, i) => (
          <div key={i} className="bg-white rounded-xl border border-card-border p-5" data-testid={`example-${i}`}>
            <h3 className="font-semibold text-foreground mb-2">{ex.goal}</h3>
            <p className="text-sm text-muted-foreground">
              Pace: {ex.pace} ({ex.kmPace})
            </p>
          </div>
        ))}
      </div>
    </section>
  );

  const howToUse = (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">How to Use the Marathon Pace Calculator</h2>
      <div className="bg-white rounded-xl border border-card-border p-6">
        <div className="prose prose-sm text-muted-foreground max-w-none">
          <p>
            Enter your target marathon finish time in hours, minutes, and seconds. The calculator will instantly show you the pace per mile and pace per kilometer you need to maintain, along with a detailed split table.
          </p>
          <p className="mt-3">
            Use the pacing strategy dropdown to see how different approaches affect your splits. <strong>Even pace</strong> keeps each mile the same. <strong>Negative split</strong> starts slightly slower and finishes faster. <strong>Conservative start</strong> goes easy in the early miles and picks up in the final stretch.
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <ToolPageLayout
      title="Marathon Pace Calculator"
      description="Calculate your target marathon pace, mile splits, and pacing strategy. Enter your goal finish time and get a detailed race plan."
      toolId="marathon-pace"
      faqs={marathonFaqs}
      belowCalculator={<>{howToUse}{examples}</>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="calculator-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Enter Your Goal</h2>
          <div className="space-y-5">
            <TimeInput
              hours={hours} minutes={minutes} seconds={seconds}
              onHoursChange={setHours} onMinutesChange={setMinutes} onSecondsChange={setSeconds}
            />
            <div className="grid grid-cols-2 gap-3">
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
              <div>
                <Label className="text-sm font-medium mb-2 block">Strategy</Label>
                <Select value={strategy} onValueChange={(v) => setStrategy(v as "even" | "negative" | "conservative")}>
                  <SelectTrigger className="bg-white" data-testid="select-strategy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="even">Even Pace</SelectItem>
                    <SelectItem value="negative">Negative Split</SelectItem>
                    <SelectItem value="conservative">Conservative Start</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <StatCard label="Half Split" value={formatTime(results.halfSplit)} />
                <StatCard label="Finish Time" value={formatTime(totalSeconds)} />
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm">
              Enter a target time to see your pace
            </div>
          )}
        </div>
      </div>

      {results && results.splits.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Split Table ({unit === "miles" ? "Mile" : "KM"} Splits)
          </h3>
          <PaceTable
            headers={["Split", `${unit === "miles" ? "Mile" : "KM"}`, "Split Time", "Cumulative"]}
            rows={results.splits.map((s) => [
              String(s.split),
              s.distance.toFixed(1),
              s.splitTime,
              s.cumulativeTime,
            ])}
          />
        </div>
      )}
    </ToolPageLayout>
  );
}
