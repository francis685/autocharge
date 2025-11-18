import React from 'react';
import { Leaf, Wallet, Wrench, TrendingUp } from "lucide-react";
import { Card } from "./ui/Card.jsx";

const benefits = [
  {
    icon: TrendingUp,
    title: "Continuous Charging",
    description: "Never stop to charge again. Our system generates power while you drive, extending your range indefinitely.",
    stat: "35% Range Boost",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Harness wasted kinetic energy for a greener solution. Reduce your carbon footprint with every mile.",
    stat: "100% Clean Energy",
  },
  {
    icon: Wallet,
    title: "Cost Effective",
    description: "Dramatically reduce electricity costs by generating your own power. Save up to $200 per month on charging.",
    stat: "$2,400/year Savings",
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    description: "Quick 2-hour installation process with minimal vehicle modification. Compatible with all major EV brands.",
    stat: "2-Hour Setup",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-card relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Key <span className="text-gradient">Benefits</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the advantages of next-generation EV charging technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group p-6 bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-2"
            >
              <div className="space-y-4">
                {/* Icon with gradient background */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-electric rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-14 h-14 bg-gradient-electric rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-background" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Stat badge */}
                <div className="pt-2">
                  <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-primary text-sm font-semibold">{benefit.stat}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;