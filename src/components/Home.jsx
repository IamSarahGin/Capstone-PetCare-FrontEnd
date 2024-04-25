
import HeroPage from "./heroPage/HeroPage";
import AboutPage from "./aboutPage/AboutPage";
import Contact from "./contact/Contact";
import ServicePage from "./servicePage/ServicePage";
import ContactPage from "./contactPage/ContactPage"
const Home = () => {
  return (
    <>
      <HeroPage/>
      <AboutPage />
      <ServicePage />
    
      <ContactPage/>
    </>
  );
};

export default Home;
