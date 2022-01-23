import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { AutoComplete } from 'primereact/autocomplete';
import { useState } from 'react';
import useStore, { Province } from '../store';
import { uuidv4, store } from '../helpers/';

export default function FormGroup(props: {
  formState: boolean | undefined;
  setFormState: (arg0: boolean) => void;
}) {
  const provinceList = useStore((state) => state.province),
    sizeOption = useStore((state) => state.options.size),
    dispatchData = useStore((state) => state.dispatchData),
    [filteredProvince, setFilteredProvince] = useState<Province[] | []>([]),
    [filteredCity, setFilteredCity] = useState<Array<{
      id: number;
      id_provinsi: string;
      nama: string;
    }> | null>(null),
    [filteredSize, setFilteredSize] = useState(null),
    [commodity, setCommodity] = useState(''),
    [province, setProvince] = useState<Province | string>(''),
    [city, setCity] = useState<
      | Array<{
          id: number;
          id_provinsi: string;
          nama: string;
        }>
      | string
    >(''),
    [size, setSize] = useState<{ size: string } | string>(''),
    [price, setPrice] = useState<number | null>(0),
    closeFunction = () => {
      setCommodity('');
      setProvince('');
      setCity('');
      setSize('');
      setPrice(0);
      props.setFormState(false);
    },
    submitFunction = async () => {
      const data = { commodity, province, city, size, price };
      const date = new Date(),
        stamp = Date.now(),
        uuid = uuidv4();
      const res = await store.append('list', [
        {
          komoditas: commodity,
          area_provinsi: province.nama.toUpperCase(),
          area_kota: city.nama.toUpperCase(),
          size: size.size,
          price: price?.toString(),
          tgl_parsed: date,
          timestamp: stamp.toString(),
          uuid: uuid,
        },
      ]);
      dispatchData();
      closeFunction();
    },
    searchProvince = (event: { query: string }) => {
      setTimeout(() => {
        let _filteredProvince;
        if (!event.query.trim().length) {
          _filteredProvince = [...provinceList];
        } else {
          _filteredProvince = provinceList?.filter((prov) => {
            return prov.nama
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        setFilteredProvince(_filteredProvince);
      }, 250);
    },
    searchCity = async (event: { query: string }) => {
      const res = await fetch(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${province.id}`
      );
      const { kota_kabupaten } = await res.json();
      let _filteredCity;
      if (!event.query.trim().length) {
        _filteredCity = [...kota_kabupaten];
      } else {
        _filteredCity = kota_kabupaten.filter((ct) => {
          return ct.nama.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredCity(_filteredCity);
    },
    searchSize = (event: { query: string }) => {
      setTimeout(() => {
        let _filteredProvince;
        if (!event.query.trim().length) {
          _filteredProvince = [...sizeOption];
        } else {
          _filteredProvince = sizeOption?.filter((s) => {
            return s.size.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }

        setFilteredSize(_filteredProvince);
      }, 250);
    };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Batalkan"
          icon="pi pi-times"
          onClick={closeFunction}
          className="p-button-text"
        />
        <Button
          label="Tambah"
          icon="pi pi-check"
          onClick={submitFunction}
          autoFocus
        />
      </div>
    );
  };

  return (
    <Dialog
      header="Tambah Data"
      visible={props.formState}
      className="crud-dialog"
      contentClassName="crud-form"
      onHide={closeFunction}
      footer={renderFooter}
    >
      <form action="" className="form-main">
        <div>
          <span className="p-float-label">
            <InputText
              id="com"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
            />
            <label htmlFor="com">Komoditas</label>
          </span>
          <small style={{ display: 'none' }} className="p-error block">
            Error
          </small>
        </div>
        <span className="p-float-label">
          <AutoComplete
            dropdown
            value={province}
            field="nama"
            suggestions={filteredProvince}
            completeMethod={searchProvince}
            onChange={(e) => setProvince(e.value)}
            forceSelection
            style={{ width: '100%' }}
          />
          <label htmlFor="province">Area Provinsi</label>
        </span>
        <span className="p-float-label">
          <AutoComplete
            dropdown
            value={city}
            field="nama"
            suggestions={filteredCity}
            completeMethod={searchCity}
            onChange={(e) => setCity(e.value)}
            forceSelection
            style={{ width: '100%' }}
            disabled={province ? false : true}
          />
          <label htmlFor="city">
            Area Kota{!province && ' (pilih provinsi dulu)'}
          </label>
        </span>
        <div className="sub-form">
          <span className="p-float-label">
            <AutoComplete
              dropdown
              value={size}
              field="size"
              suggestions={filteredSize}
              completeMethod={searchSize}
              onChange={(e) => setSize(e.value)}
              forceSelection
              style={{ width: '100%' }}
            />
            <label htmlFor="size">Ukuran</label>
          </span>
          <span className="p-float-label">
            <InputNumber
              value={price}
              onValueChange={(e) => setPrice(e.value)}
              mode="currency"
              currency="IDR"
              locale="id-ID"
              style={{ width: '100%' }}
            />
            <label htmlFor="price">Harga</label>
          </span>
        </div>
      </form>
    </Dialog>
  );
}
