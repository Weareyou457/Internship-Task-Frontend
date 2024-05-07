import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import "./hello.css"

const { Option } = Select;

const ModalForm = ({ visible, onCreate, onCancel }) => {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    
    const [message, setmessage] = useState("");
    const [submitted, setSubmitted] = useState(false); // State to track if form is submitted
    const [name, setname] = useState("")
    const [quality, setquality] = useState("")
    const [pricing, setpricing] = useState("")
    const [mrp, setmrp] = useState("")

    useEffect(() => {
        // Fetch customer IDs from the API when component mounts
        fetchCustomerIds();
    }, []);

    const fetchCustomerIds = async () => {
        try {
            // Fetch customer IDs from the API
            const response = await fetch("https://internship-task-orpin.vercel.app/Admin/customer/customers");
            const data = await response.json();
            // Set the fetched customer IDs to the state
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customer IDs:', error);
        }
    };


    console.log("setId",selectedCustomerId)


    const handleClick = async () => {
        if (!name || !quality || !pricing || !mrp) {
            // Check if any field is empty
            alert("Please fill all fields");
            return;
        }

        // Disable the "Submit" button
        setSubmitted(true);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "productName": name,
            "quantity": quality,
            "pricing": pricing,
            "mrp": mrp,
            "customerId": selectedCustomerId
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://internship-task-orpin.vercel.app/Admin/purchase/purchase-orders", requestOptions);
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
            // onOk={() => footer={null}}
        >
            <div className='hdbeb'>
                <div className='alfaiz'>
                    <form >
                        <h1>Add Purchase</h1>
                        <div className="ui divider"></div>
                        <div className="ui form">

                        <div className="field">
                                <label style={{marginRight:'10px'}}>Select Customer ID:</label>
                                <Select
                                    style={{ width: '300px' }}
                                    dropdownStyle={{ minWidth: 200 }}
                                    value={selectedCustomerId}
                                    onChange={(value) => setSelectedCustomerId(value)}
                                >
                                    {customers.map(customer => (
                                        <Option key={customer._id} value={customer._id}>{customer._id}</Option>
                                    ))}
                                </Select>
                            </div>



                            <div className="field">
                                <label>Purchase Name:</label>
                                <input
                                    type="text"
                                    placeholder="Purchase Name"
                                    value={name}
                                    onChange={(e) => {
                                        setname(e.target.value)
                                    }}

                                />
                            </div>

                            <div className="field">
                                <label> Quality :</label>
                                <input
                                    type="text"
                                    placeholder="Quality "
                                    value={quality}
                                    onChange={(e) => {
                                        setquality(e.target.value)
                                    }}

                                />
                            </div>

                            <div className="field">
                                <label>Pricing :</label>
                                <input
                                    type="text"
                                    placeholder="Pricing "
                                    value={pricing}
                                    onChange={(e) => {
                                        setpricing(e.target.value)
                                    }}

                                />
                            </div>

                            <div className="field">
                                <label>MRP :</label>
                                <input
                                    type="text"
                                    placeholder="MRP"
                                    value={mrp}
                                    onChange={(e) => {
                                        setmrp(e.target.value)
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

export default ModalForm;
