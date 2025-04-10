import { Block } from "baseui/block";
import { MdStarBorder } from "react-icons/md";
import { City } from "../../types";
import HeadingWeightless from "../HeadingWeightless";

interface CityHeaderProps {
  city: City;
}

const CityHeader: React.FC<CityHeaderProps> = ({ city }) => {
  const subtitle = city.adminZone1 != city.adminZone2 && city.adminZone2 ? 
    `${city.adminZone1}, ${city.adminZone2}, ${city.country}`
    : `${city.adminZone1}, ${city.country}`;
  
  return (
    <Block>
      <Block display={"flex"} alignItems={"center"} gridGap={"1rem"}>
        <HeadingWeightless margin={0}>{city.cityName}</HeadingWeightless>
        <MdStarBorder size={34} />
      </Block>
      <Block>
        <HeadingWeightless styleLevel={5} margin={0}>{subtitle}</HeadingWeightless>
      </Block>
    </Block>
  );
};

export default CityHeader;