import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from "baseui/heading";
import { StyledLink } from "baseui/link";
import { ParagraphLarge } from "baseui/typography";
import { FaGithub } from "react-icons/fa6";

const FooterComponent = () => {
  const [_, theme] = useStyletron();
  
  return (
    <Block
      as="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
      padding="5vh"
      backgroundColor={theme.colors.primaryA}
      justifySelf="end"
      paddingTop={"7vh"}
    >
      <HeadingLevel>
        <Heading color={theme.colors.backgroundSecondary} margin={0}>WeatherApp</Heading>
        <ParagraphLarge color={theme.colors.backgroundSecondary}>
          <span>Made with </span> 
          <StyledLink href="https://baseweb.design/" target="_blank">Base Web</StyledLink>
          <span> & </span>
          <StyledLink href="https://flask.palletsprojects.com/en/stable/" target="_blank">Flask</StyledLink>
        </ParagraphLarge>

        <StyledLink href="https://github.com/joeperpetua/weather-app" target="_blank">
          <FaGithub color={theme.colors.contentPrimary} size={40} />
        </StyledLink>
      </HeadingLevel>
    </Block>
  );
};

export default FooterComponent;

