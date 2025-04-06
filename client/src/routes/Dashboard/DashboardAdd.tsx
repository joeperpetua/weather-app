import { Block } from "baseui/block"
import CityForm from "../../ui/Dashboard/CityForm"
import DashboardHeading from "../../ui/Dashboard/DashboardHeading"

const DashboardAdd = () => {
  return (
    <Block display="flex" flexDirection="column" height="100%" padding={"0 2rem"}>
      <DashboardHeading text="Add new city" link="/dashboard" />
      <CityForm onSubmit={() => { }} />
    </Block>
  )
};

export default DashboardAdd;