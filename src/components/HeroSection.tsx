import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star } from "lucide-react";
import heroSilk from "@/assets/hero-silk.jpg";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroSilk}
          alt="Mysore Silk Heritage"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 via-transparent to-transparent" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-40"
            style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative container mx-auto px-4 pt-24 pb-16"
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="divider-gold w-12 h-0.5" />
            <span className="text-gold font-inter text-xs uppercase tracking-[0.25em] font-medium">
              Est. Since 1800s · Karnataka Heritage
            </span>
          </motion.div>

          {/* Main heading in Kannada */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="font-playfair text-6xl md:text-8xl font-bold text-gold leading-[1.1] mb-4"
          >
            ಮೈಸೂರುಮಗ್ಗ
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-inter text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
          >
            Preserving Mysore Silk Heritage Through Direct Artisan Commerce
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex gap-8 mb-10"
          >
            {[
              { value: "500+", label: "Artisans" },
              { value: "100+", label: "Sarees" },
              { value: "25+", label: "Villages" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-playfair text-2xl font-bold text-gold">{stat.value}</div>
                <div className="font-inter text-white/60 text-xs uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-maroon font-inter font-semibold text-sm tracking-wide rounded-full hover:bg-gold-light transition-all duration-300 shadow-gold animate-gold-pulse shine"
            >
              Explore Collections
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/artisans"
              className="group inline-flex items-center gap-2 px-8 py-4 glass text-white font-inter font-medium text-sm tracking-wide rounded-full hover:bg-white/20 transition-all duration-300"
            >
              <Play size={15} className="fill-gold text-gold" />
              Meet Artisans
            </Link>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-10 right-4 md:right-10 glass rounded-2xl p-5 max-w-[200px]"
        >
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="fill-gold text-gold" />
            ))}
          </div>
          <p className="text-white text-xs font-inter leading-relaxed">
            "The finest Mysore silk platform in India. Authentic and premium."
          </p>
          <p className="text-gold text-[10px] mt-2 font-medium">— Karnataka Times</p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-gold/50 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
