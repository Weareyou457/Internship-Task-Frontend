import { Avatar, Input, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import CustomerForm from "../../Components/Modal/CustomerForm";

function Inventory() {
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

    fetch("https://internship-task-orpin.vercel.app/Admin/customer/customers", requestOptions)
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
      item.name.toLowerCase().includes(value)
    );
    setFilteredDataSource(filteredData);
  };

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values:', values);
    setVisible(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Space size={20} direction="vertical">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div><Typography.Title level={4}>Customer</Typography.Title></div>
          <div style={{ border: "10", padding: "10px", background: "#1677ff", color: "white", marginTop: "15px" }} onClick={() => setVisible(true)}>Add Customer</div>
          <Input.Search
            placeholder="Search by customer name"
            onChange={handleSearch}
            style={{ width: 200, marginTop: 15 }}
          />
        </div>

        <CustomerForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => setVisible(false)}
        />

        <Table
          loading={loading}
          columns={[
            {
              title: "Customer Id",
              dataIndex: "_id",
            },
            {
              title: "Customer Name",
              dataIndex: "name",
            },
            {
              title: "Email ID",
              dataIndex: "email",
            },
            {
              title: "Mobile Number",
              dataIndex: "mobileNumber",
            },
            {
              title: "City",
              dataIndex: "city",
            },
          ]}
          dataSource={filteredDataSource} // Use filteredDataSource instead of dataSource
          pagination={{
            pageSize: 5,
          }}
        />
      </Space>
    </div>
  );
}

export default Inventory;
