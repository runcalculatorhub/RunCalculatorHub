import { useState, useCallback, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import StatCard from "@/components/StatCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { paceConverterFaqs } from "@/data/faqs";
import { formatPace } from "@/utils/calculations";
import { RotateCcw } from "lucide-react";

function parsePace(value: string): number {
  const parts = value.split(":");
  if (parts.length === 2) {
    return (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
  }
  return (parseFloat(value) || 0) * 60;
}

export default function RunningPaceConverter() {
  const [pacePerMile, setPacePerMile] = useState("8:00");
  const [pacePerKm, setPacePerKm] = useState("");
  const [mph, setMph] = useState("");
  const [kph, setKph] = useState("");
  const [lastEdited, setLastEdited] = useState<"mile" | "km" | "mph" | "kph">("mile");

  const calculate = useCallback((source: "mile" | "km" | "mph" | "kph", value: string) => {
    setLastEdited(source);

    if (source === "mile") {
      setPacePerMile(value);
      const secs = parsePace(value);
      if (secs > 0) {
        const kmSecs = secs / 1.60934;
        const mphVal = 3600 / secs;
        const kphVal = 3600 / kmSecs;
        setPacePerKm(formatPace(kmSecs));
        setMph(mphVal.toFixed(1));
        setKph(kphVal.toFixed(1));
      }
    } else if (source === "km") {
      setPacePerKm(value);
      const secs = parsePace(value);
      if (secs > 0) {
        const mileSecs = secs * 1.60934;
        const mphVal = 3600 / mileSecs;
        const kphVal = 3600 / secs;
        setPacePerMile(formatPace(mileSecs));
        setMph(mphVal.toFixed(1));
        setKph(kphVal.toFixed(1));
      }
    } else if (source === "mph") {
      setMph(value);
      const speed = parseFloat(value);
      if (speed > 0) {
        const mileSecs = 3600 / speed;
        const kmSecs = mileSecs / 1.60934;
        const kphVal = speed * 1.60934;
        setPacePerMile(formatPace(mileSecs));
        setPacePerKm(formatPace(kmSecs));
        setKph(kphVal.toFixed(1));
      }
    } else if (source === "kph") {
      setKph(value);
      const speed = parseFloat(value);
      if (speed > 0) {
        const kmSecs = 3600 / speed;
        const mileSecs = kmSecs * 1.60934;
        const mphVal = speed / 1.60934;
        setPacePerMile(formatPace(mileSecs));
        setPacePerKm(formatPace(kmSecs));
        setMph(mphVal.toFixed(1));
      }
    }
  }, []);

  const reset = () => {
    setPacePerMile("8:00");
    setPacePerKm("");
    setMph("");
    setKph("");
    setLastEdited("mile");
    calculate("mile", "8:00");
  };

  useEffect(() => {
    calculate("mile", "8:00");
  }, []);

  return (
    <ToolPageLayout
      title="Running Pace Converter"
      description="Instantly convert between pace per mile, pace per km, mph, and kph. Enter any value and see all conversions."
      toolId="pace-converter"
      faqs={paceConverterFaqs}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-card-border p-6" data-testid="calculator-card">
          <h2 className="text-lg font-semibold text-foreground mb-5">Enter Any Value</h2>
          <p className="text-sm text-muted-foreground mb-5">Type in any field and the others will update automatically.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Pace per Mile (min:sec)</Label>
              <Input
                value={pacePerMile}
                onChange={(e) => calculate("mile", e.target.value)}
                placeholder="e.g. 8:00"
                className={`bg-white ${lastEdited === "mile" ? "ring-2 ring-primary/20 border-primary/30" : ""}`}
                data-testid="input-pace-mile"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Pace per KM (min:sec)</Label>
              <Input
                value={pacePerKm}
                onChange={(e) => calculate("km", e.target.value)}
                placeholder="e.g. 4:58"
                className={`bg-white ${lastEdited === "km" ? "ring-2 ring-primary/20 border-primary/30" : ""}`}
                data-testid="input-pace-km"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Speed (mph)</Label>
              <Input
                type="number"
                step="0.1"
                value={mph}
                onChange={(e) => calculate("mph", e.target.value)}
                placeholder="e.g. 7.5"
                className={`bg-white ${lastEdited === "mph" ? "ring-2 ring-primary/20 border-primary/30" : ""}`}
                data-testid="input-mph"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Speed (kph)</Label>
              <Input
                type="number"
                step="0.1"
                value={kph}
                onChange={(e) => calculate("kph", e.target.value)}
                placeholder="e.g. 12.1"
                className={`bg-white ${lastEdited === "kph" ? "ring-2 ring-primary/20 border-primary/30" : ""}`}
                data-testid="input-kph"
              />
            </div>
          </div>

          <Button variant="outline" onClick={reset} className="w-full mt-5" data-testid="button-reset">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <StatCard label="Pace/Mile" value={pacePerMile || "--"} accent />
          <StatCard label="Pace/KM" value={pacePerKm || "--"} />
          <StatCard label="MPH" value={mph || "--"} />
          <StatCard label="KPH" value={kph || "--"} />
        </div>
      </div>
    </ToolPageLayout>
  );
}
