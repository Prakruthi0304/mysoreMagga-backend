import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SareeCard from "@/components/SareeCard";
import { sarees, categories } from "@/data/sarees";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = sarees.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.color.toLowerCase().includes(search.toLowerCase()) ||
        s.artisanName.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || s.category === selectedCategory;
      const matchPrice = s.price >= priceRange[0] && s.price <= priceRange[1];
      return matchSearch && matchCat && matchPrice;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") result.sort((a, b) => parseInt(b.id.slice(1)) - parseInt(a.id.slice(1)));
    return result;
  }, [search, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-silk">
      <Navbar />
      <div className="pt-20">
        {/* Header Banner */}
        <div className="bg-maroon py-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="divider-gold w-12" />
              <span className="text-gold font-inter text-xs uppercase tracking-[0.25em]">Our Collection</span>
              <div className="divider-gold w-12" />
            </div>
            <h1 className="font-playfair text-5xl font-bold text-gold mb-3">Silk Saree Collection</h1>
            <p className="font-inter text-white/70">{sarees.length} handcrafted masterpieces by Karnataka's finest artisans</p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-10">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sarees, colors, artisans..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-full font-inter text-sm bg-white shadow-card focus:outline-none focus:border-gold transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border border-border rounded-full font-inter text-sm bg-white shadow-card focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 border border-border rounded-full font-inter text-sm bg-white shadow-card hover:border-gold transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-inter text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-maroon text-gold shadow-card"
                    : "bg-white border border-border text-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price filter when open */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="bg-white rounded-2xl p-6 mb-6 shadow-card border border-border"
            >
              <h3 className="font-playfair text-lg font-semibold mb-4 text-maroon">Price Range</h3>
              <div className="flex items-center gap-6">
                <div>
                  <label className="font-inter text-xs text-muted-foreground mb-1 block">Min Price (₹)</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-32 border border-border rounded-lg px-3 py-2 text-sm font-inter focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="text-muted-foreground mt-5">—</div>
                <div>
                  <label className="font-inter text-xs text-muted-foreground mb-1 block">Max Price (₹)</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-32 border border-border rounded-lg px-3 py-2 text-sm font-inter focus:outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={() => setPriceRange([0, 100000])}
                  className="mt-5 text-xs text-gold hover:underline font-inter"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* Results count */}
          <p className="font-inter text-sm text-muted-foreground mb-6">
            Showing <span className="font-semibold text-maroon">{filtered.length}</span> sarees
            {selectedCategory !== "All" && <span> in <em>{selectedCategory}</em></span>}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {filtered.map((saree, i) => (
                <SareeCard key={saree.id} saree={saree} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="font-playfair text-4xl text-muted-foreground mb-4">🪡</div>
              <h3 className="font-playfair text-2xl text-maroon mb-2">No sarees found</h3>
              <p className="font-inter text-muted-foreground">Try adjusting your filters or search term</p>
              <button onClick={() => { setSearch(""); setSelectedCategory("All"); setPriceRange([0, 100000]); }} className="mt-6 px-6 py-3 bg-maroon text-gold rounded-full font-inter text-sm hover:bg-gold hover:text-maroon transition-all">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
