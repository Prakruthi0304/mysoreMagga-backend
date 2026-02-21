import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artisans } from "@/data/sarees";

const Artisans = () => (
  <div className="min-h-screen bg-silk">
    <Navbar />
    <div className="pt-20">
      <div className="bg-maroon py-14 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="divider-gold w-12" />
            <span className="text-gold font-inter text-xs uppercase tracking-[0.25em]">The Masters</span>
            <div className="divider-gold w-12" />
          </div>
          <h1 className="font-playfair text-5xl font-bold text-gold mb-3">Our Artisans</h1>
          <p className="font-inter text-white/70">The hands that keep Mysore's heritage alive</p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan, i) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 group"
            >
              <div className="relative h-64 img-zoom overflow-hidden">
                <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-playfair text-white text-2xl font-bold">{artisan.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={12} className="text-gold" />
                    <span className="text-white/80 text-xs font-inter">{artisan.village}, {artisan.district}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-inter text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">{artisan.specialization}</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-gold text-gold" />
                    <span className="font-inter text-sm font-medium">{artisan.rating}</span>
                  </div>
                </div>
                <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-4">{artisan.bio}</p>
                <div className="flex gap-2 mb-4 text-xs text-muted-foreground font-inter">
                  <span>{artisan.experience} yrs exp</span>
                  <span>·</span>
                  <span>{artisan.totalSarees}+ sarees</span>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${artisan.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-gold text-gold rounded-full text-xs font-inter hover:bg-gold hover:text-maroon transition-all">
                    <Phone size={12} /> Call
                  </a>
                  <a href={`https://wa.me/${artisan.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-maroon text-gold rounded-full text-xs font-inter hover:bg-gold hover:text-maroon transition-all">
                    <MessageCircle size={12} /> WhatsApp
                  </a>
                  <a href={`mailto:${artisan.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-border text-foreground rounded-full text-xs font-inter hover:border-gold hover:text-gold transition-all">
                    <Mail size={12} /> Email
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Artisans;
