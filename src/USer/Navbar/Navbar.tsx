import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import GetApiCall from "../../GetApi/GetApiCall";
import './Navbar.css';
import '../../media/busLogo.jpg';
import { FaRegUser } from "react-icons/fa6";


type User = {
    name: string;
    email: string;
    phone: number;
    gender: string;
}

const Navbar = () => {

    const user = useSelector((state: RootState) => state.UserCred)
    const [showProfile, setShowProfile] = useState<boolean>(false)
    const [id, setId] =useState<{id:number}>({
        id:0
    })
    const [profile, setProfile] = useState<User[]>([])
   const custId = localStorage.getItem('customerId')
   const [isLogin, setIsLogin] =useState<boolean>(false)
    const navigate = useNavigate()
    function viewUser() {       

        if(custId) {
            const customerId = parseInt(custId)
            setId({id:customerId})
            localStorage.setItem('customerId', custId)
        }
        
        if (user.isLogin === true && showProfile === false) {            
            
            const user = GetApiCall(`${process.env.REACT_APP_apiURL}/userAuth/showProfile?id=${id.id}}`)
            user.then(res => {
              setProfile(res)
                setShowProfile(true)
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            setShowProfile(false)
        }
    }
    useEffect(()=>{
      const token =  localStorage.getItem('token')
      if(!token) {
      navigate('/')
      setIsLogin(false)
      } else {
        setIsLogin(true)
      }
    }, [navigate])


    function logout() {
        navigate('/')
        console.log('islogin', isLogin);
        localStorage.clear()
        setIsLogin(false)
        console.log('t',localStorage.getItem('token'));
    }

    function BookingPage() {
        navigate('/booking')
    }
    function home() {
        navigate('/')
    }
    function Login(){
        navigate('/login')
    }

    return (
        <div>
            <nav className="navMain">
                <div className="navHead">
                  <h6>Gobuss.in</h6>
                </div>
                <div>
                    <div className="leftNav">
                   <button className="navButton" onClick={home}>
                    <p className="navText" >Home</p>
                    </button>
                   <button className="navButton">
                    <p className="navText">About</p>
                    </button>
                   <button onClick={BookingPage} className="navButton">
                   <p className="navText" >View Booking</p>
                   </button>
                    {
                        isLogin?
                        (      
                            <button className="navButton" onClick={logout}>
                            <p className="navText">Logout</p>
                            </button>
                        ): (
                            
                            <button className="navButton" onClick={Login}>
                            <p className="navText">Login</p>
                            </button>
                        )
                        }


                        <div>
                        </div>
                        <FaRegUser className="userIcon" onClick={viewUser} />
                    </div>
                </div>
            </nav>
            {
                showProfile ? (
                    <div className="profile">
                        <div>
                        </div>
                        <div>
                            {
                                profile.map((item) => {
                                    return(
                                        <div key={item.email}>
                                        <p>Name : {item.name }</p> 
                                        <p>Email: {item.email }</p>
                                        <p>Phone: {item.phone}</p>
                                        <p>Gender: {item.gender }</p>
                                        </div>
                                    )

                                })
                            }
                            <p className="loginbtn">Edit</p>

                        </div>
                    </div>
                ) : (<></>)
            }
        </div>

    )

}

export default Navbar