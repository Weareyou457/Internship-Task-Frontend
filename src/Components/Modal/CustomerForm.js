import React, { useState } from 'react';
import { Modal } from 'antd';
import "./hello.css"

const CustomerForm = ({ visible, onCreate, onCancel }) => {
    
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [Mobile, setMobile] = useState("");
    const [city, setcity] = useState("");
    const [message, setmessage] = useState("");
    const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

    const handleClick = async () => {
        if (!name || !email || !Mobile || !city) {
            // Check if any field is empty
            alert("Please fill all fields");
            return;
        }

        // Disable the "Submit" button
        setSubmitted(true);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": name,
            "email": email,
            "mobileNumber": Mobile,
            "city": city
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://internship-task-orpin.vercel.app//Admin/customer/customers", requestOptions);
            const result = await response.json();
            console.log(result);
            setmessage("Customer Data Submitted");
            setSubmitted(false)
        } catch (error) {
            console.error(error);
            alert("An error occurred while submitting the form");
        }
    }

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <div className='hdbeb'>
                <div className='alfaiz'>
                    <form>
                        <h1>Add Customer</h1>
                        <div className="ui divider"></div>
                        <div className="ui form">
                            <div className="field">
                                <label>Customer Name:</label>
                                <input
                                    type="text"
                                    placeholder="Customer Name"
                                    value={name}
                                    onChange={(e) => {
                                        setname(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="field">
                                <label>Customer Email :</label>
                                <input
                                    type="text"
                                    placeholder="Customer Email"
                                    value={email}
                                    onChange={(e) => {
                                        setemail(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="field">
                                <label>Mobile Number:</label>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    value={Mobile}
                                    onChange={(e) => {
                                        setMobile(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="field">
                                <label>Customer City :</label>
                                <input
                                    type="text"
                                    placeholder="Customer City"
                                    value={city}
                                    onChange={(e) => {
                                        setcity(e.target.value)
                                    }}
                                />
                            </div>

                            <button className="sumbit" onClick={handleClick} disabled={submitted}>
                                {submitted ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default CustomerForm;
