import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import { PacmanLoader } from "react-spinners";
import "aos/dist/aos.css";
import "./Services.scss";

const ServicePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      AOS.refresh();
    };

    AOS.init({ duration: 1000 });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/servicePage");
        console.log("Service data:", response.data);

        const servicesWithCompleteUrls = response.data.map((service) => ({
          ...service,
          image1: `${window.location.origin}/${service.image1}`,
          image2: `${window.location.origin}/${service.image2}`,
          image3: `${window.location.origin}/${service.image3}`,
        }));

        setServices(servicesWithCompleteUrls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="services" id="pricing">
      {/* Dynamically display the title from service data */}
      <h2 data-aos="zoom-in-up">{services.length > 0 && services[0].title1}</h2>
      <div className="services_container wrapper">
        {loading ? (
          <div className="spinner-container">
            <PacmanLoader color="#34c4a9" loading={loading} size={50} />
          </div>
        ) : (
          services.map((service) => (
            <>
              <div className="services_card" key={service.id} data-aos="fade-up">
                <img src={service.image1} alt="" />
                <h3>{service.title2}</h3>
                <a href="/register" className="btn">
                  BOOK NOW
                </a>
              </div>
              <div
                className="services_card"
                key={`${service.id}_2`}
                data-aos="fade-up"
              >
                <img src={service.image2} alt="" />
                <h3>{service.title3}</h3>
                <a href="/register" className="btn">
                  BOOK NOW
                </a>
              </div>
              <div
                className="services_card"
                key={`${service.id}_3`}
                data-aos="fade-up"
              >
                <img src={service.image3} alt="" />
                <h3>{service.title4}</h3>
                <a href="/register" className="btn">
                  BOOK NOW
                </a>
              </div>
            </>
          ))
        )}
      </div>
    </section>
  );
};

export default ServicePage;
