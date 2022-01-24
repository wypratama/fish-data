import { useState } from 'react';
import useStore from '../store';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import {
  filterDropDown,
  tableHeader,
  actionColumn,
  filterDate,
  filterNumber,
} from '../elements';
import { store, toCurrency, convertDate } from '../helpers/';
import { Commodity } from '../types/types';

export default function Table(props: {
  formState: boolean;
  setFormState: any;
  setEditData: any;
  toast: any;
}) {
  const [globalFilter, setGlobalFilter] = useState(null), //form filter state
    //data from store
    data = useStore((state) => state.data),
    area = useStore((state) => state.options.area),
    sizeList = useStore((state) => state.options.size),
    //action from store
    dispatchData = useStore((state) => state.dispatchData),
    //filter settings
    filters = {
      komoditas: {
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      area_provinsi: { value: '', matchMode: FilterMatchMode.CONTAINS },
      area_kota: { value: '', matchMode: FilterMatchMode.CONTAINS },
      size: { value: '', matchMode: FilterMatchMode.EQUALS },
      price: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      tgl_parsed: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    },
    //mapping filter data
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
    mappedSize = sizeList
      ? sizeList.map(({ size }) => ({
          label: size,
          value: size,
        }))
      : [],
    //mapping elements
    filterProvince = filterDropDown(mappedProvice, 'Provinsi'),
    filterCity = filterDropDown(mappedCity, 'Kota'),
    filterSize = filterDropDown(mappedSize, 'Ukuran'),
    header = tableHeader(setGlobalFilter, props.formState, props.setFormState),
    priceTemplate = (rowData: Commodity) => {
      return toCurrency(rowData.price as string);
    },
    //CRUD functions
    editProduct = (rowData: Commodity) => {
      props.setFormState(true);
      props.setEditData(rowData);
    },
    confirmDeleteProduct = async (rowData: Commodity) => {
      const searchKey: any = {};
      let key: keyof Commodity;
      for (key in rowData) {
        if (rowData[key]) {
          searchKey[key] = rowData[key];
        }
      }
      const res = await store.delete('list', {
        search: searchKey,
        limit: 1,
      });
      dispatchData();
      props.toast.current.show({
        severity: 'success',
        summary: 'Berhasil Menghapus!',
        detail: `${res.clearedRowsCount} data terhapus`,
      });
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
      filters={filters as any}
      filterDisplay="menu"
      globalFilter={globalFilter}
      emptyMessage="Tidak ada data untuk ditampilkan"
      rowHover
    >
      <Column
        field="komoditas"
        header="Komoditas"
        sortable
        filter
        filterPlaceholder="Cari Komoditas"
      ></Column>
      <Column
        field="area_provinsi"
        header="Area Provinsi"
        sortable
        filter
        filterElement={filterProvince}
        filterPlaceholder="Pilih Provinsi"
        showFilterMatchModes={false}
      ></Column>
      <Column
        field="area_kota"
        header="Area Kota"
        sortable
        filter
        filterElement={filterCity}
        showFilterMatchModes={false}
      ></Column>
      <Column
        field="size"
        header="Ukuran"
        sortable
        filter
        filterElement={filterSize}
        showFilterMatchModes={false}
        dataType="numeric"
        bodyStyle={{ textAlign: 'right' }}
      ></Column>
      <Column
        field="price"
        header="Harga"
        body={priceTemplate}
        bodyStyle={{ textAlign: 'right' }}
        sortable
        filter
        filterElement={filterNumber}
        showFilterOperator={false}
        showAddButton={false}
        dataType="numeric"
      ></Column>
      <Column
        field="tgl_parsed"
        header="Tanggal"
        dataType="date"
        filter
        filterField="tgl_parsed"
        showFilterOperator={false}
        showAddButton={false}
        filterElement={filterDate}
        body={(d) => {
          return d.tgl_parsed ? (
            convertDate(d.tgl_parsed)
          ) : (
            <span style={{ fontStyle: 'italic' }}>kosong</span>
          );
        }}
        sortable
      ></Column>
      <Column
        body={optionColumn}
        exportable={false}
        style={{ minWidth: '8rem' }}
      ></Column>
    </DataTable>
  );
}
