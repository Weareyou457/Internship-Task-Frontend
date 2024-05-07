import { Space, Table, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import ShippingForm from "../../Components/Modal/ShippingForm";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://internship-task-orpin.vercel.app/Admin/shipping/shipping-details", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setDataSource(result);
        setFilteredDataSource(result); // Initialize filtered data with all data
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filteredData = dataSource.filter((item) =>
      item.city.toLowerCase().includes(value)
    );
    setFilteredDataSource(filteredData);
  };

  const [visible, setVisible] = useState(false);
  const onCreate = async (values) => {
    console.log('Received values:', values);
    setVisible(false);
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    };
  
    try {
      const response = await fetch("https://internship-task-orpin.vercel.app/Admin/shipping/shipping-details", requestOptions);
      const result = await response.json();
      console.log(result);
  
      // Update dataSource with the new data if necessary
      setDataSource([...dataSource, result]);
      setFilteredDataSource([...dataSource, result]); // Update filteredDataSource too
  
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Space size={20} direction="vertical">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div><Typography.Title level={4}>Shipping</Typography.Title></div>
        <div style={{ border: "10", padding: "10px", background: "#1677ff", color: "white", marginTop: "15px" }} onClick={() => setVisible(true)}>Add Shipping</div>
        <Input.Search
          placeholder="Search by city"
          onChange={handleSearch}
          style={{ width: 200, marginTop: 15 }}
        />
      </div>

      <ShippingForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />

      <Table
        loading={loading}
        columns={[
          {
            title: "Customer Id",
            dataIndex: "customerId",
          },
          {
            title: "Purchase Id",
            dataIndex: "purchaseOrderId",
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "City",
            dataIndex: "city",
          },
          {
            title: "Pin Code",
            dataIndex: "pincode",
          },
        ]}
        dataSource={filteredDataSource} // Use filteredDataSource instead of dataSource
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}

export default Customers;
