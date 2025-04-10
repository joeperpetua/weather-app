import { Block, BlockProps } from "baseui/block";
import { StatefulTooltip } from "baseui/tooltip";
import HeadingWeightless from "./HeadingWeightless";
import WeatherIcon from "./WeatherIcon";
import { Heading } from "baseui/heading";

interface DataIconProps extends BlockProps {
  data: string;
  tooltip: string;
  iconId: number;
  iconSize?: number;
  mobile: boolean;
  bold?: boolean;
}

const DataIcon: React.FC<DataIconProps> = ({ 
  data, 
  tooltip, 
  iconId,
  iconSize = 1.5, 
  mobile, 
  bold = false,
  ...props 
}) => {
  return (
    <StatefulTooltip
      accessibilityType={"tooltip"}
      content={tooltip}
    >
      <Block
        display={mobile ? "flex" : ["none", "none", "flex", "flex"]}
        alignItems={"center"}
        gridGap={"0.25rem"}
        width={"50%"}
        flexDirection={"row"}
        {...props}
      >
        <WeatherIcon weatherCode={iconId} size={iconSize} />
        {bold ? 
          <Heading styleLevel={6} margin={0}>{data}</Heading> 
          :
          <HeadingWeightless styleLevel={6} margin={0}>{data}</HeadingWeightless> 
        }
        
      </Block>
    </StatefulTooltip>
  );
};

export default DataIcon;