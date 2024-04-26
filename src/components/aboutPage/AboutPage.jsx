import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import './AboutPage.scss';

const AboutPage = () => {
    const [aboutPageData, setAboutPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutPageData = async () => {
            try {
                const response = await axios.get('/aboutPage');
                const aboutPageDataWithCompleteUrls = response.data.map(data => ({
                    ...data,
                    image: `${window.location.origin}/${data.image}`,
                }));
                setAboutPageData(aboutPageDataWithCompleteUrls);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching about page data:', error);
            }
        };

        fetchAboutPageData();
    }, []);

    return (
        <section className="about">
            <div className="about_container wrapper">
                <div className="about_left" data-aos="fade-right">
                    {loading ? (
                        <FadeLoader color="#34c4a9" loading={loading} />
                    ) : aboutPageData ? (
                        aboutPageData.map(data => (
                            <img key={data.id} src={data.image} alt="about" />
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <div className="about_right" data-aos="zoom-in-up">
                    {loading ? (
                        <FadeLoader color="#34c4a9" loading={loading} />
                    ) : aboutPageData ? (
                        aboutPageData.map(data => (
                            <div key={data.id}>
                                <h2>
                                    {data.title.split(/\b(Us)\b/g).map((word, index) => (
                                        <span key={index} className={word.trim() === 'Us' ? 'colored' : ''}>
                                            {word}
                                        </span>
                                    ))}
                                </h2>
                                <p>{data.paragraph1}</p>
                                <p>{data.paragraph2}</p>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
