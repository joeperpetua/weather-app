import { Block } from "baseui/block";

import { Outlet } from "react-router";
import HeaderComponent from "../ui/Dashboard/HeaderComponent";
import { useStyletron } from "baseui";
import RouteGuard from "./RouteGuard";
// import FooterComponent from "../ui/FooterComponent";

const DashboardLayout = () => {
  const [css] = useStyletron();
  return (
    <Block
      display="flex"
      flexDirection="column"
      height={"100%"}
    >
      <RouteGuard>
        <HeaderComponent />
        <main className={css({ height: '100%' })}>
          <Outlet />
        </main>
      </RouteGuard>
    </Block>
  );
};

export default DashboardLayout;