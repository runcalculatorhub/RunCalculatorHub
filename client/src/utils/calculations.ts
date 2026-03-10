export const MARATHON_MILES = 26.2188;
export const MARATHON_KM = 42.195;
export const HALF_MARATHON_MILES = 13.1094;
export const HALF_MARATHON_KM = 21.0975;
export const FIVE_K_MILES = 3.10686;
export const FIVE_K_KM = 5;
export const TEN_K_MILES = 6.21371;
export const TEN_K_KM = 10;

export function timeToSeconds(hours: number, minutes: number, seconds: number): number {
  return hours * 3600 + minutes * 60 + seconds;
}

export function secondsToTime(totalSeconds: number): { hours: number; minutes: number; seconds: number } {
  let rounded = Math.round(totalSeconds);
  const hours = Math.floor(rounded / 3600);
  rounded %= 3600;
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return { hours, minutes, seconds };
}

export function formatTime(totalSeconds: number): string {
  const { hours, minutes, seconds } = secondsToTime(totalSeconds);
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatPace(secondsPerUnit: number): string {
  let rounded = Math.round(secondsPerUnit);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function calculatePace(totalSeconds: number, distance: number): number {
  if (distance <= 0) return 0;
  return totalSeconds / distance;
}

export function milePaceToKmPace(milesPace: number): number {
  return milesPace / 1.60934;
}

export function kmPaceToMilePace(kmPace: number): number {
  return kmPace * 1.60934;
}

export function paceToSpeed(paceSeconds: number): number {
  if (paceSeconds <= 0) return 0;
  return 3600 / paceSeconds;
}

export function speedToPace(speed: number): number {
  if (speed <= 0) return 0;
  return 3600 / speed;
}

export function milesToKm(miles: number): number {
  return miles * 1.60934;
}

export function kmToMiles(km: number): number {
  return km / 1.60934;
}

export function riegelPrediction(knownDistance: number, knownTime: number, targetDistance: number): number {
  const exponent = 1.06;
  return knownTime * Math.pow(targetDistance / knownDistance, exponent);
}

export function generateSplits(
  totalSeconds: number,
  totalDistance: number,
  splitInterval: number,
  strategy: "even" | "negative" | "conservative" = "even"
): { split: number; distance: number; splitTime: string; cumulativeTime: string }[] {
  const splits: { split: number; distance: number; splitTime: string; cumulativeTime: string }[] = [];
  const numFullSplits = Math.floor(totalDistance / splitInterval);
  const remainder = totalDistance % splitInterval;
  const basePace = totalSeconds / totalDistance;

  const rawSplitSeconds: number[] = [];
  for (let i = 0; i < numFullSplits; i++) {
    let paceMultiplier = 1;
    const progress = i / numFullSplits;
    if (strategy === "negative") {
      paceMultiplier = 1.03 - progress * 0.06;
    } else if (strategy === "conservative") {
      if (progress < 0.3) paceMultiplier = 1.02;
      else if (progress < 0.7) paceMultiplier = 1.0;
      else paceMultiplier = 0.98;
    }
    rawSplitSeconds.push(basePace * splitInterval * paceMultiplier);
  }
  if (remainder > 0.01) {
    rawSplitSeconds.push(basePace * remainder);
  }

  const rawTotal = rawSplitSeconds.reduce((a, b) => a + b, 0);
  const scaleFactor = rawTotal > 0 ? totalSeconds / rawTotal : 1;

  let cumulativeSeconds = 0;
  for (let i = 0; i < numFullSplits; i++) {
    const splitSecs = rawSplitSeconds[i] * scaleFactor;
    cumulativeSeconds += splitSecs;
    splits.push({
      split: i + 1,
      distance: splitInterval * (i + 1),
      splitTime: formatTime(splitSecs),
      cumulativeTime: formatTime(cumulativeSeconds),
    });
  }

  if (remainder > 0.01) {
    const splitSecs = rawSplitSeconds[numFullSplits] * scaleFactor;
    cumulativeSeconds += splitSecs;
    splits.push({
      split: numFullSplits + 1,
      distance: totalDistance,
      splitTime: formatTime(splitSecs),
      cumulativeTime: formatTime(cumulativeSeconds),
    });
  }

  return splits;
}

export function getTrainingPaces(raceTimeSeconds: number, raceDistanceKm: number) {
  const vdot = estimateVDOT(raceTimeSeconds, raceDistanceKm);

  const easyPacePerKm = raceTimeSeconds / raceDistanceKm * 1.25;
  const tempoPacePerKm = raceTimeSeconds / raceDistanceKm * 0.88;
  const intervalPacePerKm = raceTimeSeconds / raceDistanceKm * 0.78;
  const longRunPacePerKm = raceTimeSeconds / raceDistanceKm * 1.3;

  return {
    vdot: Math.round(vdot),
    easy: {
      min: formatPace(easyPacePerKm),
      max: formatPace(easyPacePerKm * 1.1),
      minMile: formatPace(easyPacePerKm * 1.60934),
      maxMile: formatPace(easyPacePerKm * 1.1 * 1.60934),
    },
    tempo: {
      min: formatPace(tempoPacePerKm),
      max: formatPace(tempoPacePerKm * 1.05),
      minMile: formatPace(tempoPacePerKm * 1.60934),
      maxMile: formatPace(tempoPacePerKm * 1.05 * 1.60934),
    },
    interval: {
      min: formatPace(intervalPacePerKm * 0.95),
      max: formatPace(intervalPacePerKm),
      minMile: formatPace(intervalPacePerKm * 0.95 * 1.60934),
      maxMile: formatPace(intervalPacePerKm * 1.60934),
    },
    longRun: {
      min: formatPace(longRunPacePerKm),
      max: formatPace(longRunPacePerKm * 1.08),
      minMile: formatPace(longRunPacePerKm * 1.60934),
      maxMile: formatPace(longRunPacePerKm * 1.08 * 1.60934),
    },
  };
}

function estimateVDOT(timeSeconds: number, distanceKm: number): number {
  const velocity = distanceKm / (timeSeconds / 60);
  const percentVO2 = 0.8 + 0.1894393 * Math.exp(-0.012778 * (timeSeconds / 60)) +
    0.2989558 * Math.exp(-0.1932605 * (timeSeconds / 60));
  const vo2 = -4.6 + 0.182258 * velocity * 1000 / 60 + 0.000104 * Math.pow(velocity * 1000 / 60, 2);
  return vo2 / percentVO2;
}

export function generatePaceChart(
  distanceMiles: number,
  distanceKm: number,
  minPaceMinPerMile: number,
  maxPaceMinPerMile: number,
  stepMinutes: number = 0.5
): { finishTime: string; pacePerMile: string; pacePerKm: string }[] {
  const rows: { finishTime: string; pacePerMile: string; pacePerKm: string }[] = [];

  for (let pace = minPaceMinPerMile; pace <= maxPaceMinPerMile; pace += stepMinutes) {
    const paceSeconds = pace * 60;
    const totalSeconds = paceSeconds * distanceMiles;
    const kmPace = paceSeconds / 1.60934;

    rows.push({
      finishTime: formatTime(totalSeconds),
      pacePerMile: formatPace(paceSeconds),
      pacePerKm: formatPace(kmPace),
    });
  }

  return rows;
}
