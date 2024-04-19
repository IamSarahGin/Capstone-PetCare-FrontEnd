import "./Hero.scss";
import HeroPic from "../../assets/Hero.png"
import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";
const Hero = () => {
    useEffect(()=>{
        Aos.init({duration:1500})
    })






  return (
    <section className="hero">
        <div className="hero_container wrapper">
            <div className="hero_left" data-aos="fade-right">
                <img src={HeroPic} alt="hero" />
            </div>
            <div className="hero_right" data-aos="zoom-in-up">
                <h1>Pet <span style={{ color: "#226c97" }}>Care</span> is here for you.</h1>
                <p>
                Our aim is to be the best veterinary clinic in the City, where our expertise and equipment are situated in a peaceful environment and our pets will feel good. We strive both to provide the best care, and for visits to feel tranquil and enjoyable for our patients.
                </p>
                <a href="/register"className="btn" >BOOK NOW</a>
            </div>
        </div>
    </section>
  )
}

export default Hero