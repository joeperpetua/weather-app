import { Block } from "baseui/block";
import { MdStarBorder } from "react-icons/md";
import { City } from "../../types";
import HeadingWeightless from "../HeadingWeightless";

interface CityHeaderProps {
  city: City;
}

const CityHeader: React.FC<CityHeaderProps> = ({ city }) => {
  return (
    <Block>
      <Block display={"flex"} alignItems={"center"} gridGap={"1rem"}>
        <HeadingWeightless margin={0}>{city.cityName}</HeadingWeightless>
        <MdStarBorder size={34} />
      </Block>
      <Block>
        <HeadingWeightless styleLevel={5} margin={0}>{city.admin1}, {city.country}</HeadingWeightless>
      </Block>
    </Block>
  );
};

export default CityHeader;