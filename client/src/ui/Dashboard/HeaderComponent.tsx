import { FaUser } from "react-icons/fa6";
import { MdArrowBack, MdLogout } from "react-icons/md";
import { useStyletron } from "baseui";
import { useAuth } from "../../providers/Auth";
import { Button, SIZE } from "baseui/button";
import { Block } from "baseui/block";
import { Link } from "react-router";
import { ParagraphLarge } from "baseui/typography";

const HeaderComponent = () => {
  const [_, theme] = useStyletron();
  const { username, logout } = useAuth();

  return (
    <Block as="nav"
      position={"sticky"}
      top={0}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={"1rem 2rem"}
      backgroundColor={theme.colors.backgroundPrimary}
      height={["auto", "auto", "7vh", "7vh"]}
    >
      <Block display="flex" alignItems="center" justifyContent="start" gridGap="0.5rem">
        <Link to="/"> <Button size={SIZE.compact} startEnhancer={() => <MdArrowBack />}>Back to app</Button></Link>
        <ParagraphLarge display={["none", "none", "block", "block"]}>WeatherApp - Admin Dashboard</ParagraphLarge>
      </Block>

      <Block display="flex" alignItems="center" justifyContent="center" gridGap="0.5rem">
        <FaUser />
        <Block as="span">{username}</Block>
        <Button onClick={logout} startEnhancer={() => <MdLogout />}>Logout</Button>
      </Block>
    </Block>
  );
}

export default HeaderComponent;