import React from "react";
import { Link } from "react-router-dom";

const CustomerMain = () => {
    return (
        <div className="customer-main">
            <h2>Customer Management</h2>

            <div className="customer-buttons">
                <Link to="/customer-register">
                    <button className="customer-btn">Register Customer</button>
                </Link>

                <Link to="/customer-update">
                    <button className="customer-btn">Update Customer</button>
                </Link>
            </div>
        </div>
    );
};

export default CustomerMain;

