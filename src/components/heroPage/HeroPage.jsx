import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HeroPage.scss";
const HeroPage = () => {
  const [homePageData, setHomePageData] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/homePage");
        setHomePageData(response.data[0]); // Access the first element of the array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <section className="hero">
      <div className="hero_container wrapper">
        <div className="hero_left" data-aos="fade-right">
          {homePageData && <img src={homePageData.image} alt="hero" />}
        </div>
        <div className="hero_right" data-aos="zoom-in-up">
          {homePageData ? (
            <>
              <h1>{homePageData.title}</h1>
              <h2>
                {homePageData.title2.split(/\b(Care)\b/g).map((word, index) => (
                  <span
                    key={index}
                    className={word.trim() === "Care" ? "colored" : ""}
                  >
                    {word}
                  </span>
                ))}
              </h2>
              <p>{homePageData.paragraph}</p>
              <a href="/register" className="btn">
                BOOK NOW
              </a>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
