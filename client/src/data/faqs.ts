export interface FAQ {
  question: string;
  answer: string;
}

export const marathonFaqs: FAQ[] = [
  {
    question: "How do I calculate my marathon pace?",
    answer: "Divide your target finish time by 26.2 miles (or 42.195 km) to get your required pace per mile or kilometer. For example, a 4-hour marathon requires approximately a 9:09/mile pace.",
  },
  {
    question: "What is a good marathon pacing strategy?",
    answer: "Most coaches recommend even pacing or a slight negative split (running the second half slightly faster). Starting too fast is the most common mistake in marathon racing. A conservative start with a strong finish typically produces the best results.",
  },
  {
    question: "What pace do I need for a 4-hour marathon?",
    answer: "To finish a marathon in 4 hours, you need to maintain approximately a 9:09 per mile pace (5:41 per km). This means hitting each 5K split in about 28:26.",
  },
  {
    question: "What pace do I need for a 3:30 marathon?",
    answer: "A 3:30 marathon requires an average pace of about 8:01 per mile (4:58 per km). This is a common Boston Marathon qualifying time for many age groups.",
  },
  {
    question: "Should I run the same pace for the whole marathon?",
    answer: "Even pacing is generally the most efficient strategy. However, accounting for early race excitement and late-race fatigue, starting 5-10 seconds slower per mile than your target pace can help you finish strong.",
  },
];

export const halfMarathonFaqs: FAQ[] = [
  {
    question: "What is a good half marathon time for beginners?",
    answer: "For beginners, finishing between 2:00 and 2:30 is common. A 2-hour half marathon requires about a 9:09/mile pace. Focus on finishing comfortably before worrying about time goals.",
  },
  {
    question: "How do I calculate my half marathon pace?",
    answer: "Divide your target finish time by 13.1 miles (or 21.1 km). For example, a 1:45 half marathon requires approximately an 8:01/mile pace.",
  },
  {
    question: "What pace for a sub-2-hour half marathon?",
    answer: "You need to average under 9:09 per mile (5:41 per km) to break 2 hours in the half marathon. Building in a small buffer, aim for about 9:05/mile.",
  },
  {
    question: "Can I predict my half marathon time from my 10K time?",
    answer: "Yes. A common method is to double your 10K time and add 10-15 minutes. For a more accurate prediction, use the Riegel formula available in our Race Time Predictor tool.",
  },
];

export const fiveKFaqs: FAQ[] = [
  {
    question: "What is a good beginner 5K pace?",
    answer: "Most beginners finish their first 5K between 28 and 40 minutes. A 30-minute 5K requires a pace of about 9:39 per mile. Focus on completing the distance first, then work on improving your time.",
  },
  {
    question: "How do I run a faster 5K?",
    answer: "Include interval training (like 400m repeats), tempo runs, and consistent weekly mileage. Most runners see significant improvement by training 3-4 times per week with a mix of easy runs and speed work.",
  },
  {
    question: "What pace is a 25-minute 5K?",
    answer: "A 25-minute 5K requires a pace of approximately 8:03 per mile (5:00 per km). This is considered a solid intermediate running time.",
  },
  {
    question: "How do I calculate my 5K pace?",
    answer: "Divide your target finish time (in minutes) by 3.1 miles to get your required pace per mile. For pace per kilometer, divide by 5.",
  },
];

export const tenKFaqs: FAQ[] = [
  {
    question: "What is a good 10K time?",
    answer: "Average 10K times vary widely. For recreational runners, 50-70 minutes is common. Competitive runners often aim for under 45 minutes, while elite runners finish under 30 minutes.",
  },
  {
    question: "How does 10K pace compare to 5K pace?",
    answer: "Your 10K pace is typically 15-20 seconds per mile slower than your 5K pace. As distance increases, your sustainable pace naturally decreases slightly.",
  },
  {
    question: "How do I calculate 10K pace?",
    answer: "Divide your target finish time by 6.2 miles (or 10 km). A 50-minute 10K requires approximately an 8:04/mile pace (5:00/km).",
  },
];

export const runningPaceFaqs: FAQ[] = [
  {
    question: "How do I calculate running pace?",
    answer: "Running pace is calculated by dividing your total time by the distance covered. For example, if you ran 5 miles in 40 minutes, your pace is 8:00 per mile.",
  },
  {
    question: "What is the difference between pace and speed?",
    answer: "Pace is time per distance (e.g., 8:00 per mile), while speed is distance per time (e.g., 7.5 mph). They are inversely related — as one goes up, the other goes down.",
  },
  {
    question: "What is a good running pace?",
    answer: "A 'good' pace depends on your fitness level, experience, and goals. For easy runs, most runners are comfortable at 9:00-12:00 per mile. Competitive 5K runners often race at 6:00-8:00 per mile.",
  },
  {
    question: "How do I improve my running pace?",
    answer: "Consistency is key. Run regularly, include one speed workout per week (intervals or tempo runs), build mileage gradually, and don't forget rest days. Most runners see steady improvement over 3-6 months of consistent training.",
  },
];

