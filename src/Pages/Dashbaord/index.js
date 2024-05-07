import {

  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";





function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  

  useEffect(() => {

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    

    fetch("https://internship-task-orpin.vercel.app/Admin/customer/customers",requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result)
        setOrders(result.length)
      })
      .catch((error) => console.error(error));

      fetch("https://internship-task-orpin.vercel.app/Admin/purchase/purchase-orders", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result)
        setInventory(result.length)
      })
      .catch((error) => console.error(error));


      fetch("https://internship-task-orpin.vercel.app/Admin/shipping/shipping-details")
      .then((response) => response.json())
      .then((result) => {console.log(result)
        setCustomers(result.length)
      })
      .catch((error) => console.error(error));
  



  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Purchase"}
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Shipping Order"}
          value={inventory}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={customers}
        />
        
      </Space>
      <Space>
        
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card >
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}


export default Dashboard;
