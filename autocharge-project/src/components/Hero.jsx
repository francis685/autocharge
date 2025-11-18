import React from 'react';
import { Button } from "./ui/Button.jsx";
import { Zap, Battery, TrendingUp } from "lucide-react";
import HeroAnimation from './HeroAnimation.jsx';

// Hero now receives setAuthModal as a prop
const Hero = ({ setAuthModal }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-cover bg-center bg-hero-car"
    >
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* 3D Grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e933_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e933_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 z-10" />

      {/* Live 3D Plexus Animation (Background) */}
      <HeroAnimation />

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="text-left space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary text-sm font-semibold font-display tracking-wide">
                Revolutionary Piezoelectric Technology
              </span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-tight">
              Charge While You 
              <span className="text-gradient"> Drive</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl font-sans">
              Experience the future of EV charging with piezoelectric sensors that convert your vehicle's kinetic energy into electrical power - seamlessly and sustainably.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-7 h-7 text-primary" />
                <div>
                  <div className="text-3xl font-display font-bold text-primary">35%</div>
                  <p className="text-sm text-muted-foreground font-sans">Charge Recovery</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-7 h-7 text-accent" />
                <div>
                  <div className="text-3xl font-display font-bold text-accent">24/7</div>
                  <p className="text-sm text-muted-foreground font-sans">Active Charging</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="w-7 h-7 text-secondary" />
                <div>
                  <div className="text-3xl font-display font-bold text-secondary">100%</div>
                  <p className="text-sm text-muted-foreground font-sans">Eco-Friendly</p>
                </div>
              </div>
            </div>

            {/* --- CTA BUTTONS (THE FIX) --- */}
            <div className="flex flex-wrap gap-4 pt-4">
              
              {/* This button now opens the Sign Up modal */}
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow font-bold font-display"
                onClick={() => setAuthModal('signup')}
              >
                Get Started
                <Zap className="ml-2 w-4 h-4" />
              </Button>
              
              {/* This button now scrolls to the "How It Works" section */}
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 hover:bg-primary/10 font-bold font-display"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* "live charging box" animation */}
          <div className="relative h-[500px] hidden lg:flex items-center justify-center animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative w-full h-full flex items-center justify-center">
              
              <div className="relative z-10 animate-float">
                <div className="w-64 h-64 bg-gradient-electric rounded-3xl rotate-45 shadow-glow flex items-center justify-center">
                  <div className="w-56 h-56 bg-background rounded-3xl -rotate-45 flex items-center justify-center">
                    <Zap className="w-32 h-32 text-primary animate-pulse-glow" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <Battery className="absolute top-0 left-1/2 w-8 h-8 text-accent -translate-x-1/2" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <Zap className="absolute bottom-0 left-1/2 w-8 h-8 text-primary -translate-x-1/2" />
              </div>

              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-8 border-2 border-accent/20 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
            
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;