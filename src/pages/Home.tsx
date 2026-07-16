import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import HeroSection from '../components/HeroSection';
import TrainWithPurpose from '../components/TrainWithPurpose';
import ScholarshipSlideshow from '../components/ScholarshipSlideshow';
import CoachesSection from '../components/CoachesSection';
import Footer from '../components/Footer';
import NavigationDots from '../components/NavigationDots';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div>
      <SEO title="Home - Elite Basketball Training" />
      <Navbar />
      <AnnouncementBanner />  {/* ← Add this line */}
      <section id="hero"><HeroSection /></section>
      <section id="train-purpose"><TrainWithPurpose /></section>
      <section id="scholarship"><ScholarshipSlideshow /></section>
      <section id="coaches"><CoachesSection /></section>
      <section id="footer"><Footer /></section>
      <NavigationDots />
    </div>
  );
};

export default Home;