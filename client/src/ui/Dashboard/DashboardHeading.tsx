import { Block } from "baseui/block"
import { Button, SHAPE } from "baseui/button"
import { Heading, HeadingLevel } from "baseui/heading"
import { SIZE } from "baseui/input"
import { MdArrowBack } from "react-icons/md"
import { Link } from "react-router"

interface DashboardHeadingProps {
  text: string;
  link?: string;
  actions?: React.ReactNode[];
}

const DashboardHeading: React.FC<DashboardHeadingProps> = ({ text, link, actions }) => {
  return (
    <HeadingLevel>
      <Block display="flex" alignItems={"center"} gridGap={"1rem"}>
        {link && <Link to={link}><Button size={SIZE.compact} shape={SHAPE.circle}> <MdArrowBack /> </Button></Link>}
        <Heading styleLevel={3}>{text}</Heading>
        {actions && actions}
      </Block>
    </HeadingLevel>
  )
}

export default DashboardHeading;