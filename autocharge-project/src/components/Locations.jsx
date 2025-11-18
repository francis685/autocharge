import React, { useState } from 'react';
import { Input } from './ui/Input.jsx';
import { Button } from './ui/Button.jsx';
import { Card } from './ui/Card.jsx';
import { Loader2, MapPin, Phone } from 'lucide-react';

const Locations = () => {
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false); // To show "No results"

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setIsLoading(true);
    setSearched(true);
    setResults([]);

    try {
      const res = await fetch(`http://localhost:5000/api/locations/search?city=${city}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to search");
      setResults(data);
    } catch (err) {
      console.error(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="locations" className="py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Find an <span className="text-gradient">Installation Center</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your AutoCharge kit installed by a certified professional near you.
          </p>
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch} 
          className="flex max-w-xl mx-auto gap-2 mb-12"
        >
          <Input 
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city (e.g., Mumbai, Delhi, Bangalore...)"
            className="text-lg py-6"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            size="lg" 
            className="bg-primary hover:bg-primary/90 shadow-glow font-bold"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
          </Button>
        </form>

        {/* Results */}
        <div className="max-w-3xl mx-auto space-y-4">
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {searched && !isLoading && results.length === 0 && (
            <p className="text-center text-muted-foreground text-lg">
              No installation centers found for "{city}".
            </p>
          )}

          {results.map((center) => (
            <Card 
              key={center._id} 
              className="p-6 bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all"
            >
              <h3 className="text-2xl font-bold font-display text-primary">{center.name}</h3>
              <p className="text-muted-foreground mt-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {center.address}, {center.city}
              </p>
              <p className="text-lg font-medium mt-3 flex items-center gap-2">
                <Phone className="w-4 h-4" /> {center.phone}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;