import Hero from './hero/Hero';
import About from './about/About';

import Contact from './contact/Contact';
import ServicePage from './servicePage/ServicePage';
const Home = () => {
  return (
    <>
  <div id="hero"><Hero/></div>
      <div id="about"><About /></div>
      <ServicePage/>
      <div id="contact"><Contact/></div>
     
    </>
  )
}

export default Home