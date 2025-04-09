import { useStyletron } from "baseui";
import { HeadingProps, Heading } from "baseui/heading";
import { StyleObject } from "styletron-react";

interface HeadingWightless extends HeadingProps {
  children: React.ReactNode;
  style?: StyleObject;
}

const HeadingWeightless: React.FC<HeadingWightless> = ({ children, style, ...props }) => {
  const [css] = useStyletron();
  return <Heading className={css({ ...style, fontWeight: 'normal !important' })} {...props}>{children}</Heading>
}

export default HeadingWeightless;