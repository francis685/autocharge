import express from 'express';
import InstallCenter from '../models/InstallCenter.js';

const router = express.Router();

// --- This function adds "dummy data" to your database ONE TIME ---
// This way, you have data to test your search feature.
const seedDatabase = async () => {
  try {
    const count = await InstallCenter.countDocuments();
    if (count > 0) {
      console.log("Install centers already exist. Skipping seed.");
      return;
    }
    
    const centers = [
      { name: "AutoCharge Mumbai (Bandra)", address: "123 Electric Ave, Bandra West", city: "Mumbai", phone: "+91 98000 11111" },
      { name: "AutoCharge Delhi (CP)", address: "456 Charge Plaza, Connaught Place", city: "Delhi", phone: "+91 98000 22222" },
      { name: "AutoCharge Bangalore (Koramangala)", address: "789 Piezo Blvd, Koramangala", city: "Bangalore", phone: "+91 98000 33333" },
      { name: "AutoCharge Mumbai (Andheri)", address: "321 Future Drive, Andheri East", city: "Mumbai", phone: "+91 98000 44444" },
    ];
    
    await InstallCenter.insertMany(centers);
    console.log("Successfully seeded install centers!");
    
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};
// Run the seed function once when the server starts
seedDatabase();


// --- FIND CENTERS BY CITY ---
// Path: GET /api/locations/search?city=Mumbai
router.get('/search', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "A city query is required." });
  }

  try {
    // Find all centers in the city (case-insensitive search)
    const centers = await InstallCenter.find({ city: new RegExp(city, 'i') });
    
    res.json(centers);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;