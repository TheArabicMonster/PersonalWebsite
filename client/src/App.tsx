import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  // Set current year for copyright in any rendered component that might need it
  useEffect(() => {
    window.document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      window.document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollProgress />
      
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
      
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}

export default App;
