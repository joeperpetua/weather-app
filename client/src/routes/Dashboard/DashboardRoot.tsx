import { Block } from "baseui/block";

import CityTable from "../../ui/Dashboard/CityTable";
import { Link } from "react-router";
import { Button, SIZE } from "baseui/button";
import DashboardHeading from "../../ui/Dashboard/DashboardHeading";
import { MdAdd } from "react-icons/md";

function DashboardRoot() {

  return (
    <Block display="flex" flexDirection="column" height="100%" padding={"0 2rem"}>
      <DashboardHeading text="Cities" actions={[
        <Link to="/dashboard/add"><Button size={SIZE.compact} startEnhancer={() => <MdAdd />}> Add new </Button></Link>
      ]} />
      <CityTable />

    </Block>
  )
}

export default DashboardRoot;