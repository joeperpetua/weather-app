import { Block } from "baseui/block";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchCities } from "../features/citiesSlice";
import ErrorSnackbar from "../ui/Snackbar/Error";
import { useSnackbar } from "baseui/snackbar";

const City = () => {
  const { enqueue, dequeue } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const { cities } = useSelector((state: RootState) => state.cities);

  useEffect(() => {
    dispatch(fetchCities()).unwrap().catch(error => ErrorSnackbar('Failed to fetch cities', error, enqueue, dequeue));
  }, []);

  return (
    <Block
      display="flex"
      justifyContent="center"
      alignItems="center"
    >

      <h1>City</h1>
      
    </Block>

  )
};

export default City;
