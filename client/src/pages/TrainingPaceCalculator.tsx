import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trainingPaceFaqs } from "@/data/faqs";
import {
  timeToSeconds, getTrainingPaces,
  FIVE_K_KM, TEN_K_KM, HALF_MARATHON_KM, MARATHON_KM,
} from "@/utils/calculations";
import { RotateCcw, Heart, Flame, Zap, Route } from "lucide-react";

const distancePresets = [
  { label: "5K", km: FIVE_K_KM },
  { label: "10K", km: TEN_K_KM },
  { label: "Half Marathon", km: HALF_MARATHON_KM },
  { label: "Marathon", km: MARATHON_KM },
];

export default function TrainingPaceCalculator() {
  const [raceDistance, setRaceDistance] = useState("5K");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("0");

  const raceTime = useMemo(() =>
    timeToSeconds(parseInt(hours) || 0, parseInt(minutes) || 0, parseInt(seconds) || 0),
  [hours, minutes, seconds]);

  const distanceKm = distancePresets.find((d) => d.label === raceDistance)?.km || FIVE_K_KM;

  const results = useMemo(() => {
    if (raceTime <= 0) return null;
    return getTrainingPaces(raceTime, distanceKm);
  }, [raceTime, distanceKm]);

  const reset = () => { setRaceDistance("5K"); setHours("0"); setMinutes("25"); setSeconds("0"); };

  const paceZones = results ? [
    {
      icon: Heart,
      label: "Easy Pace",
      desc: "Recovery and base building",
      mile: `${results.easy.minMile} - ${results.easy.maxMile} /mi`,
      km: `${results.easy.min} - ${results.easy.max} /km`,
      color: "bg-green-50 border-green-200 text-green-700",
      iconColor: "text-green-600",
    },
    {
      icon: Flame,
      label: "Tempo Pace",
      desc: "Threshold training",
      mile: `${results.tempo.minMile} - ${results.tempo.maxMile} /mi`,
      km: `${results.tempo.min} - ${results.tempo.max} /km`,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      iconColor: "text-orange-600",
    },
    {
      icon: Zap,
      label: "Interval Pace",
      desc: "Speed & VO2max work",
      mile: `${results.interval.minMile} - ${results.interval.maxMile} /mi`,
      km: `${results.interval.min} - ${results.interval.max} /km`,
      color: "bg-red-50 border-red-200 text-red-700",
      iconColor: "text-red-600",
    },
    {
      icon: Route,
      label: "Long Run Pace",
      desc: "Endurance building",
      mile: `${results.longRun.minMile} - ${results.longRun.maxMile} /mi`,
      km: `${results.longRun.min} - ${results.longRun.max} /km`,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      iconColor: "text-blue-600",
    },
  ] : [];

  return (
    <ToolPageLayout
      title="Training Pace Calculator"
      description="Get your optimal easy, tempo, interval, and long run training paces based on a recent race result."
      toolId="training-pace"
      faqs={trainingPaceFaqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="calculator-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Your Recent Race</h2>
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-medium mb-2 block">Race Distance</Label>
              <Select value={raceDistance} onValueChange={setRaceDistance}>
                <SelectTrigger className="bg-white" data-testid="select-race-distance"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {distancePresets.map((d) => (
                    <SelectItem key={d.label} value={d.label}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Finish Time</Label>
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
            <Button variant="outline" onClick={reset} className="w-full" data-testid="button-reset">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </div>

        <div className="space-y-3" data-testid="results-card">
          {results ? (
            paceZones.map((zone, i) => (
              <div key={i} className={`rounded-xl border p-4 ${zone.color}`} data-testid={`zone-${zone.label.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="flex items-center gap-3 mb-2">
                  <zone.icon className={`w-5 h-5 ${zone.iconColor}`} />
                  <div>
                    <div className="font-semibold text-sm">{zone.label}</div>
                    <div className="text-xs opacity-75">{zone.desc}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="text-sm font-medium">{zone.mile}</div>
                  <div className="text-sm font-medium">{zone.km}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-card-border p-6">
              <div className="text-center py-10 text-muted-foreground text-sm">Enter a race result to see training paces</div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
