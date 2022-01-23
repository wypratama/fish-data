import { useState } from 'react';
import useStore, { Commodity } from '../store';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { filterDropDown, tableHeader, actionColumn } from '../elements';

export default function Table(props: {
  formState: boolean;
  setFormState: any;
  setEditData: any;
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
    header = tableHeader(setGlobalFilter, props.formState, props.setFormState),
    editProduct = (rowData: Commodity) => {
      // console.log(rowData);
      props.setFormState(true);
      props.setEditData(rowData);
    },
    confirmDeleteProduct = (rowData: Commodity) => {
      console.log(rowData);
    },
    optionColumn = actionColumn(editProduct, confirmDeleteProduct);

  return (
    <DataTable
      value={data?.filter((val) => val.komoditas !== null)}
      header={header}
      responsiveLayout="scroll"
      stripedRows
      paginator
      rows={10}
      sortMode="multiple"
      showGridlines
      filters={filters}
      filterDisplay="menu"
      globalFilter={globalFilter}
      emptyMessage="Tidak ada data untuk ditampilkan"
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
      <Column field="size" header="Ukuran" sortable filter></Column>
      <Column field="price" header="Harga" sortable filter></Column>
      <Column
        field="timestamp"
        header="Tanggal"
        bodyStyle={{ fontSize: '12px' }}
      ></Column>
      <Column
        body={optionColumn}
        exportable={false}
        style={{ minWidth: '8rem' }}
      ></Column>
    </DataTable>
  );
}
