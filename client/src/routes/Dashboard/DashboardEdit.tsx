import { Block } from "baseui/block"
import CityForm from "../../ui/Dashboard/CityForm"
import DashboardHeading from "../../ui/Dashboard/DashboardHeading"
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../providers/Auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { selectCityById, updateCity } from "../../features/citiesSlice";
import NotFound from "../NotFound";
import { City } from "../../types";
import SuccessSnackbar from "../../ui/Snackbar/Success";
import ErrorSnackbar from "../../ui/Snackbar/Error";
import { useSnackbar } from "baseui/snackbar";

const DashboardEdit = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { enqueue, dequeue } = useSnackbar();
  const city = useSelector((state: RootState) => selectCityById(state.cities, Number(params.id) || -1));

  if (!city) {
    return (
      <NotFound message="Specified city does not exist." backText="Back to dashboard" backPath="/dashboard" />
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonData = { ...Object.fromEntries(formData) };
    const parsedCity: City = {
      cityName: jsonData.cityName as string,
      country: jsonData.country as string,
      countryCode: jsonData.countryCode as string,
      coordinates: {
        lat: parseFloat(jsonData.lat as unknown as string),
        lon: parseFloat(jsonData.lon as unknown as string)
      }
    };

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