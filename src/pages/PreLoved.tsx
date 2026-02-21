import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Tag, FileText, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PreLoved = () => {
  const [form, setForm] = useState({ name: "", price: "", description: "", condition: "Good" });
  const [submitted, setSubmitted] = useState(false);

  const listings = [
    { id: 1, name: "Vintage Crimson Mysore Silk - 1985", price: 4500, condition: "Excellent", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop", seller: "Meena R.", location: "Mysore" },
    { id: 2, name: "Heritage Green Zari Saree", price: 6800, condition: "Good", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop", seller: "Priya S.", location: "Bangalore" },
    { id: 3, name: "Antique Gold Border Silk", price: 8200, condition: "Very Good", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=500&fit=crop", seller: "Kamala D.", location: "Mandya" },
    { id: 4, name: "Royal Blue Temple Silk 1990s", price: 5500, condition: "Good", image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=400&h=500&fit=crop", seller: "Savitha M.", location: "Hassan" },
    { id: 5, name: "Ivory Bridal Silk - Once Worn", price: 18000, condition: "Like New", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop", seller: "Radha K.", location: "Mysore" },
    { id: 6, name: "Peacock Green Heritage Silk", price: 7200, condition: "Very Good", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=500&fit=crop", seller: "Usha N.", location: "Tumkur" },
  ];

  return (
    <div className="min-h-screen bg-silk">
      <Navbar />
      <div className="pt-20">
        <div className="bg-maroon py-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="divider-gold w-12" />
              <span className="text-gold font-inter text-xs uppercase tracking-[0.25em]">Sustainable Commerce</span>
              <div className="divider-gold w-12" />
            </div>
            <h1 className="font-playfair text-5xl font-bold text-gold mb-3">Pre-Loved Silk Marketplace</h1>
            <p className="font-inter text-white/70">Give vintage silk sarees a second life</p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Listings */}
          <div className="flex items-center gap-4 mb-8">
            <div className="divider-gold w-10" />
            <h2 className="font-playfair text-3xl font-bold text-maroon">Available Listings</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-16">
            {listings.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden img-zoom">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop"; }} />
                </div>
                <div className="p-4">
                  <span className="text-xs font-inter text-gold bg-gold/10 px-2 py-0.5 rounded-full">{item.condition}</span>
                  <h3 className="font-playfair text-maroon font-semibold mt-2 text-sm leading-tight">{item.name}</h3>
                  <p className="font-inter text-xs text-muted-foreground mt-1">{item.seller} · {item.location}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-playfair text-maroon font-bold text-lg">₹{item.price.toLocaleString("en-IN")}</span>
                    <button className="px-3 py-1.5 bg-maroon text-gold text-xs font-inter rounded-full hover:bg-gold hover:text-maroon transition-all">Enquire</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sell Form */}
          <div id="sell" className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="divider-gold w-10" />
              <h2 className="font-playfair text-3xl font-bold text-maroon">List Your Saree</h2>
            </div>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-12 shadow-luxury text-center">
                <CheckCircle size={56} className="text-gold mx-auto mb-4" />
                <h3 className="font-playfair text-2xl text-maroon font-bold mb-2">Listing Submitted!</h3>
                <p className="font-inter text-muted-foreground">Our team will review and approve your saree within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-3 bg-maroon text-gold rounded-full font-inter text-sm hover:bg-gold hover:text-maroon transition-all">List Another</button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-luxury">
                <div className="space-y-5">
                  <div>
                    <label className="font-inter text-sm font-medium text-foreground mb-1.5 block">Saree Name / Description</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Vintage Maroon Mysore Silk 1990s" className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-inter text-sm font-medium text-foreground mb-1.5 block">Asking Price (₹)</label>
                      <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="5000" className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="font-inter text-sm font-medium text-foreground mb-1.5 block">Condition</label>
                      <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })} className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold bg-white">
                        {["Like New", "Excellent", "Very Good", "Good"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-inter text-sm font-medium text-foreground mb-1.5 block">Additional Details</label>
                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Age, occasion worn, any repairs..." className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold resize-none" />
                  </div>
                  <div className="border-2 border-dashed border-gold/40 rounded-xl p-8 text-center hover:border-gold transition-colors cursor-pointer">
                    <Upload size={24} className="text-gold mx-auto mb-2" />
                    <p className="font-inter text-sm text-muted-foreground">Upload saree photos</p>
                    <p className="font-inter text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB each</p>
                  </div>
                  <button onClick={() => { if (form.name && form.price) setSubmitted(true); }} className="w-full py-4 bg-maroon text-gold font-inter font-semibold rounded-full hover:bg-gold hover:text-maroon transition-all duration-300 shine">
                    Submit for Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreLoved;
