import { Block } from "baseui/block"
import { Button, SIZE } from "baseui/button"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"
import { City, GeocodingData } from "../../types"
import { FormEvent, useState } from "react"
import { MdAutoFixHigh } from "react-icons/md";
import { FaLevelDownAlt } from "react-icons/fa"
import { throwOnAPIError, unknownToError } from "../../error"
import ErrorSnackbar from "../Snackbar/Error"
import { useSnackbar } from "baseui/snackbar"

interface CityFormProps {
  data?: City;
  action: (e: React.FormEvent<HTMLFormElement>,city: City) => void;
}

const CityForm: React.FC<CityFormProps> = ({ data, action }) => {
  const { enqueue, dequeue } = useSnackbar();
  const [validateEmpty, setValidateEmpty] = useState(false);
  const [cityName, setCityName] = useState(data?.cityName || '');
  const [countryCode, setCountryCode] = useState(data?.countryCode || '');
  const [adminZone1, setAdminZone1] = useState(data?.adminZone1 || '');
  const [adminZone2, setAdminZone2] = useState(data?.adminZone2 || '');
  const [country, setCountry] = useState(data?.country || '');
  const [coordinates, setCoordinates] = useState({ lat: data?.coordinates.lat || 0, lon: data?.coordinates.lon || 0 });
  const [timezone, setTimezone] = useState(data?.timezone || '');
  
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
      const data = await response.json() as { results: GeocodingData[] };

      if (!data?.results?.length) {
        throw new Error('No city found matching specified paramenters.');
      }

      // Override results[0] if adminZone1 is specified and matches an object in the search result
      // Default to first result if no match
      if (data.results.length > 1 && adminZone1 != '') {
        const match = data.results.find((result) => result.admin1 === adminZone1);

        if (match) {
          data.results = [match];
        }
      }

      // Also set city name to match special characters
      setCityName(data.results[0].name);
      setCountry(data.results[0].country);
      setCoordinates({ lat: data.results[0].latitude, lon: data.results[0].longitude });
      setAdminZone1(data.results[0].admin1);
      setAdminZone2(data.results[0].admin2 || '');
      setTimezone(data.results[0].timezone);
    } catch (error) {
      const parsed = unknownToError('Get city information', error);
      ErrorSnackbar("Failed to get city information", parsed.error.message, enqueue, dequeue);
    }
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    action(e, {
      cityName, 
      countryCode, 
      country, 
      coordinates, 
      adminZone1, 
      adminZone2, 
      timezone 
    });
  };

  return (
    <Block as="form" onSubmit={submitForm}>
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

      <FormControl label="Admin Zone 1">
        <Input 
          id="adminZone1" 
          type="text" 
          name="adminZone1" 
          placeholder="Administration Zone 1" 
          value={adminZone1}
          onChange={(e) => setAdminZone1(e.target.value)} 
        />
      </FormControl>

      {/* ADD FEATURE TO AUTO COMPLETE FORM BASED ON CITY AND COUNTRY CODE */}
      <Block display="flex" alignItems="center" gridGap="1rem">
        <Button size={SIZE.compact} kind="primary" startEnhancer={() => <MdAutoFixHigh />} type="button" onClick={getCityGeocoding}>Auto Complete</Button>
        <FaLevelDownAlt rotate={90} />
      </Block>

      <FormControl label="Admin Zone 2">
        <Input 
          id="adminZone2" 
          type="text" 
          name="adminZone2" 
          placeholder="Administration Zone 2" 
          value={adminZone2}
          onChange={(e) => setAdminZone2(e.target.value)} 
        />
      </FormControl>

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

      <FormControl label="Timezone">
        <Input 
          id="timezone" 
          type="text" 
          name="timezone" 
          placeholder="Timezone" 
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          required 
        />
      </FormControl>

      <Button type="submit">Save</Button>
    </Block>
  )
}

export default CityForm;