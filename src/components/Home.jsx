import Hero from './hero/Hero';
import About from './about/About';
import Services from './services/Services';
import Contact from './contact/Contact';
const Home = () => {
  return (
    <>
  <div id="hero"><Hero/></div>
      <div id="about"><About /></div>
      <div id="services"><Services/></div>
      <div id="contact"><Contact/></div>
    </>
  )
}

export default Home