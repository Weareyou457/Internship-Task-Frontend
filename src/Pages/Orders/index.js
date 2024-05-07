import { Space, Table, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import ModalForm from '../../Components/Modal/ModalFrom';

function Orders() {
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
    
    fetch("https://internship-task-orpin.vercel.app/Admin/purchase/purchase-orders", requestOptions)
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
      item.productName.toLowerCase().includes(value)
    );
    setFilteredDataSource(filteredData);
  };

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values:', values);
    setVisible(false);
  };

  return (
    <Space size={20} direction="vertical">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div><Typography.Title level={4}>Purchase</Typography.Title></div>
        <div style={{ border: "10", padding: "10px", background: "#1677ff", color: "white", marginTop: "15px" }} onClick={() => setVisible(true)}>Add Purchase</div>
        <Input.Search
          placeholder="Search by product name"
          onChange={handleSearch}
          style={{ width: 200, marginTop: 15 }}
        />
      </div>

      <ModalForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />

      <Table
        loading={loading}
        columns={[
          {
            title: "Purchase Id",
            dataIndex: "_id",
          },
          {
            title: "Customer Id",
            dataIndex: "customerId",
          },
          {
            title: "Product Name",
            dataIndex: "productName",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Pricing",
            dataIndex: "pricing",
          },
          {
            title: "MRP",
            dataIndex: "mrp",
            render: (mrp) => {
              return (
                <span>
                  ${mrp}
                </span>
              );
            }
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

export default Orders;
