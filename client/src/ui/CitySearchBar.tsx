import React from 'react';
import { useStyletron } from 'baseui';
import { Combobox } from 'baseui/combobox';
import { City } from '../types';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { Block } from 'baseui/block';
import { useLocation, useNavigate } from 'react-router';
import { cityURL } from '../services/url';

interface OptionT {
  label: string;
  id: string;
}

const cityOptions = (cities: City[]) => {
  const cityOptions = cities.map((city) => ({
    label: `${city.cityName}, ${city.country}`,
    id: cityURL(city),
  }))

  return cityOptions;
};

const mapOptionToString = (option: OptionT) => {
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
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToCity = () => {
    const cityOption = cityOptions(cities).find(city => city.label === value);
    if (!cityOption) return;

    navigate(cityOption.id);
  }

  const filteredOptions = React.useMemo(() => {
    return cityOptions(cities).filter((cityOption) => {
      const optionAsString = mapOptionToString(cityOption);
      return optionAsString.toLowerCase().includes(value.toLowerCase());
    });
  }, [cities, value]);

  useEffect(() => {
    setValue('');
  }, [location]);

  return (
    <Block width={["80vw", "80vw", "50vw", "50vw"]} height={["6vh", "6vh", "6vh", "6vh"]}>
      <Combobox
        value={value}
        onChange={setValue}
        mapOptionToString={mapOptionToString}
        mapOptionToNode={ReplacementNode}
        options={filteredOptions}
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