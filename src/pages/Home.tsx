import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import HeroSection from '../components/HeroSection';
import TrainWithPurpose from '../components/TrainWithPurpose';
import ScholarshipSlideshow from '../components/ScholarshipSlideshow';
import CoachesSection from '../components/CoachesSection';
import Footer from '../components/Footer';
import NavigationDots from '../components/NavigationDots';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  return (
    <div>
      <SEO title="Home - Elite Basketball Training" />
      <Navbar />
      <AnnouncementBanner />  {/* ← Add this line */}
      <section id="hero"><HeroSection /></section>
      <section id="train-purpose"><ScrollReveal><TrainWithPurpose /></ScrollReveal></section>
      <section id="scholarship"><ScrollReveal><ScholarshipSlideshow /></ScrollReveal></section>
      <section id="coaches"><ScrollReveal><CoachesSection /></ScrollReveal></section>
      <section id="footer"><Footer /></section>
      <NavigationDots />
    </div>
  );
};

export default Home;