import { Block } from "baseui/block"
import CityForm from "../../ui/Dashboard/CityForm"
import DashboardHeading from "../../ui/Dashboard/DashboardHeading"

const DashboardEdit = () => {
  return (
    <Block display="flex" flexDirection="column" height="100%" padding={"0 2rem"}>
      <DashboardHeading text="Edit city" link="/dashboard" />
      <CityForm onSubmit={() => { }} />
    </Block>
  )
};

export default DashboardEdit;