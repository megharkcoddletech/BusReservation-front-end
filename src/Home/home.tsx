import React, { useState } from "react";
import './home.css';
import { FiSearch } from "react-icons/fi";
import { FaSquareInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
type Bus = {
  startingPoint: string; destination: string; boardingTime: string; page: number
}

const Home = () => {

  const navigate = useNavigate()

  const [busData, setBusData] = useState<Bus>({
    startingPoint: "",
    destination: "",
    boardingTime: "",
    page: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusData({ ...busData, [e.target.name]: e.target.value.trim() })
  }
   
  const getBus = () => {
    
    navigate('/viewBus', { state: { busData } })
  }

  return (
    <div className='Home'>
      <div className="mainClass">
        <Navbar></Navbar>
        <div className="banner">
          <div className="choose">
            <h2 className="grabBus">Grab Your Bus</h2>
            <div className="viewBus">
              <div className="row">
                <input className="busInputs" type="text" value={busData.startingPoint} onChange={(e) => handleChange(e)} name="startingPoint" placeholder="From" />
              </div>
              <div className="row">
                <input className="busInputs" type="text" value={busData.destination} onChange={(e) => handleChange(e)} name="destination" placeholder="To" />
              </div>
              <div className="row">
                <input className="busInputs" type="time" value={busData.boardingTime} onChange={(e) => handleChange(e)} name="boardingTime" />
              </div>
              <div className="row">
                <button className="search"><FiSearch className="searchIcon" onClick={getBus} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="steps">
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
            redBus also offers other exclusive benefits on online bus tickets like flexible ticket reschedule options, easy & friendly cancellation policies, instant payment refund. With live bus tracking feature, you can plan your travel and never miss the bus. You can get the cheapest bus tickets by availing the best discounts for new & existing customers.
            With redDeals, you can also get exclusive & additional discounts on your online bus ticket booking. You will get 24X7 customer support on call, chat & help to resolve all your queries in English & local languages.
            redBus offers Primo bus services which are specially curated by redBus with highly-rated buses with best-in-class service. With Primo by redBus, you can be assured of safe, comfortable & on-time bus service at no additional cost. With multiple boarding & dropping points available across all major cities in India, you can select as per your convenience and enjoy a smooth travel experience.
            redBus operates in 6 countries including India, Malaysia, Singapore, Indonesia, Peru, and Colombia and has sold over 220 million bus tickets worldwide through the redBus website and app. With over 36 million satisfied customers. redBus is committed to providing a world-class online bus booking experience to its users.
          </p>
        </div>
      </div>
      <footer>
        <div className="footerMain">
          <div className="appDescription">
            <div className="appAboutHead">
              <h4>About</h4>
              <p className="appAbout">the world's largest online bus ticket booking service trusted by over 25 million happy customers globally</p>
            </div>
            <div className="appInfo">
              <h4>Info</h4>
              <div className="appInfoLink">
                <a href="/contact">Contact</a>
                <a href="t&c">T&C</a>
                <a href="privacy">Privacy & Policy</a>
              </div>
            </div>
            <div className="appInfo">
              <h4>Global Sites</h4>
              <div className="appInfoLink">
                <a href="/indiA">India</a>
                <a href="/">UAE</a>
                <a href="privacy">USA</a>
              </div>
            </div>
          </div>
          <div className="socialAccounts">
            <FaSquareInstagram className="SocialChild" />
            <CiFacebook className="SocialChild" />
            <FaTwitter className="SocialChild" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
