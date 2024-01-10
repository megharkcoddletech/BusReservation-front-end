import { AiOutlineLogout } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbHome2 } from "react-icons/tb";
import React from "react";
import { useNavigate } from "react-router-dom";
import{userDetails, userToken} from '../redux/UserCred';
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {

    const dispatch = useDispatch()
    useSelector((state: RootState) => state.UserCred)

    const navigate = useNavigate()
    function viewUser() {
        navigate('/viewProfile')
      }

    function logout() {
        localStorage.setItem('user', '')
        dispatch(userDetails([]))
        dispatch(userToken(''))
        navigate('/')
      }

    function BookingPage(){

        navigate('/booking')
    }


    return (
        <nav>
            <div className="navHead">
                <TbHome2 />
            </div>
            <div>
                <div className="leftNav">
                    <button className="booking" onClick={BookingPage}>Booking</button>
                    <div>
                    </div>
                    <RiAccountCircleLine className="userIcon" onClick={viewUser} />
                    <AiOutlineLogout className="userIcon" onClick={logout} />
                </div>
            </div>
        </nav>
    )

}
export default  Navbar