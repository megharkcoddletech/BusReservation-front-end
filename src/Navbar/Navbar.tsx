import { AiOutlineLogout } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbHome2 } from "react-icons/tb";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    function viewUser() {
        navigate('/viewProfile')
      }

    function logout() {
        localStorage.setItem('user', '')
        navigate('/')
      }

    return (
        <nav>
            <div className="navHead">
                <TbHome2 />
            </div>
            <div>
                <div className="leftNav">
                    <button className="booking">Booking</button>
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