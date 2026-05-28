import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Specialties from "./pages/Specialties";
import HowItWorks from "./pages/HowItWorks";
import Insights from "./pages/Insights";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import SubmitNumbers from "./pages/SubmitNumbers";
import Briefing from "./pages/Briefing";
import BriefingHistory from "./pages/BriefingHistory";
import AdminPractices from "./pages/admin/AdminPractices";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminBriefings from "./pages/admin/AdminBriefings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBenchmarks from "./pages/admin/AdminBenchmarks";

function Router() {
  return (
    <Switch>
      {/* Public marketing site */}
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/specialties" component={Specialties} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/insights" component={Insights} />
      <Route path="/insights/:slug" component={BlogPost} />
      <Route path="/resources" component={Resources} />
      <Route path="/contact" component={Contact} />

      {/* Authenticated client area */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/submit" component={SubmitNumbers} />
      <Route path="/dashboard/briefing" component={Briefing} />
      <Route path="/dashboard/briefing/:id" component={Briefing} />
      <Route path="/dashboard/history" component={BriefingHistory} />

      {/* Admin console */}
      <Route path="/admin/practices" component={AdminPractices} />
      <Route path="/admin/submissions" component={AdminSubmissions} />
      <Route path="/admin/briefings" component={AdminBriefings} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/benchmarks" component={AdminBenchmarks} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
