import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSarees from "@/components/FeaturedSarees";
import { HeritageStory, ArtisanSpotlight, CategorySection, PreviewBanner } from "@/components/HomeComponents";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedSarees />
      <CategorySection />
      <HeritageStory />
      <ArtisanSpotlight />
      <PreviewBanner />
      <Footer />
    </div>
  );
};

export default Index;
