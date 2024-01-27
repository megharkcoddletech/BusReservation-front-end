import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";


const FirstHome = () => {

    const navigate = useNavigate()
    const login = () => {
        navigate('/login')
    }

    return (
        <div className='Home'>
            <div className="mainClass">
                <nav className="navMain">
                    <div className="navHead">
                        <h6>Gobuss.in</h6>
                    </div>
                    <div>
                        <div className="leftNav">
                            <button className="navButton" onClick={login}>
                                <p className="navText">Login/sign up</p>
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="banner">
                    <h1 className="bannerHeading">
                        Get Your Online Ticket
                        Easy and Safely
                    </h1>

                </div>
                <div className="subMain">
                    <div className="features">
                        <div className="card">
                            <div className="cardImg cardImage1">
                            </div>
                            <h3 className="cardtopic">service</h3>
                            <p className="featureAbout">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi optio, explicabo modi veniam velit temporibus quia. Harum libero nemo architecto corporis cum perspiciatis non nesciunt ullam officiis quia, eligendi alias?</p>
                        </div>
                        <div className="card">
                            <div className="cardImg cardImage2">
                            </div>
                            <h3 className="cardtopic">Travel insurance</h3>
                            <p className="featureAbout">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi optio, explicabo modi veniam velit temporibus quia. Harum libero nemo architecto corporis cum perspiciatis non nesciunt ullam officiis quia, eligendi alias?</p>
                        </div>
                        <div className="card">
                            <div className="cardImg cardImage3">
                            </div>
                            <h3 className="cardtopic">24X7 customer support </h3>
                            <p className="featureAbout">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi optio, explicabo modi veniam velit temporibus quia. Harum libero nemo architecto corporis cum perspiciatis non nesciunt ullam officiis quia, eligendi alias?</p>
                        </div>
                    </div>
                    <div className="stepsMain">
                        <div className="steps">
                        </div>
                        <div className="specialities">
                            <div className="deals">

                            </div>
                            <div className="details">
                                <div className="experience">

                                </div>
                                <div className="tracking">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about">
                        <h3>
                            BOOK BUS TICKETS ONLINE
                        </h3>
                        <p className="aboutInfo">
                            Our Application is India's largest brand for online bus ticket booking and offers an easy-to-use online bus ticket and train ticket booking service, With over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking, redBus makes road journeys super convenient for travelers. A leading platform for booking bus tickets, redBus has been the leader in online bus booking over the past 17 years across thousands of cities and lakhs of routes in India.
                            Booking a bus ticket online on redBus app or website is very simple. You can download the redBus app or visit redbus.in and enter your source, destination & travel date to check the top-rated bus services available. You can then compare prices, ratings & amenities, select your preferred seat, boarding & dropping points and make the payment using multiple payment options like UPI, debit or credit card, net banking and more. With redBus you can be assured of safe & secure payment methods and guaranteed travel with the best seat and bus operator of your choice. Once the payment is confirmed, all you have to do is pack your bags and get ready to travel with the m-ticket which you can show to the bus operator on your mobile before boarding the bus. Online bus ticket booking with redBus is that simple!
                        </p>
                        <p className="aboutInfo">

                        </p>
                    </div>

                </div>
            </div>
            <div>
            </div>
            <Footer></Footer>
        </div>
    )
};

export default FirstHome;
