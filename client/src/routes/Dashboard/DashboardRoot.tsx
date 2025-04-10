import { Block } from "baseui/block";

import CityTable from "../../ui/Dashboard/CityTable";
import { Link, useNavigate } from "react-router";
import { Button, KIND, SIZE } from "baseui/button";
import DashboardHeading from "../../ui/Dashboard/DashboardHeading";
import { MdAdd, MdRefresh } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { deleteCity, fetchCities } from "../../features/citiesSlice";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "baseui/snackbar";
import ErrorSnackbar from "../../ui/Snackbar/Error";
import SuccessSnackbar from "../../ui/Snackbar/Success";
import { useAuth } from "../../providers/Auth";
import { Dialog, SIZE as DIALOG_SIZE } from "baseui/dialog";

function DashboardRoot() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAuth();
  const { enqueue, dequeue } = useSnackbar();
  const deleteCityId = useRef(-1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCities()).unwrap().catch(error => ErrorSnackbar('Failed to fetch cities', error, enqueue, dequeue));
  }, []);

  const editEntry = (id: number) => {
    navigate(`/dashboard/edit/${id}`);
  };

  const deleteEntry = () => {
    setIsDeleteModalOpen(false);
    dispatch(deleteCity({ id: deleteCityId.current, token })).unwrap().then(() => {
      SuccessSnackbar("City deleted successfully", "Close", enqueue, dequeue);
    }).catch(error => ErrorSnackbar("Failed to delete city", error, enqueue, dequeue));
  }

  const askConfirmation = (id: number) => {
    setIsDeleteModalOpen(true);
    deleteCityId.current = id;
  }

  return (
    <Block display="flex" flexDirection="column" height="100%" padding={"0 2rem"}>
      <DashboardHeading text="Cities" actions={[
        <Link key="add" to="/dashboard/add"><Button size={SIZE.compact} startEnhancer={() => <MdAdd />}> Add new </Button></Link>,
        <Button key="refresh" size={SIZE.compact} onClick={() => navigate(0)}> <MdRefresh /> </Button>,
      ]} />
      <CityTable editHandler={editEntry} deleteHandler={askConfirmation} />
      <Dialog
        heading="Delete city?"
        numHeadingLines={1}
        size={DIALOG_SIZE.xSmall}
        hasOverlay={true}
        isOpen={isDeleteModalOpen}
        onDismiss={() => setIsDeleteModalOpen(false)}
        buttonDock={{
          dismissiveAction: <Button kind={KIND.secondary} onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>,
          primaryAction: <Button kind={KIND.primary} colors={{ backgroundColor: "red", color: "white" }} onClick={deleteEntry}>Delete</Button>,
        }}
      />
    </Block>
  )
}

export default DashboardRoot;