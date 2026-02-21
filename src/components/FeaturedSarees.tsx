import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredSarees } from "@/data/sarees";
import SareeCard from "./SareeCard";

const FeaturedSarees = () => {
  return (
    <section className="section-py bg-silk">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="divider-gold w-16 h-0.5" />
            <span className="font-inter text-gold text-xs uppercase tracking-[0.25em] font-medium">Curated For You</span>
            <div className="divider-gold w-16 h-0.5" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-4">
            Featured Collections
          </h2>
          <p className="font-inter text-muted-foreground text-lg max-w-xl mx-auto">
            Hand-picked masterpieces by our senior curators — each saree a testament to centuries of weaving tradition
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {featuredSarees.map((saree, i) => (
            <SareeCard key={saree.id} saree={saree} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-maroon text-gold font-inter font-semibold text-sm tracking-wide rounded-full hover:bg-gold hover:text-maroon transition-all duration-300 shadow-luxury shine"
          >
            View All 100 Sarees
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSarees;
