import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import "./hello.css"
const { Option } = Select;
const ShippingForm = ({ visible, onCreate, onCancel }) => {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");



    const [purchase, setpurchase] = useState([]);
    const [selectedPurchaseId, setSelectedPurchaseId] = useState("");


    const [message, setmessage] = useState("");
    const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

    const [add, setadd] = useState("")
    const [city, setcity] = useState("")
    const [pincode, setpincode] = useState("")

    const handleClick = async (e) => {
        const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "address": add,
  "city":city,
  "pincode": pincode,
  "purchaseOrderId": selectedPurchaseId,
  "customerId": selectedCustomerId
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
try {
    const response = await fetch("https://internship-task-orpin.vercel.app/Admin/shipping/shipping-details", requestOptions);
    const result = await response.json();
    console.log(result);
    setmessage("Customer Data Submitted");
    setSubmitted(false)
} catch (error) {
    console.error(error);
    alert("An error occurred while submitting the form");
}
    }

    useEffect(() => {
        // Fetch customer IDs from the API when component mounts
        fetchCustomerIds();
        fetchPurchaseIds();
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

    const fetchPurchaseIds = async () => {
        try {
            // Fetch customer IDs from the API
            const response = await fetch("https://internship-task-orpin.vercel.app/Admin/purchase/purchase-orders");
            const data = await response.json();
            // Set the fetched customer IDs to the state
            setpurchase(data);
        } catch (error) {
            console.error('Error fetching customer IDs:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            footer={null}
        // onOk={() => footer={null}}
        >
            <div className='hdbeb'>
                <div className='alfaiz'>
                    <form >
                        <h1>Add Shipping</h1>
                        <div className="ui divider"></div>
                        <div className="ui form">

                            <div className="field">
                                <label style={{ marginRight: '10px' }}>Select Customer ID:</label>
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
                                <label style={{ marginRight: '10px' }}>Select Purchase ID:</label>
                                <Select
                                    style={{ width: '300px' }}
                                    dropdownStyle={{ minWidth: 200 }}
                                    value={selectedPurchaseId}
                                    onChange={(value) => setSelectedPurchaseId(value)}
                                >
                                    {purchase.map(customer => (
                                        <Option key={customer._id} value={customer._id}>{customer._id}</Option>
                                    ))}
                                </Select>
                            </div>

                            <div className="field">
                                <label>Address :</label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={add}
                                    onChange={(e) => {
                                        setadd(e.target.value)
                                    }}

                                />
                            </div>

                            <div className="field">
                                <label> City :</label>
                                <input
                                    type="text"
                                    placeholder="City "
                                    value={city}
                                    onChange={(e) => {
                                        setcity(e.target.value)
                                    }}

                                />
                            </div>

                            <div className="field">
                                <label>Pincode :</label>
                                <input
                                    type="text"
                                    placeholder="Pincode "
                                    value={pincode}
                                    onChange={(e) => {
                                        setpincode(e.target.value)
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

export default ShippingForm;
