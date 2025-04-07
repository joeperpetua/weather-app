import { Block } from "baseui/block";

import CityTable from "../../ui/Dashboard/CityTable";
import { Link } from "react-router";
import { Button, SIZE } from "baseui/button";
import DashboardHeading from "../../ui/Dashboard/DashboardHeading";
import { MdAdd, MdError } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchCities } from "../../features/citiesSlice";
import { useEffect } from "react";
import { DURATION, useSnackbar } from "baseui/snackbar";

function DashboardRoot() {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueue } = useSnackbar();

  useEffect(() => {
    dispatch(fetchCities()).unwrap().catch(error => {
      enqueue({
        startEnhancer: () => <MdError />,
        message: "Failed to fetch cities: " + error,
      }, DURATION.long);
    });
  }, [dispatch]);

  return (
    <Block display="flex" flexDirection="column" height="100%" padding={"0 2rem"}>
      <DashboardHeading text="Cities" actions={[
        <Link key="add" to="/dashboard/add"><Button size={SIZE.compact} startEnhancer={() => <MdAdd />}> Add new </Button></Link>
      ]} />
      <CityTable />
    </Block>
  )
}

export default DashboardRoot;