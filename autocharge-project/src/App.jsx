import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Locations from './components/Locations.jsx';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

export default function App() {
  const [authModal, setAuthModal] = useState(null); // 'signin' | 'signup' | null
  
  // --- NEW CODE ---
  // We will store the logged-in user's info here
  const [user, setUser] = useState(null);

  // This will check if the user is already logged in when the page loads
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // This function will be called by the Navbar after a successful login
  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); // The token is in the user data
    setUser(userData);
    setAuthModal(null); // Close the modal
  };

  // This function will be for logging out
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };
  // --- END NEW CODE ---

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Pass all the new user info down to the Navbar */}
      <Navbar 
        user={user} 
        onLogout={handleLogout}
        authModal={authModal} 
        setAuthModal={setAuthModal}
        onLoginSuccess={handleLogin}
      />
      <main>
        <Hero setAuthModal={setAuthModal} />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <Locations />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}