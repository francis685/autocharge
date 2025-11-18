import React from 'react';
import { Activity, Battery, Zap } from "lucide-react";

const steps = [
  {
    icon: Activity,
    number: "01",
    title: "Piezoelectric Sensors",
    description: "Advanced sensors embedded in your tires convert kinetic energy from vehicle movement into electrical energy.",
  },
  {
    icon: Zap,
    number: "02",
    title: "Energy Conversion",
    description: "Our proprietary system instantly converts and optimizes the captured energy, storing it directly in your vehicle's battery.",
  },
  {
    icon: Battery,
    number: "03",
    title: "Seamless Integration",
    description: "Fully integrated with your EV's existing system. No additional charging stops required - charge continuously as you drive.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How <span className="text-gradient">It Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforming every mile into charging power in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 -translate-y-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="glassmorphism rounded-2xl p-8 hover:bg-primary/5 transition-all duration-300 h-full border border-primary/20 hover:border-primary/40 hover:shadow-glow">
                {/* Step number */}
                <div className="absolute -top-6 left-8 text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-electric rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-background" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;