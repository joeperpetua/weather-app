import { Block } from "baseui/block"
import { Button } from "baseui/button"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"
import { City } from "../../types"

interface CityFormProps {
  data?: City;
  onSubmit: () => void;
}

const CityForm: React.FC<CityFormProps> = ({  }) => {
  return (
    <Block as="form" onSubmit={(e) => e.preventDefault()} >
      <FormControl label="City Name">
        <Input id="cityName" type="text" name="cityName" placeholder="City Name" />
      </FormControl>
      <FormControl label="Country">
        <Input id="country" type="text" name="country" placeholder="Country" />
      </FormControl>
      <FormControl label="Country Code">
        <Input id="countryCode" type="text" name="countryCode" placeholder="Country Code" />
      </FormControl>
      <FormControl label="Latitude">
        <Input id="latitude" type="number" name="latitude" placeholder="Latitude" />
      </FormControl>
      <FormControl label="Longitude">
        <Input id="longitude" type="number" name="longitude" placeholder="Longitude" />
      </FormControl>
      <Button type="submit">Save</Button>
    </Block>
  )
}

export default CityForm;