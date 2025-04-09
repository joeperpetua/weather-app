import { useStyletron } from "baseui";
import { HeadingMedium } from "baseui/typography";
import { Block } from "baseui/block";
import logo from '../assets/logo.png';
import { Link, useLocation } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import CitySearchBar from "./CitySearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchCities } from "../features/citiesSlice";
import ErrorSnackbar from "./Snackbar/Error";
import { useSnackbar } from "baseui/snackbar";

const HeaderComponent = () => {
  const [css, theme] = useStyletron();
  const { cities } = useSelector((state: RootState) => state.cities);
  const dispatch = useDispatch<AppDispatch>();
  const { enqueue, dequeue } = useSnackbar();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCities()).unwrap().catch(error => ErrorSnackbar('Failed to fetch cities', error, enqueue, dequeue));
  }, []);

  return (
    <Block as="nav"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={"1rem 2rem"}
      backgroundColor={theme.colors.primaryA}
      className={css({ borderBottom: `1px solid ${theme.colors.primaryA}` })}
    >
      <Block>
        <Link to='/' className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          paddingLeft: '0',
          textDecoration: 'none'
        })}>
          <Block as="img" src={logo} />
          <HeadingMedium margin={0} color={theme.colors.backgroundSecondary}>WeatherApp</HeadingMedium>
        </Link>
      </Block>

      <Block display={["none", "none", `${location.pathname === '/' ? "none" : "flex"}`, `${location.pathname === '/' ? "none" : "flex"}`]}>
        <CitySearchBar cities={cities} />
      </Block>

      <Block display='flex' className={css({ cursor: 'pointer' })} >
        <GiHamburgerMenu size={26} color={theme.colors.backgroundSecondary} />
      </Block>
    </Block>
  );
}

export default HeaderComponent;