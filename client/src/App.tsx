import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Tools from "@/pages/Tools";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import MarathonPaceCalculator from "@/pages/MarathonPaceCalculator";
import HalfMarathonPaceCalculator from "@/pages/HalfMarathonPaceCalculator";
import FiveKPaceCalculator from "@/pages/FiveKPaceCalculator";
import TenKPaceCalculator from "@/pages/TenKPaceCalculator";
import RunningPaceCalculator from "@/pages/RunningPaceCalculator";
import RaceTimePredictor from "@/pages/RaceTimePredictor";
import TrainingPaceCalculator from "@/pages/TrainingPaceCalculator";
import RunningPaceConverter from "@/pages/RunningPaceConverter";
import SplitCalculator from "@/pages/SplitCalculator";
import PaceCharts from "@/pages/PaceCharts";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tools" component={Tools} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/marathon-pace-calculator" component={MarathonPaceCalculator} />
        <Route path="/half-marathon-pace-calculator" component={HalfMarathonPaceCalculator} />
        <Route path="/5k-pace-calculator" component={FiveKPaceCalculator} />
        <Route path="/10k-pace-calculator" component={TenKPaceCalculator} />
        <Route path="/running-pace-calculator" component={RunningPaceCalculator} />
        <Route path="/race-time-predictor" component={RaceTimePredictor} />
        <Route path="/training-pace-calculator" component={TrainingPaceCalculator} />
        <Route path="/running-pace-converter" component={RunningPaceConverter} />
        <Route path="/split-calculator" component={SplitCalculator} />
        <Route path="/pace-charts" component={PaceCharts} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
