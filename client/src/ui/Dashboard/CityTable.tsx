import {
  StatefulDataTable,
  NumericalColumn,
  StringColumn,
  Row,
  RowAction,
} from "baseui/data-table";
import { City, CityRowData } from "../../types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Block } from "baseui/block";

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
    precision: 5,
    mapDataToValue: (data: CityRowData) => data[4],
  }),
  NumericalColumn({
    title: "Longitude",
    precision: 5,
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

interface CityTableProps {
  editHandler: (id: number) => void;
  deleteHandler: (id: number) => void;
};

const CityTable: React.FC<CityTableProps> = ({ editHandler, deleteHandler }) => {
  const {cities, loading} = useSelector((state: RootState) => state.cities);

  let rows: Row[] = cities ? genRows(cities) : [];

  const rowActions: RowAction[] = [
    {
      label: "Edit city",
      onClick: ({ row }: { row: Row }) => editHandler(row.data[0]),
      renderIcon: () => <MdModeEdit />
    },
    {
      label: "Delete city",
      onClick: ({ row }: { row: Row }) => deleteHandler(row.data[0]),
      renderIcon: () => <MdDelete />
    },
  ];

  return (
    <Block height="100%">
      <StatefulDataTable 
        columns={columns} 
        rows={rows} 
        rowActions={rowActions} 
        loading={loading}
        loadingMessage="Fetching cities..."
        emptyMessage={"No data available."}
      />
    </Block>
  );
}

export default CityTable;