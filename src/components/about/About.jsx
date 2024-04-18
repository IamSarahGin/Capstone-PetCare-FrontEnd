import "./About.scss";
import AboutImg from "../../assets/aboutUs.png"
import Aos from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";

const Earnings = () => {


    useEffect(()=>{
        Aos.init({duration:1000});
    });
  return (
    <section className="earnings" >
        <div className="earnings_container wrapper">
        <div className="earnings_left" data-aos="fade-right">
            <img src={AboutImg} alt="earnings" />
        </div>
        <div className="earnings_right" data-aos="zoom-in-up">
            <h2>About <span style={{ color: "#226c97" }}>Us</span></h2>
            <p>We’re on a mission to strengthen the human-animal bond through better pet care, and we started with a new approach: urgent care.
            Our medical team, for whom a broad case mix provides opportunities to learn, grow and practice at the top of their license. Diverse cases keep the team engaged and deepens their passion for veterinary medicine.</p>
            
        </div>
        </div>
        
    </section>
    );
}

export default Earnings