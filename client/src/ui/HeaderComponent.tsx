import { useStyletron } from "baseui";
import { HeadingMedium } from "baseui/typography";
import { Block } from "baseui/block";
import logo from '../assets/logo.png';
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import HeaderDrawer from "./HeaderDrawer";

const HeaderComponent = () => {
  const [css, theme] = useStyletron();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const dispatch = useDispatch<AppDispatch>();
  // const { enqueue, dequeue } = useSnackbar();
  // const { cities } = useSelector((state: RootState) => state.cities);
  
  // useEffect(() => {
  //   dispatch(fetchCities()).unwrap().catch(error => ErrorSnackbar('Failed to fetch cities', error, enqueue, dequeue));
  // }, []);

  return (
    <Block as="nav"
      position={"sticky"}
      top={0}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={"1rem 2rem"}
      backgroundColor={theme.colors.primaryA}
      height={["6vh", "6vh", "7vh", "7vh"]}
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

      {/* Doesn't seem to like the responsive display, as the popover div doesn't show on occasions, even having the options loaded */}
      {/* Maybe I am doing something wrong, but will leave it commented for now */}
      {/* <Block display={["none", "none", "flex", "flex"]}>
        <CitySearchBar cities={cities} />
      </Block> */}

      <Block display='flex' className={css({ cursor: 'pointer' })} >
        <GiHamburgerMenu size={26} color={theme.colors.backgroundSecondary} onClick={() => setIsDrawerOpen(true)} />
      </Block>

      <HeaderDrawer isOpen={isDrawerOpen} closeDrawer={() => setIsDrawerOpen(false)} />
    </Block>
  );
}

export default HeaderComponent;