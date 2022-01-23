import { useState } from 'react';
import useStore from '../store';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { filterDropDown, tableHeader } from '../elements';

export default function Table(props: {
  formState: boolean;
  setFormState: any;
}) {
  const [globalFilter, setGlobalFilter] = useState(null),
    data = useStore((state) => state.data),
    area = useStore((state) => state.options.area),
    filters = {
      komoditas: { value: '', matchMode: FilterMatchMode.STARTS_WITH },
      area_provinsi: { value: '', matchMode: FilterMatchMode.STARTS_WITH },
      area_kota: { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    },
    mappedProvice = area
      ? area
          .map(({ province }) => ({
            label: province,
            value: province,
          }))
          .filter(
            (value, index, self) =>
              index ===
              self.findIndex((t) => t.label === value.label && t.label)
          )
      : [],
    mappedCity = area
      ? area
          .map(({ city }) => ({
            label: city,
            value: city,
          }))
          .filter(
            (value, index, self) =>
              index ===
              self.findIndex((t) => t.label === value.label && t.label)
          )
      : [],
    filterProvince = filterDropDown(mappedProvice),
    filterCity = filterDropDown(mappedCity),
    header = tableHeader(setGlobalFilter, props.formState, props.setFormState);

  return (
    <DataTable
      value={data?.filter((val) => val.komoditas !== null)}
      header={header}
      responsiveLayout="stack"
      breakpoint="1180px"
      stripedRows
      paginator
      rows={10}
      sortMode="multiple"
      showGridlines
      filters={filters}
      filterDisplay="row"
      globalFilter={globalFilter}
    >
      <Column field="komoditas" header="Komoditas" sortable filter></Column>
      <Column
        field="area_provinsi"
        header="Area Provinsi"
        sortable
        filter
        filterElement={filterProvince}
      ></Column>
      <Column
        field="area_kota"
        header="Area Kota"
        sortable
        filter
        filterElement={filterCity}
      ></Column>
      <Column field="size" header="size" sortable filter></Column>
      <Column field="price" header="Harga" sortable filter></Column>
      <Column
        field="uuid"
        header="uuid"
        bodyStyle={{ fontSize: '12px' }}
      ></Column>
    </DataTable>
  );
}
