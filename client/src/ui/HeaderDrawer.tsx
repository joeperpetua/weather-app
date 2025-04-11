import { Theme, useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ANCHOR, Drawer, SIZE } from "baseui/drawer";
import { Heading, HeadingLevel } from "baseui/heading";
import { SegmentedControl, Segment } from "baseui/segmented-control";
import { CgClose } from "react-icons/cg";
import { IoMdPin } from "react-icons/io";
import { Link, useLocation } from "react-router";
import { toggleFavorite, toggleUnitSystem } from "../features/settingsSlice";
import { cityURL } from "../services/url";
import { City } from "../types";
import HeadingWeightless from "./HeadingWeightless";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";

interface UnitSelectorProps {
  unitSystem: 'metric' | 'imperial';
  toggle: () => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ unitSystem, toggle }) => {
  return (
    <Block>
      <Heading styleLevel={1}>Display units</Heading>
      <SegmentedControl
        activeKey={unitSystem === "metric" ? 0 : 1}
        onChange={toggle}
        width="100%"
      >
        <Segment
          label="Metric"
          description="°C km/h, mm"
          overrides={{
            Label: {
              style: () => ({
                fontSize: "1.1rem",
              })
            }
          }}
        />
        <Segment
          label="Imperial"
          description="°F, mph, in"
          overrides={{
            Label: {
              style: () => ({
                fontSize: "1.1rem",
              })
            }
          }}
        />
      </SegmentedControl>
    </Block>
  );
}

interface CityItemProps {
  city: City;
  theme: Theme;
  removeCity: () => void;
}

const CityItem: React.FC<CityItemProps> = ({ city, theme, removeCity }) => {
  return (
    <Block
      key={city.id}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Block display={"flex"} flexDirection={"row"} alignItems={"center"} gridGap={"1rem"}>
        <IoMdPin size={48} color={theme.colors.primaryA} />
        <Link to={cityURL(city)} style={{ textDecoration: 'none' }}>
          <Heading styleLevel={3} margin={0}>{city.cityName}</Heading>
          <HeadingWeightless styleLevel={5} margin={0}>{city.adminZone1}, {city.country}</HeadingWeightless>
        </Link>
      </Block>
      <CgClose
        size={48}
        color={theme.colors.red500}
        style={{ cursor: "pointer" }}
        onClick={removeCity}
      />
    </Block>
  );
}

interface HeaderDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;

}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({ isOpen: isDrawerOpen, closeDrawer }) => {
  const [css, theme] = useStyletron();
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteCities, unitSystem } = useSelector((state: RootState) => state.settings);
  const location = useLocation();

  useEffect(closeDrawer, [location]);

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      anchor={ANCHOR.right}
      autoFocus
      size={SIZE.auto}
      overrides={{
        Close: {
          style: () => ({
            width: "3rem",
            height: "3rem",
          })
        }
      }}
    >
      <HeadingLevel>
        <Block display={"flex"} flexDirection={"column"} justifyContent={"space-between"} width={"100%"} height={"100%"}>
          <Block>
            <Heading styleLevel={1}>My Cities</Heading>
            <Block
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              gridGap={"2rem"}
              maxHeight={"70vh"}
              overflow={"auto"}
              className={css({ borderRadius: "1rem" })}
            >
              {favoriteCities.map(city => (
                <CityItem key={city.id} city={city} theme={theme} removeCity={() => dispatch(toggleFavorite(city))} />
              ))}
            </Block>
          </Block>
          <UnitSelector unitSystem={unitSystem} toggle={() => dispatch(toggleUnitSystem(unitSystem))} />
        </Block>
      </HeadingLevel>
    </Drawer>
  );
};

export default HeaderDrawer;