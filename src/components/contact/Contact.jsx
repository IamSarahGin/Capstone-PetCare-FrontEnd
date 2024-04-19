import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import  './Contact.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const ContactForm = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/contact', formData);
            alert('Email sent successfully');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (err) {
            console.error(err);
            alert('Failed to send email');
        }
    };

    return (
        <section className="contact-section">
            <Container data-aos="fade-up">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="mt-5"> {/* Add margin top */}
                            <Card.Body>
                                <h2 className="text-center mb-4">Contact <span style={{ color: "#226c97" }}>Us</span></h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formSubject">
                                        <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formMessage">
                                        <Form.Control as="textarea" rows={5} name="message" value={formData.message} onChange={handleChange} placeholder="Message" required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 btn-submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactForm;
