
import { Badge, Drawer, Image, List, Space, Typography } from "antd";

import download from "../../images/images.jpeg"
function AppHeader() {


  return (
    <div className="AppHeader">
      
      <Typography.Title >Admin Panel</Typography.Title>
      <Image
        width={30}
        src={download}
      ></Image>
      
    </div>
  );
}
export default AppHeader;
