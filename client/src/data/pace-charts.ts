import {
  FIVE_K_MILES, FIVE_K_KM,
  TEN_K_MILES, TEN_K_KM,
  HALF_MARATHON_MILES, HALF_MARATHON_KM,
  MARATHON_MILES, MARATHON_KM,
} from "@/utils/calculations";

export interface PaceChartConfig {
  id: string;
  title: string;
  slug: string;
  description: string;
  distanceMiles: number;
  distanceKm: number;
  minPace: number;
  maxPace: number;
  step: number;
}

export const paceChartConfigs: PaceChartConfig[] = [
  {
    id: "5k",
    title: "5K Pace Chart",
    slug: "5k-pace-chart",
    description: "Complete 5K pace chart showing finish times from fast to beginner paces. Find the pace per mile and per kilometer you need to hit your 5K goal.",
    distanceMiles: FIVE_K_MILES,
    distanceKm: FIVE_K_KM,
    minPace: 5.5,
    maxPace: 14,
    step: 0.5,
  },
  {
    id: "10k",
    title: "10K Pace Chart",
    slug: "10k-pace-chart",
    description: "Complete 10K pace chart with finish times, pace per mile, and pace per kilometer for every common 10K goal time.",
    distanceMiles: TEN_K_MILES,
    distanceKm: TEN_K_KM,
    minPace: 5.5,
    maxPace: 14,
    step: 0.5,
  },
  {
    id: "half-marathon",
    title: "Half Marathon Pace Chart",
    slug: "half-marathon-pace-chart",
    description: "Half marathon pace chart showing finish times and required paces for every common half marathon goal from sub-1:30 to 3:00+.",
    distanceMiles: HALF_MARATHON_MILES,
    distanceKm: HALF_MARATHON_KM,
    minPace: 6,
    maxPace: 14,
    step: 0.5,
  },
  {
    id: "marathon",
    title: "Marathon Pace Chart",
    slug: "marathon-pace-chart",
    description: "Marathon pace chart with finish times and paces for every common marathon goal from sub-3:00 to 6:00+.",
    distanceMiles: MARATHON_MILES,
    distanceKm: MARATHON_KM,
    minPace: 6,
    maxPace: 14,
    step: 0.5,
  },
];

export function getChartBySlug(slug: string): PaceChartConfig | undefined {
  return paceChartConfigs.find((c) => c.slug === slug);
}
