import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import StatCard from "@/components/StatCard";
import PaceTable from "@/components/PaceTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { raceTimePredictorFaqs } from "@/data/faqs";
import {
  timeToSeconds, formatTime, formatPace, calculatePace,
  riegelPrediction,
  FIVE_K_KM, TEN_K_KM, HALF_MARATHON_KM, MARATHON_KM,
  FIVE_K_MILES, TEN_K_MILES, HALF_MARATHON_MILES, MARATHON_MILES,
} from "@/utils/calculations";
import { RotateCcw, AlertCircle } from "lucide-react";

const distancePresets: { label: string; km: number; miles: number }[] = [
  { label: "5K", km: FIVE_K_KM, miles: FIVE_K_MILES },
  { label: "10K", km: TEN_K_KM, miles: TEN_K_MILES },
  { label: "Half Marathon", km: HALF_MARATHON_KM, miles: HALF_MARATHON_MILES },
  { label: "Marathon", km: MARATHON_KM, miles: MARATHON_MILES },
];

export default function RaceTimePredictor() {
  const [sourceDistance, setSourceDistance] = useState("5K");
  const [sourceHours, setSourceHours] = useState("0");
  const [sourceMinutes, setSourceMinutes] = useState("25");
  const [sourceSeconds, setSourceSeconds] = useState("0");
  const [targetDistance, setTargetDistance] = useState("Half Marathon");

  const sourceTime = useMemo(() =>
    timeToSeconds(parseInt(sourceHours) || 0, parseInt(sourceMinutes) || 0, parseInt(sourceSeconds) || 0),
  [sourceHours, sourceMinutes, sourceSeconds]);

  const sourceKm = distancePresets.find((d) => d.label === sourceDistance)?.km || FIVE_K_KM;
  const targetPreset = distancePresets.find((d) => d.label === targetDistance);
  const targetKm = targetPreset?.km || HALF_MARATHON_KM;
  const targetMiles = targetPreset?.miles || HALF_MARATHON_MILES;

  const results = useMemo(() => {
    if (sourceTime <= 0) return null;

    const predictedTime = riegelPrediction(sourceKm, sourceTime, targetKm);
    const pacePerKm = calculatePace(predictedTime, targetKm);
    const pacePerMile = calculatePace(predictedTime, targetMiles);

    const allPredictions = distancePresets.map((d) => ({
      distance: d.label,
      time: formatTime(riegelPrediction(sourceKm, sourceTime, d.km)),
      pace: formatPace(calculatePace(riegelPrediction(sourceKm, sourceTime, d.km), d.miles)),
    }));

    return { predictedTime, pacePerKm, pacePerMile, allPredictions };
  }, [sourceTime, sourceKm, targetKm, targetMiles]);

  const reset = () => {
    setSourceDistance("5K"); setSourceHours("0"); setSourceMinutes("25"); setSourceSeconds("0");
    setTargetDistance("Half Marathon");
  };

  return (
    <ToolPageLayout
      title="Race Time Predictor"
      description="Predict your finish time for any race distance based on a recent race result. Uses the proven Riegel formula."
      toolId="race-time-predictor"
      faqs={raceTimePredictorFaqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="calculator-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Your Recent Race</h2>
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-medium mb-2 block">Race Distance</Label>
              <Select value={sourceDistance} onValueChange={setSourceDistance}>
                <SelectTrigger className="bg-white" data-testid="select-source-distance"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {distancePresets.map((d) => (
                    <SelectItem key={d.label} value={d.label}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Your Finish Time</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Input type="number" min="0" placeholder="HH" value={sourceHours}
                    onChange={(e) => setSourceHours(e.target.value)} className="text-center bg-white" data-testid="input-hours" />
                  <span className="text-xs text-muted-foreground mt-1 block text-center">Hours</span>
                </div>
                <div>
                  <Input type="number" min="0" max="59" placeholder="MM" value={sourceMinutes}
                    onChange={(e) => setSourceMinutes(e.target.value)} className="text-center bg-white" data-testid="input-minutes" />
                  <span className="text-xs text-muted-foreground mt-1 block text-center">Minutes</span>
                </div>
                <div>
                  <Input type="number" min="0" max="59" placeholder="SS" value={sourceSeconds}
                    onChange={(e) => setSourceSeconds(e.target.value)} className="text-center bg-white" data-testid="input-seconds" />
                  <span className="text-xs text-muted-foreground mt-1 block text-center">Seconds</span>
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Predict For</Label>
              <Select value={targetDistance} onValueChange={setTargetDistance}>
                <SelectTrigger className="bg-white" data-testid="select-target-distance"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {distancePresets.map((d) => (
                    <SelectItem key={d.label} value={d.label}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={reset} className="w-full" data-testid="button-reset">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="results-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Predicted {targetDistance} Time</h2>
          {results ? (
            <div className="space-y-4">
              <StatCard label={`${targetDistance} Time`} value={formatTime(results.predictedTime)} accent />
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Pace/Mile" value={formatPace(results.pacePerMile)} />
                <StatCard label="Pace/KM" value={formatPace(results.pacePerKm)} />
              </div>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700">
                  This is an estimate based on the Riegel formula. Actual race performance depends on training, conditions, and race-day execution.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm">Enter a recent race result to see predictions</div>
          )}
        </div>
      </div>

      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Predicted Times for All Distances</h3>
          <PaceTable
            headers={["Distance", "Predicted Time", "Pace/Mile"]}
            rows={results.allPredictions.map((p) => [p.distance, p.time, p.pace])}
          />
        </div>
      )}
    </ToolPageLayout>
  );
}
