import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { HeadingLevel, Heading } from "baseui/heading";
import { SIZE } from "baseui/input";
import { Link } from "react-router";

interface NotFoundProps {
  message?: string;
  backText?: string;
  backPath?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ 
  message = "The page you are looking for does not exist.", 
  backText = "Back to home", 
  backPath = "/" 
}) => {
  return (
    <Block
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <HeadingLevel>
        <Heading>{message}</Heading>
        <Link to={backPath}>
          <Button size={SIZE.large}>{backText}</Button>
        </Link>
      </HeadingLevel>
    </Block>
  );
};

export default NotFound;