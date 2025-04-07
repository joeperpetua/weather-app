
import { useAuth } from "../providers/Auth";
import { Block } from 'baseui/block'
import { Heading, HeadingLevel } from 'baseui/heading'
import { Button, SIZE } from "baseui/button";
import { Link } from "react-router";
import { useEffect } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { username, validateToken, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated) {
      validateToken();
    }
  }, [hydrated, validateToken]);

  if (!hydrated) {
    return <></>;
  }

  if (!username) {
    return <Block
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <HeadingLevel>
        <Heading>No access allowed or session expired</Heading>
        <Link to="/">
          <Button
            size={SIZE.large}
          >
            Back to home
          </Button>
        </Link>
      </HeadingLevel>
    </Block>
  }

  return <>{children}</>;
};

export default RouteGuard;