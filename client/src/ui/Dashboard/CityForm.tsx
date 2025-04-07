import { Block } from "baseui/block"
import { Button } from "baseui/button"
import { FormControl } from "baseui/form-control"
import { StatefulInput } from "baseui/input"
import { City } from "../../types"
import { FormEvent } from "react"

interface CityFormProps {
  data?: City;
  action: (e: FormEvent<HTMLFormElement>) => void;
}

const CityForm: React.FC<CityFormProps> = ({ data, action }) => {
  return (
    <Block as="form" onSubmit={action}>
      <FormControl label="City Name">
        <StatefulInput id="cityName" type="text" name="cityName" placeholder="City Name" initialState={{ value: data?.cityName || ''}} required />
      </FormControl>

      {/* ADD FEATURE TO AUTO COMPLETE FORM BASED ON CITY AND COUNTRY CODE */}

      <FormControl label="Country">
        <StatefulInput id="country" type="text" name="country" placeholder="Country" initialState={{ value: data?.country || ''}} required />
      </FormControl>

      <FormControl label="Country Code">
        <StatefulInput id="countryCode" type="text" name="countryCode" placeholder="Country Code" initialState={{ value: data?.countryCode || ''}} required />
      </FormControl>

      <FormControl label="Latitude">
        <StatefulInput id="latitude" type="number" name="lat" placeholder="Latitude" initialState={{ value: data?.coordinates.lat || ''}} required />
      </FormControl>

      <FormControl label="Longitude">
        <StatefulInput id="longitude" type="number" name="lon" placeholder="Longitude" initialState={{ value: data?.coordinates.lon || ''}} required />
      </FormControl>

      <Button type="submit">Save</Button>
    </Block>
  )
}

export default CityForm;