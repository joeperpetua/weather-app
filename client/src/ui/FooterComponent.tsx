import { Block } from "baseui/block";
import { StyledLink } from "baseui/link";

const FooterComponent = () => {
  return (
    <Block
      as="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="scale500"
      backgroundColor="mono200"
      justifySelf="end"
    >
      <StyledLink href="/">Home</StyledLink>
      <StyledLink href="/about" style={{ marginLeft: "scale600" }}>
        About
      </StyledLink>
      <StyledLink href="/contact" style={{ marginLeft: "scale600" }}>
        Contact
      </StyledLink>
    </Block>
  );
};

export default FooterComponent;

