import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Heading } from "baseui/heading";
import { ParagraphLarge } from "baseui/typography";

interface ForecastCardProps {
  title: string;
  time?: string;
  children: React.ReactNode;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ title, time, children }) => {
  const [css, theme] = useStyletron();

  return (
    <Block 
      display={"flex"} 
      flexDirection={"column"} 
      width={"100%"} 
      marginTop={"5vh"} 
      backgroundColor={theme.colors.backgroundSecondary} 
      className={css({ borderRadius: ".755rem", border: `1px solid ${theme.colors.primaryA}` })}
    >
      <Block
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        padding={"1vh 3vw"}
        backgroundColor={theme.colors.primaryA}
        className={css({ borderTopLeftRadius: ".75rem", borderTopRightRadius: ".75rem" })}
      >
        <Heading styleLevel={5} margin={0} color={theme.colors.backgroundSecondary}>{title}</Heading>
        <ParagraphLarge margin={0} color={theme.colors.backgroundSecondary}>{time}</ParagraphLarge>
      </Block>
      {children}
    </Block>
  );
}

export default ForecastCard;