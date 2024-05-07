import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";
import ModalForm from '../../Components/Modal/ModalFrom';
function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://internship-task-orpin.vercel.app/Admin/purchase/purchase-orders", requestOptions)
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
      <div><Typography.Title level={4}>Purchase</Typography.Title></div>
      <div style={{border:"10",padding:"10px",background:"#1677ff",color:"white",marginTop:"15px"}} onClick={() => setVisible(true)} >Add Purchase</div>
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
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Orders;
