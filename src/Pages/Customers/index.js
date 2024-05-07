import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import ShippingForm from "../../Components/Modal/ShippingForm";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://internship-task-orpin.vercel.app/Admin/shipping/shipping-details", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result)
        setDataSource(result)
      })
      .catch((error) => console.error(error));
      setLoading(false);
      
  }, []);


  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values:', values);
    setVisible(false);
  };

  return (
    <Space size={20} direction="vertical">
      <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
      <div><Typography.Title level={4}>Shippnig</Typography.Title></div>
      <div style={{border:"10",padding:"10px",background:"#1677ff",color:"white",marginTop:"15px"}} onClick={() => setVisible(true)}>Add Shippnig</div>
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
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Customers;
