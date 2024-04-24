import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.scss';
const ServicePage = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/servicePage');
                console.log('Service data:', response.data); // Log the response data

                // Prepend base URL to relative image paths
                const servicesWithCompleteUrls = response.data.map(service => ({
                    ...service,
                    image1: `${window.location.origin}/${service.image1}`,
                    image2: `${window.location.origin}/${service.image2}`,
                    image3: `${window.location.origin}/${service.image3}`,
                }));

                setServices(servicesWithCompleteUrls);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="services" id="pricing">
        <h2 data-aos="zoom-in-up">Services</h2>
        <div className="services_container wrapper">
            {services.map(service => (
                <>
                    <div className="services_card" key={service.id} data-aos="fade-up">
                        {/* Displaying Image 1 */}
                        <img src={service.image1} alt="" />
                        <h3>{service.title2}</h3>
                        
                        <a href="/register" className="btn">
                            BOOK NOW
                        </a>
                    </div>
                    <div className="services_card" key={`${service.id}_2`} data-aos="fade-up">
                        {/* Displaying Image 2 */}
                        <img src={service.image2} alt="" />
                        <h3>{service.title3}</h3>
                        
                        <a href="/register" className="btn">
                            BOOK NOW
                        </a>
                    </div>
                    <div className="services_card" key={`${service.id}_3`} data-aos="fade-up">
                        {/* Displaying Image 3 */}
                        <img src={service.image3} alt="" />
                        <h3>{service.title4}</h3>
                    
                        <a href="/register" className="btn">
                            BOOK NOW
                        </a>
                    </div>
                </>
            ))}
        </div>
    </section>
    
    
    
    );
};

export default ServicePage;
