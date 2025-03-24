import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SocialShare from "./components/ui/SocialShare";
import { UserProvider } from "./contexts/UserContext";
import ScrollToTop from './components/ui/ScrollToTop';

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Gallery from "./pages/Gallery";
import Sponsors from "./pages/Sponsors";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
// Team pages
import CC from "./pages/teams/CC";
import WC from "./pages/teams/WC";
import Mentors from "./pages/teams/Mentors";
import Volunteers from "./pages/teams/Volunteers";
import Vibgyor from "./pages/Vibgyor";
import Xaplotes from "./pages/Xaplotes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              {/* Redirect Xaplotes and Vibgyor to Events page with filter */}
              <Route path="/xaplotes" element={<Xaplotes/>} />
              <Route path="/vibgyor" element={<Vibgyor/>} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/teams/cc" element={<CC />} />
              <Route path="/teams/wc" element={<WC />} />
              <Route path="/teams/mentors" element={<Mentors />} />
              <Route path="/teams/volunteers" element={<Volunteers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <SocialShare variant="floating" />
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
