import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { HeadingLevel, Heading } from "baseui/heading";
import { SIZE } from "baseui/input";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Block
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <HeadingLevel>
        <Heading>The page you are looking for does not exist.</Heading>
        <Link to="/">
          <Button
            size={SIZE.large}
          >
            Back to home
          </Button>
        </Link>
      </HeadingLevel>
    </Block>
  );
};

export default NotFound;