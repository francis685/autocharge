import React, { useState } from 'react';
import { Check, Loader2 } from "lucide-react";
import { Button } from "./ui/Button.jsx";
import { Card } from "./ui/Card.jsx";

// UPDATED: New prices for testing
const plans = [
  { name: "Basic", price: "1", rawPrice: 1, description: "Perfect for city drivers", features: ["Standard piezoelectric sensors", "Up to 15% charge recovery", "Basic monitoring dashboard", "Email support", "1-year warranty"] },
  { name: "Pro", price: "3", rawPrice: 3, description: "Most popular for daily commuters", featured: true, features: ["Advanced sensor technology", "Up to 25% charge recovery", "Detailed analytics & insights", "Priority support (24/7)", "3-year warranty", "Free installation"] },
  { name: "Premium", price: "10", rawPrice: 10, description: "Maximum performance & support", features: ["Premium sensor array", "Up to 35% charge recovery", "Advanced AI optimization", "Dedicated support manager", "Lifetime warranty", "Free installation & maintenance"] },
];

const Pricing = () => {
  const [loadingPlan, setLoadingPlan] = useState(null);

  // This function now handles the full payment flow
  const handlePlanClick = async (plan) => {
    setLoadingPlan(plan.name);

    try {
      // 1. Call your backend to create a Razorpay order
      const orderRes = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName: plan.name }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");

      // 2. Configure the Razorpay checkout modal
      const options = {
        key: "rzp_test_Rh6IBl8SR3XY1w", // Your Key ID
        amount: orderData.amount, // Amount from backend
        currency: orderData.currency,
        name: "AutoCharge",
        description: `Payment for ${plan.name} Plan`,
        order_id: orderData.id,
        handler: function (response) {
          // This function runs after a SUCCESSFUL payment
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          console.log(response);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0ea5e9", // Your primary blue color
        },
      };

      // 3. Open the Razorpay checkout modal
      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response) {
        alert("Payment failed: " + response.error.description);
        console.error(response.error);
      });

    } catch (err) {
      console.error(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoadingPlan(null); // Reset the spinner
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Pricing <span className="text-gradient">Plans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your charging needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-8 ${
                plan.featured
                  ? "border-2 border-primary shadow-glow scale-105"
                  : "border border-border"
              } bg-card hover:shadow-elegant transition-all duration-300`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-electric px-4 py-1 rounded-full">
                    <span className="text-sm font-bold text-background">MOST POPULAR</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-primary">₹{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* THIS IS THE PART I FIXED. The bad line is gone. */}
              <Button
                className={`w-full ${
                  plan.featured
                    ? "bg-primary hover:bg-primary/90 shadow-glow"
                    : "bg-primary/10 hover:bg-primary/20 text-primary"
                }`}
                onClick={() => handlePlanClick(plan)}
                disabled={loadingPlan === plan.name}
              >
                {loadingPlan === plan.name ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `Choose ${plan.name}`
                )}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;