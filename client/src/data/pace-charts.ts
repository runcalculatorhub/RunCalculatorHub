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
  intro: string;
  tip: string;
  distanceMiles: number;
  distanceKm: number;
  distanceLabel: string;
  minPaceMin: number;
  maxPaceMin: number;
  calculatorPath: string;
  calculatorLabel: string;
  faqs: { question: string; answer: string }[];
}

export const paceChartConfigs: PaceChartConfig[] = [
  {
    id: "5k",
    title: "5K Pace Chart",
    slug: "5k-pace-chart",
    description: "Complete 5K pace chart showing finish times from fast to beginner paces. Find the pace per mile you need to hit your 5K goal.",
    intro: "A 5K is 3.1 miles and the most popular race distance in the world. This pace chart helps runners estimate finish times and set pacing goals. Whether you are training for your first 5K or trying to set a new personal record, use this chart to plan your race strategy and training.",
    tip: "Use this chart to choose a realistic pace goal for your next 5K. If you're a beginner, start in the 10:00–12:00/mi range.",
    distanceMiles: FIVE_K_MILES,
    distanceKm: FIVE_K_KM,
    distanceLabel: "5K",
    minPaceMin: 5,
    maxPaceMin: 15,
    calculatorPath: "/5k-pace-calculator",
    calculatorLabel: "Try the 5K Pace Calculator",
    faqs: [
      {
        question: "What is a good 5K pace?",
        answer: "A good 5K pace varies by experience. Beginners often finish between 28 and 40 minutes (9:00 to 13:00 per mile). Intermediate runners target 22 to 28 minutes, and competitive runners aim for under 20 minutes. Choose a goal that challenges you but matches your current fitness.",
      },
      {
        question: "What pace do I need for a 25-minute 5K?",
        answer: "To finish a 5K in 25 minutes, you need to average about 8:03 per mile. This is a popular intermediate goal and very achievable with consistent training.",
      },
      {
        question: "How do I use a 5K pace chart?",
        answer: "Find your target pace per mile in the left column and look across to see the projected finish time. Or find a finish time you want to hit and see what per-mile pace is required. This helps you set training paces and race-day strategy.",
      },
      {
        question: "Should I run even splits in a 5K?",
        answer: "For the 5K, even splits or a slight negative split (running the second half slightly faster) generally produce the best results. Starting too aggressively often leads to slowing down significantly in the final kilometer. Aim to run the first mile at or just below goal pace.",
      },
    ],
  },
  {
    id: "10k",
    title: "10K Pace Chart",
    slug: "10k-pace-chart",
    description: "Complete 10K pace chart with finish times and pace per mile for every common 10K goal time.",
    intro: "A 10K is 6.2 miles and a great next step after the 5K. This pace chart helps runners estimate finish times and set pacing goals. Whether you are training for your first 10K or trying to break a specific time barrier, use this chart to plan your race strategy and training.",
    tip: "Use this chart to choose a realistic pace goal for your next 10K.",
    distanceMiles: TEN_K_MILES,
    distanceKm: TEN_K_KM,
    distanceLabel: "10K",
    minPaceMin: 5,
    maxPaceMin: 15,
    calculatorPath: "/10k-pace-calculator",
    calculatorLabel: "Try the 10K Pace Calculator",
    faqs: [
      {
        question: "What is a good 10K pace?",
        answer: "A good 10K pace varies by experience. Beginners often finish between 55 and 70 minutes (9:00 to 11:00 per mile). Intermediate runners target 45 to 55 minutes, and advanced runners aim for under 40 minutes. Choose a goal that pushes you but stays within your fitness level.",
      },
      {
        question: "What pace do I need for a 1-hour 10K?",
        answer: "To finish a 10K in exactly 1 hour, you need to run about 9:41 per mile. That is a comfortable pace for many runners and a popular goal for those moving up from the 5K distance.",
      },
      {
        question: "How do I use a 10K pace chart?",
        answer: "Find your target pace per mile in the left column and look across to see the projected finish time. Or find a finish time you want to hit and see what per-mile pace is required. This helps you set training paces and race-day strategy.",
      },
      {
        question: "Should I run even splits in a 10K?",
        answer: "Even splits or slight negative splits (running the second half slightly faster) are the most efficient way to race a 10K. Starting too fast often leads to slowing down in the final miles. Aim to run the first mile at or slightly slower than your goal pace, then gradually build into it.",
      },
    ],
  },
  {
    id: "half-marathon",
    title: "Half Marathon Pace Chart",
    slug: "half-marathon-pace-chart",
    description: "Half marathon pace chart showing finish times and required paces for every common half marathon goal from sub-1:30 to 3:00+.",
    intro: "A half marathon is 13.1 miles and one of the most popular race distances. This pace chart helps you see what pace per mile you need to hit your target finish time. Use it to plan your training and develop a realistic race-day strategy.",
    tip: "For your first half marathon, target a pace you can hold comfortably for 2+ hours. Start conservative — you can always speed up in the second half.",
    distanceMiles: HALF_MARATHON_MILES,
    distanceKm: HALF_MARATHON_KM,
    distanceLabel: "Half Marathon",
    minPaceMin: 6,
    maxPaceMin: 15,
    calculatorPath: "/half-marathon-pace-calculator",
    calculatorLabel: "Try the Half Marathon Pace Calculator",
    faqs: [
      {
        question: "What is a good half marathon pace?",
        answer: "A good half marathon pace depends on your experience. Beginners typically finish in 2:00 to 2:30 (9:09 to 11:27 per mile). Intermediate runners target 1:40 to 2:00, and competitive runners aim for under 1:30. Set a goal that matches your current training.",
      },
      {
        question: "What pace do I need for a 2-hour half marathon?",
        answer: "To finish a half marathon in 2 hours, you need to average about 9:09 per mile. This is a very popular goal and achievable with consistent training over several months.",
      },
      {
        question: "How should I pace a half marathon?",
        answer: "Start at or slightly slower than your target pace for the first 2-3 miles, then settle into goal pace for the middle miles. If you feel strong after mile 10, you can push the final 5K. Avoid starting too fast — it's the most common pacing mistake.",
      },
      {
        question: "Can I predict my half marathon time from a 10K?",
        answer: "Yes. A common method is to double your 10K time and add 10-15 minutes. For a more precise prediction, use the Riegel formula or our Race Time Predictor tool.",
      },
    ],
  },
  {
    id: "marathon",
    title: "Marathon Pace Chart",
    slug: "marathon-pace-chart",
    description: "Marathon pace chart with finish times and paces for every common marathon goal from sub-3:00 to 6:00+.",
    intro: "A marathon is 26.2 miles and the ultimate distance running challenge. This pace chart shows the per-mile pace required for every common marathon finish time. Use it to set a realistic goal, plan your training, and develop your race-day pacing strategy.",
    tip: "Marathon pacing is critical. Going out too fast by even 10 seconds per mile can cost you minutes at the end. Pick a goal pace you've practiced in long runs.",
    distanceMiles: MARATHON_MILES,
    distanceKm: MARATHON_KM,
    distanceLabel: "Marathon",
    minPaceMin: 6,
    maxPaceMin: 15,
    calculatorPath: "/marathon-pace-calculator",
    calculatorLabel: "Try the Marathon Pace Calculator",
    faqs: [
      {
        question: "What is a good marathon pace?",
        answer: "A good marathon pace depends heavily on experience and training. First-time marathoners typically finish in 4:00 to 5:00 (9:09 to 11:27 per mile). Experienced runners target 3:00 to 4:00, and elite runners finish under 2:30.",
      },
      {
        question: "What pace do I need for a 4-hour marathon?",
        answer: "To finish a marathon in 4 hours, you need to average about 9:09 per mile. This is one of the most common marathon goals and a great target for runners with a solid training base.",
      },
      {
        question: "What pace for a Boston Marathon qualifying time?",
        answer: "Boston qualifying times vary by age and gender. For the most common group (males 18-34), the qualifying time is 3:00, requiring about a 6:52/mi pace. For males 35-39, it's 3:05 (7:03/mi). Check the BAA website for your specific age group.",
      },
      {
        question: "How should I pace my marathon?",
        answer: "Even pacing or a slight negative split produces the best marathon results. Run the first few miles 5-10 seconds per mile slower than goal pace, settle into goal pace through the middle, and push the final 10K if you feel strong. Starting too fast is the most common marathon mistake.",
      },
    ],
  },
];

export function getChartBySlug(slug: string): PaceChartConfig | undefined {
  return paceChartConfigs.find((c) => c.slug === slug);
}
