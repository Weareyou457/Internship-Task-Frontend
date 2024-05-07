import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";
import CustomerForm from "../../Components/Modal/CustomerForm";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://internship-task-orpin.vercel.app/Admin/customer/customers", requestOptions)
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
    <div tyle={{ display: 'flex', justifyContent: 'center',alignItems: 'center', height: '100vh' }}>
      <Space size={20} direction="vertical">
        <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
      <div><Typography.Title level={4}>Customer</Typography.Title></div>
      <div style={{border:"10",padding:"10px",background:"#1677ff",color:"white",marginTop:"15px"}} onClick={() => setVisible(true)}>Add Customer</div>
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
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
    </div>
  );
}
export default Inventory;
