import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./contactUs.css"
function ContactUs() {

    const handleEnter = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            temp();
        }
    };

    const [show, setShow] = useState(false);
    const [contactmsg, setcontactmsg] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const handleClose = () => {
        setShow(false)
        setcontactmsg({
            name: "",
            email: "",
            subject: "",
            message: ""
        })
    }
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        const key = e.currentTarget.name;
        const state = { ...contactmsg };
        state[key] = e.target.value;
        setcontactmsg(state);
    };

    let send = (e) => {
        e.preventDefault();
        temp();
    };

    let temp = async () => {
        let data = {
            name: contactmsg.name,
            email: contactmsg.email,
            subject: contactmsg.subject,
            message: contactmsg.message
        }
        await axios.post("/api/contactus/", data)
        handleShow()
    }

    return (
        <>
            <section id="contactUs">
                <div className="container">
                    <h2 className="text-center p-5">Contact Us</h2>
                    <div className="row">
                        <div className="col-12 col-md-6 mb-5">
                            <div className="contact p-5">
                                <i className="fa fa-envelope"></i>
                                <h2 className="text-center">Send us a Message</h2>
                                <p className="text-center text-danger ">email@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mb-5">
                            <div className="contact p-5">
                                <i className="fa fa-location-arrow"></i>
                                <h2 className="text-center">Visit our Location</h2>
                                <p className="text-center text-secondary">Pet Street 123 - Egypt</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 mb-5">
                            <div className="contact p-5">
                                <i className="fa fa-phone"></i>
                                <h2 className="text-center">Call us today</h2>
                                <p className="text-center text-danger ">(123) 456-789</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mb-5">
                            <div className="contact p-5 p-md-4 p-lg-5">
                                <i className="fa fa-heart"></i>
                                <h3 className="text-center pt-md-2 pt-lg-0">Follow us on Social Media</h3>
                                <p className="text-center iconMadia">
                                    <i className="fa fa-facebook-square fa-2x mr-2"></i>
                                    <i className="fa fa-twitter fa-2x mr-2"></i>
                                    <i className="fa fa-google-plus fa-2x mr-2"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-5">

                        <div className="col-12 col-md-6 contactForm">
                            <p className="h4">Send us a message!</p>
                            <form onSubmit={send}>
                                <label className="d-block mt-3">Name*</label>
                                <input type="text" className="pb-1" required name="name" value={contactmsg.name} onChange={handleChange} onKeyUp={handleEnter} />
                                <label className="d-block mt-3">Email Address*</label>
                                <input type="email" name="email" required value={contactmsg.email} onChange={handleChange} onKeyUp={handleEnter} />
                                <label className="d-block mt-3">Subject*</label>
                                <input type="text" className="pb-1" required name="subject" value={contactmsg.subject} onChange={handleChange} onKeyUp={handleEnter} />
                                <label className="d-block mt-3">Message*</label>
                                <textarea className="textAreaNoReaize" name="message" cols="40" rows="3" required value={contactmsg.message} onChange={handleChange} onKeyUp={handleEnter}></textarea>
                                <p className="text-center"><input type="submit" value="Send" className="btn btn-primary mt-4 px-4" /></p>
                            </form>
                        </div>
                        <div className="col-12 col-md-6">
                            <img src={"./resources/Mail-sent.png"} className="img-fluid" alt="mail" />
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your message has been sent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label style={{ fontWeight: 'bold' }}>{contactmsg?.subject}</Form.Label>
                        <p>{contactmsg?.message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Okay
                        </Button>
                        {/* <Button variant="primary" onClick={sendMessage}>
                        Send Message
                    </Button> */}
                    </Modal.Footer>
                </Modal>
            </section>

        </>
    )
}
export default ContactUs