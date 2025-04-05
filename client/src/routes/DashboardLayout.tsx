import { Block } from "baseui/block";

import { Outlet } from "react-router";
import HeaderComponent from "../ui/HeaderComponent";
// import FooterComponent from "../ui/FooterComponent";

const DashboardLayout = () => {
  return (
    <Block
      display="flex"
      flexDirection="column"
    >
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
    </Block>
  );
};

export default DashboardLayout;