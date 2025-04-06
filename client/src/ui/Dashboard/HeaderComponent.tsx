import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem,
  StyledNavigationList
} from "baseui/header-navigation";
import { FaUser } from "react-icons/fa6";
import { MdArrowBack, MdLogout } from "react-icons/md";
import { useStyletron } from "baseui";
import { useAuth } from "../../providers/Auth";
import { Button, SIZE } from "baseui/button";
import { Block } from "baseui/block";
import { Link } from "react-router";

const HeaderComponent = () => {
  const [css, _theme] = useStyletron();
  const { username, logout } = useAuth();

  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: () => ({
            padding: "1rem 2rem"
          })
        }
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem className={css( {display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', paddingLeft: '0'} )}>
          <Link to="/"> <Button size={SIZE.compact} startEnhancer={() => <MdArrowBack />}>Back to app</Button></Link>
          <Block as="span">WeatherApp - Admin Dashboard</Block>
        </StyledNavigationItem>
      </StyledNavigationList>

      <StyledNavigationList $align={ALIGN.center} />

      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Block display="flex" alignItems="center" justifyContent="center" gridGap="0.5rem">
            <FaUser />
            <Block as="span">{username}</Block>
          </Block>
        </StyledNavigationItem>

        <StyledNavigationItem>
          <Button onClick={logout} startEnhancer={() => <MdLogout />}>Logout</Button>
        </StyledNavigationItem>

      </StyledNavigationList>
    </HeaderNavigation >
  );
}

export default HeaderComponent;