import { Block } from "baseui/block";

import { Outlet } from "react-router";
import HeaderComponent from "../ui/HeaderComponent";
import FooterComponent from "../ui/FooterComponent";

const Layout = () => {
  return (
    <Block
      display="flex"
      flexDirection="column"
      justifyContent={"space-between"}
      minHeight={"100vh"}
      height="100%"
    >
      <HeaderComponent />
      <Block as="main" height="100%" paddingBottom={"7vh"}>
        <Outlet />
      </Block>
      <FooterComponent />
    </Block>
  );
};

export default Layout;