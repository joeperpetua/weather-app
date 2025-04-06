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
        <StyledNavigationItem>WeatherApp</StyledNavigationItem>
      </StyledNavigationList>

      <StyledNavigationList $align={ALIGN.center} />

      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <StyledLink href="https://github.com/joeperpetua/weather-app" className={css({ display: 'flex' })}>
            <FaGithub size={20} color={theme.colors.contentPrimary} />
          </StyledLink>
        </StyledNavigationItem>

        <StyledNavigationItem>
          <div className={css({ display: 'flex', cursor: 'pointer' })} >
            <FaGear size={20} color={theme.colors.contentPrimary} />
          </div>
        </StyledNavigationItem>

      </StyledNavigationList>
    </HeaderNavigation >
  );
}

export default HeaderComponent;