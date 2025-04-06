import { useStyletron } from "baseui";
import {
  StatefulDataTable,
  NumericalColumn,
  StringColumn,
  Row,
  RowAction,
} from "baseui/data-table";
import { City, CityRowData } from "../../types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router";

const columns = [
  NumericalColumn({
    title: "ID",
    mapDataToValue: (data: CityRowData) => data[0],
  }),
  StringColumn({
    title: "City",
    mapDataToValue: (data: CityRowData) => data[1],
  }),
  StringColumn({
    title: "Country",
    mapDataToValue: (data: CityRowData) => data[2],
  }),
  StringColumn({
    title: "Country Name",
    mapDataToValue: (data: CityRowData) => data[3],
  }),
  NumericalColumn({
    title: "Latitude",
    mapDataToValue: (data: CityRowData) => data[4],
  }),
  NumericalColumn({
    title: "Longitude",
    mapDataToValue: (data: CityRowData) => data[5],
  }),
];

const genRows = (data: City[]) => {
  const rows: Row[] = [];

  data.forEach((city, index) => {
    rows.push({
      id: index,
      data: [
        city.id,
        city.cityName,
        city.country,
        city.countryCode,
        city.coordinates.lat,
        city.coordinates.lon
      ]
    });
  });

  return rows;
}

const dummyData: City[] = [
  {
    "cityName": "Vienna",
    "coordinates": {
      "lat": 48.210033,
      "lon": 16.363449
    },
    "country": "Austria",
    "countryCode": "AT",
    "id": 1
  },
  {
    "cityName": "Paris",
    "coordinates": {
      "lat": 48.856613,
      "lon": 2.352222
    },
    "country": "France",
    "countryCode": "FR",
    "id": 2
  },
  {
    "cityName": "New York",
    "coordinates": {
      "lat": 40.712776,
      "lon": -74.005974
    },
    "country": "USA",
    "countryCode": "US",
    "id": 3
  },
  {
    "cityName": "Tokyo",
    "coordinates": {
      "lat": 35.689487,
      "lon": 139.691711
    },
    "country": "Japan",
    "countryCode": "JP",
    "id": 4
  },
  {
    "cityName": "Sydney",
    "coordinates": {
      "lat": -33.868820,
      "lon": 151.209290
    },
    "country": "Australia",
    "countryCode": "AU",
    "id": 5
  },
  {
    "cityName": "Cairo",
    "coordinates": {
      "lat": 30.044420,
      "lon": 31.235712
    },
    "country": "Egypt",
    "countryCode": "EG",
    "id": 6
  },
  {
    "cityName": "Rio de Janeiro",
    "coordinates": {
      "lat": -22.906847,
      "lon": -43.172897
    },
    "country": "Brazil",
    "countryCode": "BR",
    "id": 7
  },
  {
    "cityName": "Moscow",
    "coordinates": {
      "lat": 55.755825,
      "lon": 37.617298
    },
    "country": "Russia",
    "countryCode": "RU",
    "id": 8
  },
  {
    "cityName": "Beijing",
    "coordinates": {
      "lat": 39.904202,
      "lon": 116.407394
    },
    "country": "China",
    "countryCode": "CN",
    "id": 9
  },
  {
    "cityName": "Cape Town",
    "coordinates": {
      "lat": -33.924870,
      "lon": 18.424055
    },
    "country": "South Africa",
    "countryCode": "ZA",
    "id": 10
  }
];



export default function CityTable() {
  const [css] = useStyletron();
  const navigate = useNavigate();

  const editEntry = (row: Row) => {
    navigate(`/dashboard/edit/${row.data[0]}`);
  };

  const rows = genRows(dummyData);
  const rowActions: RowAction[] = [
    {
      label: "Edit",
      onClick: ({ row }: { row: Row }) => editEntry(row),
      renderIcon: () => <MdModeEdit />
    },
    {
      label: "Delete",
      onClick: ({ row }: { row: Row }) => {
        console.log('delete', row);
      },
      renderIcon: () => <MdDelete />
    },
  ];

  return (
    <div className={css({ height: "100%" })}>
      <StatefulDataTable columns={columns} rows={rows} rowActions={rowActions} />
    </div>
  );
}