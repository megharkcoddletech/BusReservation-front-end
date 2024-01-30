import React from "react";
import AdminNavbar from "./AdminNavbar";
import GetApiCall from "../GetApi/GetApiCall";


const AdminOffers = () => {


    const response = GetApiCall( `${process.env.REACT_APP_apiURL}/adminBus/viewOffers`)

    response.then(res => {
        const offer = res.data
        console.log(offer);
    })   
    return (
        <div>
            <AdminNavbar></AdminNavbar>
            <p>
                Offers
            </p>
        </div>
    )
}

export default AdminOffers