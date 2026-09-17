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
      <AnnouncementBanner />
      <HeroSection />
      <TrainWithPurpose />
      <ScholarshipSlideshow />
      <CoachesSection />
      <Footer />
      <NavigationDots sections={['hero', 'train-purpose', 'scholarship', 'coaches']} />
    </div>
  );
};

export default Home;