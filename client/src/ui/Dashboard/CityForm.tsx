import { Block } from "baseui/block"
import { Button, SIZE } from "baseui/button"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"
import { City } from "../../types"
import { FormEvent, useState } from "react"
import { MdAutoFixHigh } from "react-icons/md";
import { FaLevelDownAlt } from "react-icons/fa"
import { throwOnAPIError, unknownToError } from "../../error"
import ErrorSnackbar from "../Snackbar/Error"
import { useSnackbar } from "baseui/snackbar"

interface CityFormProps {
  data?: City;
  action: (e: FormEvent<HTMLFormElement>, city: City) => void;
}

const CityForm: React.FC<CityFormProps> = ({ data, action }) => {
  const { enqueue, dequeue } = useSnackbar();
  const [validateEmpty, setValidateEmpty] = useState(false);
  const [cityName, setCityName] = useState(data?.cityName || '');
  const [countryCode, setCountryCode] = useState(data?.countryCode || '');
  const [country, setCountry] = useState(data?.country || '');
  const [coordinates, setCoordinates] = useState({ lat: data?.coordinates.lat || 0, lon: data?.coordinates.lon || 0 });
  
  const getCityGeocoding = async () => {
    setValidateEmpty(false);
    
    if (cityName === '' || countryCode === '') {
      ErrorSnackbar('City name and country code are required', '', enqueue, dequeue);
      setValidateEmpty(true);
      return;
    }

    const URL = import.meta.env.VITE_GEO_API_URL + `?name=${cityName}&countryCode=${countryCode}&count=10&language=en&format=json`;
    try {
      const response = await fetch(URL);
      await throwOnAPIError('Get city information', response);
      const data = await response.json();

      if (!data?.results?.length) {
        throw new Error('No city found matching specified paramenters.');
      }

      setCountry(data.results[0].country);
      setCoordinates({ lat: data.results[0].latitude, lon: data.results[0].longitude });
    } catch (error) {
      const parsed = unknownToError('Get city information', error);
      ErrorSnackbar("Failed to get city information", parsed.error.message, enqueue, dequeue);
    }
  };

  return (
    <Block as="form" onSubmit={(e: FormEvent<HTMLFormElement>) => action(e, { cityName, countryCode, country, coordinates })}>
      <FormControl label="City Name">
        <Input 
          id="cityName" 
          type="text" 
          name="cityName" 
          placeholder="City Name" 
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required 
          error={cityName === '' && validateEmpty}
        />
      </FormControl>

      <FormControl label="Country Code">
        <Input 
          id="countryCode" 
          type="text" 
          name="countryCode" 
          placeholder="Country Code" 
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required 
          error={countryCode === '' && validateEmpty}
        />
      </FormControl>

      {/* ADD FEATURE TO AUTO COMPLETE FORM BASED ON CITY AND COUNTRY CODE */}
      <Block display="flex" alignItems="center" gridGap="1rem">
        <Button size={SIZE.compact} kind="primary" startEnhancer={() => <MdAutoFixHigh />} type="button" onClick={getCityGeocoding}>Auto Complete</Button>
        <FaLevelDownAlt rotate={90} />
      </Block>

      <FormControl label="Country">
        <Input 
          id="country" 
          type="text" 
          name="country" 
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required 
        />
      </FormControl>

      <FormControl label="Latitude">
        <Input 
          id="latitude" 
          type="number" 
          name="lat" 
          placeholder="Latitude" 
          value={coordinates.lat}
          onChange={(e) => setCoordinates({ ...coordinates, lat: Number(e.target.value) })}
          required 
        />
      </FormControl>

      <FormControl label="Longitude">
        <Input 
          id="longitude" 
          type="number" 
          name="lon" 
          placeholder="Longitude" 
          value={coordinates.lon}
          onChange={(e) => setCoordinates({ ...coordinates, lon: Number(e.target.value) })}
          required 
        />
      </FormControl>

      <Button type="submit">Save</Button>
    </Block>
  )
}

export default CityForm;