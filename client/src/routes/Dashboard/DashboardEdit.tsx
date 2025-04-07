import { Block } from "baseui/block"
import CityForm from "../../ui/Dashboard/CityForm"
import DashboardHeading from "../../ui/Dashboard/DashboardHeading"
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../providers/Auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchCities, selectCityById, updateCity } from "../../features/citiesSlice";
import NotFound from "../NotFound";
import { City } from "../../types";
import SuccessSnackbar from "../../ui/Snackbar/Success";
import ErrorSnackbar from "../../ui/Snackbar/Error";
import { useSnackbar } from "baseui/snackbar";
import { useEffect } from "react";
import PageSpinner from "../../ui/PageSpinner";

const DashboardEdit = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { enqueue, dequeue } = useSnackbar();
  const { loading } = useSelector((state: RootState) => state.cities);
  const city = useSelector((state: RootState) => selectCityById(state.cities, Number(params.id) || -1));

  useEffect(() => {
    dispatch(fetchCities()).unwrap().catch(error => ErrorSnackbar('Failed to fetch cities.', error, enqueue, dequeue));
  }, []);

  if (loading) return <PageSpinner />

  if (!city) {
    return (
      <NotFound message="Specified city does not exist." backText="Back to dashboard" backPath="/dashboard" />
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, parsedCity: City) => {
    e.preventDefault();

    dispatch(updateCity({ id: city.id!, city: parsedCity, token })).unwrap().then(() => {
      SuccessSnackbar("City edited successfully", "Back to dashboard", enqueue, () => navigate("/dashboard"));
    }).catch(error => ErrorSnackbar("Failed to edit city", error, enqueue, dequeue));
  }
  
  return (
    <Block display="flex" flexDirection="column" height="100%" padding={"0 2rem"}>
      <DashboardHeading text="Edit city" link="/dashboard" />
      <CityForm data={city} action={handleSubmit} />
    </Block>
  )
};

export default DashboardEdit;