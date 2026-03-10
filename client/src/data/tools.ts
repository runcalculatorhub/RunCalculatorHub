import { Calculator, Timer, TrendingUp, ArrowRightLeft, BarChart3, Clock, Zap, Target, LineChart, TableProperties } from "lucide-react";

export interface Tool {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  path: string;
  icon: typeof Calculator;
  featured: boolean;
  category: string;
}

export const tools: Tool[] = [
  {
    id: "marathon-pace",
    title: "Marathon Pace Calculator",
    shortTitle: "Marathon Pace",
    description: "Calculate your target marathon pace, splits, and pacing strategy for race day.",
    longDescription: "Plan your marathon with precision. Enter your target finish time and get detailed mile/km splits, pacing strategy options, and milestone times to hit your goal.",
    path: "/marathon-pace-calculator",
    icon: Timer,
    featured: true,
    category: "Race Calculators",
  },
  {
    id: "half-marathon-pace",
    title: "Half Marathon Pace Calculator",
    shortTitle: "Half Marathon Pace",
    description: "Find your ideal half marathon pace and split times for your goal finish time.",
    longDescription: "Enter your target half marathon finish time and instantly get your required pace per mile and kilometer, plus detailed split tables.",
    path: "/half-marathon-pace-calculator",
    icon: Clock,
    featured: true,
    category: "Race Calculators",
  },
  {
    id: "5k-pace",
    title: "5K Pace Calculator",
    shortTitle: "5K Pace",
    description: "Calculate your 5K pace, splits, and estimated speed from your target time.",
    longDescription: "Whether you're a beginner or experienced runner, calculate the exact pace you need to hit your 5K goal time.",
    path: "/5k-pace-calculator",
    icon: Zap,
    featured: true,
    category: "Race Calculators",
  },
  {
    id: "10k-pace",
    title: "10K Pace Calculator",
    shortTitle: "10K Pace",
    description: "Determine your 10K race pace and detailed split times.",
    longDescription: "Calculate your target 10K pace per mile and kilometer. See split tables and estimated speed for your goal finish time.",
    path: "/10k-pace-calculator",
    icon: Target,
    featured: false,
    category: "Race Calculators",
  },
  {
    id: "running-pace",
    title: "Running Pace Calculator",
    shortTitle: "Running Pace",
    description: "Calculate pace, speed, distance, or time for any run. The ultimate running calculator.",
    longDescription: "The most versatile running calculator. Enter any two values — distance and time, pace and distance, or pace and time — and calculate the rest.",
    path: "/running-pace-calculator",
    icon: Calculator,
    featured: false,
    category: "General Tools",
  },
  {
    id: "race-time-predictor",
    title: "Race Time Predictor",
    shortTitle: "Race Predictor",
    description: "Predict your finish time for any race distance based on a recent result.",
    longDescription: "Use the proven Riegel formula to predict your finish time at any distance. Enter a recent race result to see projected times for 5K, 10K, half marathon, and marathon.",
    path: "/race-time-predictor",
    icon: TrendingUp,
    featured: true,
    category: "Prediction Tools",
  },
  {
    id: "training-pace",
    title: "Training Pace Calculator",
    shortTitle: "Training Paces",
    description: "Get your easy, tempo, interval, and long run training paces.",
    longDescription: "Based on your recent race performance, calculate your optimal training paces for easy runs, tempo workouts, intervals, and long runs.",
    path: "/training-pace-calculator",
    icon: BarChart3,
    featured: true,
    category: "Training Tools",
  },
  {
    id: "pace-converter",
    title: "Running Pace Converter",
    shortTitle: "Pace Converter",
    description: "Convert between pace per mile, pace per km, mph, and kph instantly.",
    longDescription: "Quickly convert between all common running pace and speed formats. Enter any value and see the conversion across all formats in real time.",
    path: "/running-pace-converter",
    icon: ArrowRightLeft,
    featured: true,
    category: "General Tools",
  },
  {
    id: "split-calculator",
    title: "Split Calculator",
    shortTitle: "Split Calculator",
    description: "Generate detailed split tables for any race distance and finish time.",
    longDescription: "Create custom split tables for any race. Choose your split interval, enter your target time, and get a complete breakdown of your race plan.",
    path: "/split-calculator",
    icon: TableProperties,
    featured: false,
    category: "Race Calculators",
  },
  {
    id: "pace-charts",
    title: "Pace Charts",
    shortTitle: "Pace Charts",
    description: "Reference pace charts for 5K, 10K, half marathon, and marathon distances.",
    longDescription: "Browse comprehensive pace charts showing finish times, pace per mile, and pace per kilometer for all major race distances.",
    path: "/pace-charts",
    icon: LineChart,
    featured: false,
    category: "Reference",
  },
];

export const futureTools = [
  "VO2 Max Calculator",
  "Heart Rate Zone Calculator",
  "Calories Burned Running Calculator",
  "Stride Length Calculator",
  "Cadence Calculator",
  "Shoe Mileage Tracker",
];

export function getToolByPath(path: string): Tool | undefined {
  return tools.find((t) => t.path === path);
}

export function getRelatedTools(currentId: string, count: number = 4): Tool[] {
  const current = tools.find((t) => t.id === currentId);
  if (!current) return tools.slice(0, count);

  const sameCat = tools.filter((t) => t.id !== currentId && t.category === current.category);
  const others = tools.filter((t) => t.id !== currentId && t.category !== current.category);

  return [...sameCat, ...others].slice(0, count);
}
