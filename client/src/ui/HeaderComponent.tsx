import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem,
  StyledNavigationList
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { FaGear } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useStyletron } from "baseui";
import { HeadingMedium } from "baseui/typography";
import { Block } from "baseui/block";
import logo from '../assets/logo.png';
import { Link } from "react-router";

const HeaderComponent = () => {
  const [css, theme] = useStyletron();

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
        <StyledNavigationItem>
          <Link to='/' className={css({ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.5rem', 
            paddingLeft: '0', 
            textDecoration: 'none' 
          })}>
            <Block as="img" src={logo} />
            <HeadingMedium margin={0}>WeatherApp</HeadingMedium>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>

      <StyledNavigationList $align={ALIGN.center} />

      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <StyledLink href="https://github.com/joeperpetua/weather-app" className={css({ display: 'flex' })}>
            <FaGithub size={26} color={theme.colors.contentPrimary} />
          </StyledLink>
        </StyledNavigationItem>

        <StyledNavigationItem>
          <Block display='flex' className={css({ cursor: 'pointer' })} >
            <FaGear size={26} color={theme.colors.contentPrimary} />
          </Block>
        </StyledNavigationItem>

      </StyledNavigationList>
    </HeaderNavigation >
  );
}

export default HeaderComponent;