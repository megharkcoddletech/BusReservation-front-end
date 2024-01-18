import { AiOutlineLogout } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbHome2 } from "react-icons/tb";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userDetails, userToken } from "../redux/UserCred";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AdminNavbar = () => {

    const dispatch = useDispatch()
    useSelector((state: RootState) => state.UserCred)

    const navigate = useNavigate()
    function logout() {
        localStorage.setItem('user', '')
        dispatch(userDetails([]))
        dispatch(userToken(''))
        navigate('/')
    }

    return (
        <nav>
            <div className="navHead">
                <TbHome2 onClick={(e) => navigate('/adminHome')} />
            </div>
            <div>
                <div className="leftNav">
                    <button className="booking" onClick={(e) => navigate('/adminAddBus')}>Add Bus</button>
                    <button className="booking" onClick={(e) => navigate('/AdminOffers')}>Offers</button>
                    <button className="booking" onClick={(e) => navigate('/adminBooking')}>Booking</button>
                    <div>
                    </div>
                    <RiAccountCircleLine className="userIcon" onClick={(e) => navigate('/cmp')} />
                    <AiOutlineLogout className="userIcon" onClick={logout} />
                </div>
            </div>
        </nav>
    )
}
export default AdminNavbar;