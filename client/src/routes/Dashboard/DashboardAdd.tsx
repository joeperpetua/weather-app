import { Block } from "baseui/block"
import CityForm from "../../ui/Dashboard/CityForm"
import DashboardHeading from "../../ui/Dashboard/DashboardHeading"
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { addCity } from "../../features/citiesSlice";
import { useAuth } from "../../providers/Auth";
import { City } from "../../types";
import { useSnackbar } from "baseui/snackbar";
import { useNavigate } from "react-router";
import ErrorSnackbar from "../../ui/Snackbar/Error";
import SuccessSnackbar from "../../ui/Snackbar/Success";

const DashboardAdd = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueue, dequeue } = useSnackbar();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, city: City) => {
    e.preventDefault();

    dispatch(addCity({ city, token })).unwrap().then(() => {
      SuccessSnackbar("City added successfully", "Back to dashboard", enqueue, () => navigate("/dashboard"));
    }).catch(error => ErrorSnackbar("Failed to add city", error, enqueue, dequeue));
  }

  return (
    <Block display="flex" flexDirection="column" height="100%" padding={"0 2rem"}>
      <DashboardHeading text="Add new city" link="/dashboard" />
      <CityForm action={handleSubmit} />
    </Block>
  )
};

export default DashboardAdd;