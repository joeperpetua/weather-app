import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem,
  StyledNavigationList,
} from "baseui/header-navigation";
import { Link } from "react-router";

const HeaderComponent = () => {
  return(
    <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>WeatherApp</StyledNavigationItem>
        </StyledNavigationList>

        <StyledNavigationList $align={ALIGN.center} />

        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Link to="/about">About</Link>
          </StyledNavigationItem>

          <StyledNavigationItem>
            <Link to="/about">About</Link>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
  );
}

export default HeaderComponent;