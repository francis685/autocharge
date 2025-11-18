import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, User as UserIcon } from 'lucide-react'; // Import UserIcon
import { Button } from './ui/Button.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog.jsx';
import { Input } from './ui/Input.jsx';
import { Label } from './ui/Label.jsx';

// Navbar now receives all the user info as props
const Navbar = ({ user, onLogout, authModal, setAuthModal, onLoginSuccess }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to login');
      
      // Call the onLoginSuccess function from App.jsx
      onLoginSuccess(data); 

    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.name.value;
    const email = e.target['signup-email'].value;
    const password = e.target['signup-password'].value;
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register');
      alert(data.message);
      setAuthModal('signin');
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  // --- THIS IS THE FIX ---
  // We make sure user.user and user.user.fullName exist before trying to read them.
  // We use "optional chaining" (the '?' mark)
  const welcomeName = user?.user?.fullName ? user.user.fullName.split(' ')[0] : 'User';

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-electric rounded-lg">
                <Zap className="w-5 h-5 text-background" />
              </div>
              <div>
                <span className="text-xl font-bold font-display">
                  AUTOCHARGE
                </span>
                <p className="text-xs text-primary -mt-1 font-display">EV TECHNOLOGY</p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors font-medium">
                How It Works
              </a>
              <a href="#benefits" className="text-foreground/80 hover:text-primary transition-colors font-medium">
                Benefits
              </a>
              <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors font-medium">
                Pricing
              </a>
              <a href="#locations" className="text-foreground/80 hover:text-primary transition-colors font-medium">
                Find a Center
              </a>
            </div>

            {/* --- UPDATED LOGIN/LOGOUT BUTTONS --- */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                // If user IS logged in:
                <>
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <UserIcon className="w-4 h-4" />
                    {/* We use the new 'welcomeName' variable here */}
                    Welcome, {welcomeName}!
                  </div>
                  <Button variant="ghost" onClick={onLogout} className="font-bold">
                    Logout
                  </Button>
                </>
              ) : (
                // If user is NOT logged in:
                <>
                  <Button variant="ghost" onClick={() => setAuthModal('signin')} className="font-bold">
                    Sign In
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 shadow-glow font-bold" onClick={() => setAuthModal('signup')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-border bg-background/90 px-4">
              {/* ... (keep the mobile menu links as they are) ... */}
              <a href="#how-it-works" className="block py-2 text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#benefits" className="block py-2 text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Benefits
              </a>
              <a href="#pricing" className="block py-2 text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </a>
              <a href="#locations" className="block py-2 text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Find a Center
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <Button variant="outline" onClick={onLogout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => { setAuthModal('signin'); setMobileMenuOpen(false); }}>
                      Sign In
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={() => { setAuthModal('signup'); setMobileMenuOpen(false); }}>
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modals (No change) */}
      <Dialog open={authModal === 'signin'} onOpenChange={() => setAuthModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In to AutoCharge</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLoginSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Sign In</Button>
            <p className="text-sm text-center text-muted-foreground">
              New to AutoCharge?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => setAuthModal('signup')}
              >
                Sign up now
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={authModal === 'signup'} onOpenChange={() => setAuthModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSignupSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="your@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Create Account</Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => setAuthModal('signin')}
              >
                Sign in
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;