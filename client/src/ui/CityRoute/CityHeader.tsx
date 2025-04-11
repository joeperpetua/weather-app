import { Block } from "baseui/block";
import { City } from "../../types";
import HeadingWeightless from "../HeadingWeightless";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/settingsSlice";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { useSnackbar } from "baseui/snackbar";
import ErrorSnackbar from "../Snackbar/Error";

interface CityHeaderProps {
  city: City;
}

const CityHeader: React.FC<CityHeaderProps> = ({ city }) => {
  const { favoriteCities } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();
  const { enqueue, dequeue } = useSnackbar();

  const handleToggleFavorite = () => {
    if (favoriteCities.length > 4) {
      ErrorSnackbar("You can only have 5 favorite cities at a time. Delete some to add this one", "", enqueue, dequeue);
    } else {
      dispatch(toggleFavorite(city));
    }
  };

  const subtitle = city.adminZone1 != city.adminZone2 && city.adminZone2 ?
    `${city.adminZone2}, ${city.adminZone1}, ${city.country}`
    : `${city.adminZone1}, ${city.country}`;

  return (
    <Block>
      <Block display={"flex"} alignItems={"center"} gridGap={"1rem"}>
        <HeadingWeightless margin={0}>{city.cityName}</HeadingWeightless>
        <Block style={{ cursor: "pointer" }}>
          {favoriteCities.map(favCity => favCity.id).includes(city.id) ?
            <FaStar size={34} color="yellow" onClick={() => dispatch(toggleFavorite(city))} />
            :
            <CiStar size={38} onClick={handleToggleFavorite} />
          }
        </Block>
      </Block>
      <Block>
        <HeadingWeightless styleLevel={5} margin={0}>{subtitle}</HeadingWeightless>
      </Block>
    </Block>
  );
};

export default CityHeader;