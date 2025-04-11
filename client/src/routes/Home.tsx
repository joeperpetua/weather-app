import { Block } from "baseui/block";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useMemo } from "react";
import { fetchCities } from "../features/citiesSlice";
import ErrorSnackbar from "../ui/Snackbar/Error";
import { useSnackbar } from "baseui/snackbar";
import CitySearchBar from "../ui/CitySearchBar";
import CityCard from "../ui/CityCard";
import PageSpinner from "../ui/PageSpinner";
import { Heading, HeadingLevel } from "baseui/heading";

function Home() {
  const { enqueue, dequeue } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const { cities } = useSelector((state: RootState) => state.cities);

  const randomCities = useMemo(() => {
    if (cities.length === 0) return [];
    const shuffled = [...cities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [cities]);

  const randomHero = useMemo(() => {
    return Math.floor(Math.random() * 5) + 1;
  }, []);

  useEffect(() => {
    dispatch(fetchCities()).unwrap().catch(error => ErrorSnackbar('Failed to fetch cities', error, enqueue, dequeue));
  }, []);

  return (
    <Block
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
    >
      <Block
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent="center"
        width="100%"
        minHeight={["30vh", "30vh", "60vh", "60vh"]}
        padding="3rem"
        backgroundImage={`url(https://www.awxcdn.com/adc-assets/images/hero/${randomHero}/1440x450.jpg)`}
        backgroundRepeat="no-repeat"
        backgroundSize={"cover"}
      >
        <CitySearchBar cities={cities} />
      </Block>

      <HeadingLevel>
        <Heading styleLevel={3} placeSelf={"start"} marginLeft={"5vw"}>Popular cities</Heading>
      </HeadingLevel>
      {cities.length === 0 ? <PageSpinner /> : (
        <Block
          display="flex"
          flexDirection={["column", "column", "row", "row"]}
          justifyContent={["space-evenly", "space-evenly", "space-evenly", "space-between"]}
          flexWrap={true}
          gridGap={"5vh"}
          width={["100%", "100%", "100%", "100%"]}
          padding={["0 2rem", "0 2rem", "0 2rem", "0 10rem"]}
          marginBottom={"10vh"}
        >
          {randomCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </Block>
      )}
    </Block>

  )
}

export default Home;
