import Hero from "./hero/Hero";
import AboutPage from "./aboutPage/AboutPage";
import Contact from "./contact/Contact";
import ServicePage from "./servicePage/ServicePage";
const Home = () => {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <AboutPage />
      <ServicePage />
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;
