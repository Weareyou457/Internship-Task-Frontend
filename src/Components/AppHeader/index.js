import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useState } from "react";
import {
  BellOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import download from "../../images/images.jpeg";
import SideMenu from "../SideMenu/index";

function AppHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div className="AppHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Space size={20}>
        <MenuOutlined style={{ fontSize: 24 }} onClick={toggleDrawer} />
        <Typography.Title level={4} style={{ margin: 0 }}>Admin Panel</Typography.Title>
        <Image width={30} src={download} preview={false} />
      </Space>
      <Space size={20}>
        <Badge count={5} overflowCount={99}>
          <BellOutlined style={{ fontSize: 24 }} />
        </Badge>
        <UserOutlined style={{ fontSize: 24 }} />
        <LogoutOutlined style={{ fontSize: 24 }} />
      </Space>
      <Drawer
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerVisible}
        width={200}
      >
        <SideMenu />
      </Drawer>
    </div>
  );
}

export default AppHeader;
