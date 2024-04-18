import "./Services.scss";
import Consultation from "../../assets/Consultation.png";
import Deworming from "../../assets/Deworming.png";
import Vaccination from "../../assets/Vaccination.png";
import Aos from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";
const Services = () => {
    useEffect(()=>{
        Aos.init({duration:100})
    })


  return (
    <section className="pricing" id="pricing">
        <h2 data-aos="zoom-in-up">Services</h2>
        <div className="pricing_container wrapper">
            
                    <div className="pricing_card"  data-aos="fade-up">
                        <img src={Consultation} alt="image" />
                        <h3>CONSULTATION</h3>
                        
                        <a href="/register" className="btn">
                            BOOK NOW
                        </a>
                    </div>
                    <div className="pricing_card"  data-aos="zoom-in-up">
                    <img src={Deworming} alt="image" />
                        <h3>DEWORMING</h3>
                        
                        <a href="/register" className="btn">
                            BOOK NOW
                        </a>
                    </div>
                    <div className="pricing_card"  data-aos="fade-up">
                    <img src={Vaccination} alt="image" />
                        <h3>VACCINATION</h3>
                        
                        <a href="/register" className="btn">
                            BOOK NOW
                        </a>
                    </div>
           
        </div>
    </section>
  )
}

export default Services