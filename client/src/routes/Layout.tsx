import { Block } from "baseui/block";

import { Outlet } from "react-router";
import HeaderComponent from "../ui/HeaderComponent";
import FooterComponent from "../ui/FooterComponent";

const Layout = () => {
  return (
    <Block
      display="flex"
      flexDirection="column"
      padding={"4rem"}
      width={"100%"}
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