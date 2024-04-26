import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { css } from "@emotion/react"; // Step 2: Import necessary components from react-spinners
import { FadeLoader } from "react-spinners"; // Step 2: Import necessary components from react-spinners
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

  const override = css` // Step 3: Define a CSS override for the spinner
    display: block;
    margin: 0 auto;
    border-color: red; /* Change color if needed */
  `;

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
            // Step 4: Replace the loading paragraph with the FadeLoader component
            <div className="spinner">
              <FadeLoader color={"#34c4a9"} css={override} size={15} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
