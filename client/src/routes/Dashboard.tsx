import { Block } from "baseui/block";
import RouteGuard from "./RouteGuard";
import { useAuth } from "../providers/Auth";
import { Heading, HeadingLevel } from "baseui/heading";
import { ParagraphLarge } from "baseui/typography";

function Dashboard() {
  const { username } = useAuth();

  return (
    <RouteGuard>
      <Block
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <HeadingLevel>
          <Heading>Dashboard</Heading>
          <ParagraphLarge>{username}</ParagraphLarge>
        </HeadingLevel>
      </Block>
    </RouteGuard>
  )
}

export default Dashboard;