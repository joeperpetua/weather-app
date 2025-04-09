import React from 'react';
import { useStyletron } from 'baseui';
import { Combobox } from 'baseui/combobox';
import { City } from '../types';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { Block } from 'baseui/block';
import { useLocation, useNavigate } from 'react-router';
import { cityURL } from '../encode';

interface OptionT {
  label: string;
  id: string;
}

const cityOptions = (cities: City[]): OptionT[] => {
  const cityOptions = cities.map((city) => ({
    label: `${city.cityName}, ${city.country}`,
    id: cityURL(city),
  }))

  return cityOptions;
};

function mapOptionToString(option: OptionT): string {
  return option.label;
}

const ReplacementNode = ({ option }: { option: OptionT }) => {
  const [css] = useStyletron();
  const navigate = useNavigate();

  return (
    <Block height="100%" width={"100%"} display="flex" alignItems="center" className={css({ cursor: 'pointer' })}
      onClick={() => navigate(option.id)}
    >
      {option.label}
    </Block>
  );
}

interface CitySearchBarProps {
  cities: City[];
}

const CitySearchBar: React.FC<CitySearchBarProps> = ({ cities }) => {
  const [css, theme] = useStyletron();
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<OptionT[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToCity = () => {
    const cityOption = cityOptions(cities).find(city => city.label === value);
    if (!cityOption) return;

    navigate(cityOption.id);
  }

  function cityLookup(searchTerm: string) {
    setTimeout(() => {
      const options = cityOptions(cities).filter((option) => {
        const optionAsString = mapOptionToString(option);
        return optionAsString.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setOptions(options);
    }, 500);
  }

  async function handleChange(nextValue: string) {
    setValue(nextValue);
    cityLookup(nextValue);
  }

  useEffect(() => {
    setValue('');
  }, [location]);

  return (
    <Block width={["80vw", "80vw", "50vw", "50vw"]} height={["6vh", "6vh", "7vh", "7vh"]}>
      <Combobox
        value={value}
        onChange={handleChange}
        mapOptionToString={mapOptionToString}
        mapOptionToNode={ReplacementNode}
        options={options}
        name="search-cities"
        onSubmit={navigateToCity}
        overrides={{
          Root: {
            style: () => ({
              width: "100%",
              height: "100%"
            })
          },
          InputContainer: {
            style: () => ({
              width: "100%",
              height: "100%"
            })
          },
          Input: {
            props: {
              placeholder: 'Search for a city',
              endEnhancer: () => {
                return (
                  <Block height="100%" display="flex" alignItems="center" className={css({ cursor: 'pointer' })}>
                    <MdSearch size={24} onClick={navigateToCity} />
                  </Block>
                );
              },
              overrides: {
                Root: {
                  style: () => ({
                    borderRadius: "0rem",
                    outline: `${theme.colors.primaryA} solid`,
                    border: `none`,
                    height: "100%",
                  })
                },
                Input: {
                  style: () => ({
                    paddingTop: '.85rem',
                    outline: 'white',
                    fontSize: '1.25rem'
                  })
                },
              }
            }
          }
        }}
      />
    </Block>
  );
}

export default CitySearchBar;