export const raceTimePredictorFaqs: FAQ[] = [
  {
    question: "How accurate is a race time predictor?",
    answer: "Race time predictions based on the Riegel formula are generally within 2-5% for well-trained runners at similar distances. Accuracy decreases when predicting much longer distances or if your training doesn't match the target distance.",
  },
  {
    question: "What is the Riegel formula?",
    answer: "The Riegel formula (T2 = T1 × (D2/D1)^1.06) is a widely used running prediction formula created by Peter Riegel. It accounts for the natural slowdown that occurs as race distance increases.",
  },
  {
    question: "Can I predict my marathon time from a 5K?",
    answer: "Yes, but predictions from shorter races tend to be optimistic for the marathon. A 5K tests different energy systems than a marathon. For best accuracy, use a 10K or half marathon result as your input.",
  },
];

export const trainingPaceFaqs: FAQ[] = [
  {
    question: "What is easy pace?",
    answer: "Easy pace is a comfortable, conversational pace used for most of your weekly mileage. It builds aerobic fitness without excessive fatigue. You should be able to hold a conversation at this pace.",
  },
  {
    question: "What is tempo pace?",
    answer: "Tempo pace (also called threshold pace) is 'comfortably hard' — sustainable for about 20-40 minutes. It trains your body to clear lactate more efficiently and improves your endurance at faster speeds.",
  },
  {
    question: "How much of my training should be easy running?",
    answer: "Most coaches recommend 80% of your weekly mileage at easy pace and only 20% at moderate to hard intensities. This 80/20 approach reduces injury risk while still building fitness.",
  },
  {
    question: "What are interval paces?",
    answer: "Interval pace is used for shorter, intense repeats (400m-1600m) with recovery jogs between. It's typically close to your 5K race pace or slightly faster. Interval training builds VO2max and running economy.",
  },
];

export const paceConverterFaqs: FAQ[] = [
  {
    question: "How do I convert pace per mile to pace per km?",
    answer: "Divide your pace per mile by 1.60934. For example, an 8:00/mile pace equals approximately 4:58/km.",
  },
  {
    question: "How do I convert mph to pace per mile?",
    answer: "Divide 60 by your speed in mph. For example, 7.5 mph = 60/7.5 = 8:00 per mile.",
  },
  {
    question: "What speed is a 10-minute mile?",
    answer: "A 10-minute mile pace equals 6.0 mph (9.66 kph). In kilometers, this is approximately a 6:13/km pace.",
  },
];

export const splitCalculatorFaqs: FAQ[] = [
  {
    question: "What are race splits?",
    answer: "Splits are the times recorded at regular intervals during a race. Mile splits, kilometer splits, and 5K splits are the most common. They help you monitor your pacing during a race.",
  },
  {
    question: "What is a negative split?",
    answer: "A negative split means running the second half of a race faster than the first half. Many elite marathoners use this strategy, and it often leads to better overall performance.",
  },
  {
    question: "How do I use a split calculator?",
    answer: "Enter your target finish time and race distance. The calculator will generate a table showing what time you should reach at each split point to stay on pace for your goal.",
  },
];

export const generalFaqs: FAQ[] = [
  {
    question: "How do I calculate running pace?",
    answer: "Running pace is calculated by dividing your total time by the distance covered. Use our Running Pace Calculator to quickly find your pace per mile or per kilometer for any distance.",
  },
  {
    question: "What pace do I need for a 4-hour marathon?",
    answer: "To finish a marathon in 4 hours, you need an average pace of about 9:09 per mile (5:41 per km). Use our Marathon Pace Calculator for detailed splits and pacing strategies.",
  },
  {
    question: "What is a good beginner 5K pace?",
    answer: "Most beginners can expect to run a 5K in 28 to 40 minutes. A pace of 9:00 to 12:00 per mile is very common for new runners. The most important thing is finishing — speed comes with practice.",
  },
  {
    question: "How accurate is a race predictor?",
    answer: "Race time predictions using formulas like the Riegel formula are typically accurate within 2-5% for trained runners. They work best when your input race distance is similar to the target distance.",
  },
  {
    question: "What is the difference between pace and speed?",
    answer: "Pace is measured in time per distance (minutes per mile or km), while speed is measured in distance per time (miles per hour or kph). They are inversely related — a faster speed means a lower (quicker) pace.",
  },
  {
    question: "How should I pace my first race?",
    answer: "Start conservatively! A common mistake is going out too fast. Run the first mile about 10-15 seconds slower than your target pace, settle into goal pace for the middle, and push the last portion if you feel good.",
  },
  {
    question: "Can I use these tools on mobile?",
    answer: "Yes! All Run Calculator Hub tools are designed to be fully responsive and easy to use on any device — phone, tablet, or desktop.",
  },
  {
    question: "Are these calculators free to use?",
    answer: "Yes, all Run Calculator Hub tools and calculators are completely free. We built them to be fast, simple, and helpful for runners of all levels.",
  },
];
