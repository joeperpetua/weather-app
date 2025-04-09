import { Button } from "baseui/button";
import { City } from "../types";
import { Card } from 'baseui/card'
import WeatherIcon from "./WeatherIcon";
import { ParagraphLarge } from "baseui/typography";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Link } from "react-router";
import { cityURL } from "../encode";

interface CityCardProps {
  city: City;
}

// Define here cause it seems like React doesn't detect the one defined in card.js
// If not defined, component crashes with `Uncaught TypeError: hasThumbnail2 is not a function`
const hasThumbnail = (_props: { readonly thumbnail?: string | undefined; }) => true

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const [css] = useStyletron();

  // Fetch current weather for city

  return (
    <Block width={["100%", "100%", "25vw", "25vw"]}>
      <Card
        overrides={{ Root: { style: { width: "100%" } } }}
        title={`${city.cityName}, ${city.countryCode}`}
        hasThumbnail={hasThumbnail}
      >
        <Block
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginBottom={"2rem"}
        >
          <Block display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <Block display={"flex"} gridGap={"0.5rem"}>
              <WeatherIcon weatherCode={999} size={2} />
              <ParagraphLarge margin={0}>15.2 °C</ParagraphLarge>
            </Block>

            <Block display={"flex"} gridGap={"0.5rem"}>
              <WeatherIcon weatherCode={998} size={2} />
              <ParagraphLarge margin={0}>1%</ParagraphLarge>
            </Block>
          </Block>
          <WeatherIcon weatherCode={0} />

        </Block>
        <Block marginLeft={["0", "0", "25%", "25%"]} width={["100%", "100%", "50%", "50%"]}>
          <Link to={cityURL(city)}>
            <Button className={css({ width: "100%" })}>
              See forecast
            </Button>
          </Link>
        </Block>
      </Card>
    </Block>
  );
}

export default CityCard;