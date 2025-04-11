import { BlockProps, Block } from "baseui/block";
import { Heading, HeadingLevel } from "baseui/heading";
import { ParagraphLarge } from "baseui/typography";
import { useStyletron } from "baseui";

interface WeatherDataCardProps extends BlockProps {
  title: string;
  icon?: React.ReactNode;
  time?: string;
  children: React.ReactNode;
}

const WeatherDataCard: React.FC<WeatherDataCardProps> = ({ title, icon, time, children, ...props }) => {
  const [css, theme] = useStyletron();

  return (
    <Block
      display={"flex"}
      flexDirection={"column"}
      marginTop={"5vh"}
      backgroundColor={theme.colors.backgroundSecondary}
      className={css({ borderRadius: ".75rem", border: `1px solid ${theme.colors.primaryA}` })}
      {...props}
    >
      <HeadingLevel>
        <Block
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          padding={["1vh 3vw", "1vh 3vw", "1vh 1rem", "1vh 1rem"]}
          backgroundColor={theme.colors.primaryA}
          className={css({ borderTopLeftRadius: ".75rem", borderTopRightRadius: ".75rem" })}
        >
          <Block display={"flex"} alignItems={"center"} gridGap={".25rem"}>
            {icon}
            <Heading styleLevel={6} margin={0} color={theme.colors.backgroundSecondary}>{title}</Heading>
          </Block>
          <ParagraphLarge margin={0} color={theme.colors.backgroundSecondary}>{time}</ParagraphLarge>
        </Block>
        <Block
          display={"flex"}
          flexDirection={["row", "row", "column", "column"]}
          alignItems={["center", "center", "start", "start"]}
          justifyContent={"center"}
          padding={"1rem 1rem"}
        >
          {children}
        </Block>
      </HeadingLevel>
    </Block>
  );
}

export default WeatherDataCard;