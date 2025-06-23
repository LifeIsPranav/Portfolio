import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import PortfolioCards from "../components/PortfolioCards";
import ProductShowcase from "../components/ProductShowcase";
import Testimonials from "../components/Testimonials";
import VoiceEnabledChatbot from "../components/VoiceEnabledChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <ProductShowcase />
      <PortfolioCards />
      <Footer />
      <VoiceEnabledChatbot />
    </div>
  );
};

export default Index;
