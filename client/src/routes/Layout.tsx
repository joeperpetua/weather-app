import { Block } from "baseui/block";

import { Outlet } from "react-router";
import HeaderComponent from "../ui/HeaderComponent";
import FooterComponent from "../ui/FooterComponent";

const Layout = () => {
  return (
    <Block
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
    >
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </Block>
  );
};

export default Layout;