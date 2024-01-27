import React, { useState } from "react";
import './home.css';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Bus = {
  startingPoint: string; destination: string; boardingTime: string; page: number
}


const Home = () => {

  const validUser = useSelector((state: RootState) => state.UserCred)
  const navigate = useNavigate()

  const [bookbtn, setBookBtn] = useState<boolean>(false)
  const [busData, setBusData] = useState<Bus>({
    startingPoint: "",
    destination: "",
    boardingTime: "",
    page: 1,
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusData({ ...busData, [e.target.name]: e.target.value.trim() })
  }

  const search = () => {
    if (bookbtn === false) {
      setBookBtn(true)
    } else {
      setBookBtn(false)
    }

  }

  const getBus = () => {
    navigate('/viewBus', { state: { busData } })
  }

  return (
    <div className='Home'>
      <div className="mainClass">
        <Navbar></Navbar>
        <div className="banner">
          <h1 className="bannerHeading">
            Get Your Online Ticket
            Easy and Safely
          </h1>
          <button className="booknow" onClick={search}>Book Now</button>
          {
            bookbtn ?
              (
                <div className="choose">
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
              ) : (<></>)
          }

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

    </div>
  )
};

export default Home;
