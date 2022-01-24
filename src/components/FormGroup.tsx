import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { AutoComplete } from 'primereact/autocomplete';
import { useState } from 'react';
import useStore from '../store';
import { uuidv4, store, mapArea, submitCallback } from '../helpers/';
import { Area, ListOption, Size } from '../types/types';

export default function FormGroup(props: {
  formState: boolean | undefined;
  setFormState: (arg0: boolean) => void;
  editData: any;
  setEditData: (arg0: any) => void;
  toast: any;
}) {
  const area = useStore((state) => state.options.area),
    mappedProvice = mapArea(area as Area[], 'province'),
    sizeOption = useStore((state) => state.options.size),
    dispatchData = useStore((state) => state.dispatchData),
    [filteredProvince, setFilteredProvince] = useState<Array<ListOption> | []>(
      []
    ),
    [filteredCity, setFilteredCity] = useState<Array<ListOption> | []>([]),
    [filteredSize, setFilteredSize] = useState<Array<Size> | []>([]),
    [commodity, setCommodity] = useState(''),
    [province, setProvince] = useState<ListOption | string>(''),
    [city, setCity] = useState<ListOption | string>(''),
    [size, setSize] = useState<Size | string>(''),
    [price, setPrice] = useState<number | null>(0),
    [validator, setValidator] = useState({
      komoditas: false,
      area_provinsi: false,
      area_kota: false,
      size: false,
      price: false,
    }),
    closeFunction = () => {
      setCommodity('');
      setProvince('');
      setCity('');
      setSize('');
      setPrice(0);
      setValidator({
        komoditas: false,
        area_provinsi: false,
        area_kota: false,
        size: false,
        price: false,
      });
      props.setFormState(false);
      props.setEditData(null);
    },
    argsSumbitCallback = {
      commodity,
      province,
      city,
      size,
      price,
      toast: props.toast,
      dispatchData,
      closeFunction,
      setValidator,
    },
    submitFunction = submitCallback({
      ...argsSumbitCallback,
      type: 'append',
    }),
    editFunction = submitCallback({
      ...argsSumbitCallback,
      type: 'edit',
      oldData: props.editData,
    }),
    searchProvince = (event: { query: string }) => {
      setTimeout(() => {
        let _filteredProvince;
        if (!event.query.trim().length) {
          _filteredProvince = [...mappedProvice];
        } else {
          _filteredProvince = mappedProvice?.filter(
            (prov: { value: string; label: string }) => {
              return prov.value
                .toLowerCase()
                .startsWith(event.query.toLowerCase());
            }
          );
        }

        setFilteredProvince(_filteredProvince);
      }, 250);
    },
    searchCity = (event: { query: string }) => {
      setTimeout(() => {
        let selectedProvince = province as ListOption;
        const list = area?.filter(
          ({ province: prov }) => prov === selectedProvince.value
        );
        const mappedCity = mapArea(list as Area[], 'city');
        let _filteredCity;
        if (!event.query.trim().length) {
          _filteredCity = [...mappedCity];
        } else {
          _filteredCity = mappedCity.filter((ct) => {
            return ct.value.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }

        setFilteredCity(_filteredCity);
      }, 250);
    },
    searchSize = (event: { query: string }) => {
      setTimeout(() => {
        let _filteredSize;
        if (!event.query.trim().length) {
          _filteredSize = [...(sizeOption as Size[])];
        } else {
          _filteredSize = sizeOption?.filter((s) => {
            return s.size.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        if (_filteredSize) setFilteredSize(_filteredSize);
      }, 250);
    },
    onFromShow = () => {
      if (props.editData) {
        setCommodity(props.editData.komoditas);
        setProvince(props.editData.area_provinsi);
        setCity(props.editData.area_kota);
        setSize(props.editData.size);
        setPrice(props.editData.price);
      }
    };

  const renderFooter = () => {
    return props.editData ? (
      <div>
        <Button
          label="Batalkan"
          icon="pi pi-times"
          onClick={closeFunction}
          className="p-button-text"
        />
        <Button
          label="Perbarui"
          icon="pi pi-check"
          onClick={editFunction}
          autoFocus
        />
      </div>
    ) : (
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
      header={
        props.editData
          ? `Ubah Data ${props.editData.komoditas} di ${props.editData.area_kota}`
          : 'Tambah Data'
      }
      visible={props.formState}
      className="crud-dialog"
      contentClassName="crud-form"
      onHide={closeFunction}
      footer={renderFooter}
      dismissableMask
      closeOnEscape
      onShow={onFromShow}
    >
      <form action="" className="form-main">
        <div>
          <span className="p-float-label">
            <InputText
              id="com"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className={validator.komoditas && !commodity ? 'p-invalid' : ''}
            />
            <label htmlFor="com">Komoditas</label>
          </span>
          <small
            style={{
              display: validator.komoditas && !commodity ? 'block' : 'none',
              marginLeft: '.2rem',
              marginTop: '.1rem',
              fontSize: '12px',
            }}
            className="p-error block"
          >
            Komoditas tidak boleh kosong
          </small>
        </div>
        <div>
          <span className="p-float-label">
            <AutoComplete
              dropdown
              value={province}
              field="value"
              suggestions={filteredProvince}
              completeMethod={searchProvince}
              onChange={(e) => setProvince(e.value)}
              forceSelection
              style={{ width: '100%' }}
              className={
                validator.area_provinsi && !province ? 'p-invalid' : ''
              }
            />
            <label htmlFor="province">Area Provinsi</label>
          </span>
          <small
            style={{
              display: validator.area_provinsi && !province ? 'block' : 'none',
              marginLeft: '.2rem',
              marginTop: '.1rem',
              fontSize: '12px',
            }}
            className="p-error block"
          >
            Provinsi tidak boleh kosong
          </small>
        </div>
        <div>
          <span className="p-float-label">
            <AutoComplete
              dropdown
              value={city}
              field="value"
              suggestions={filteredCity}
              completeMethod={searchCity}
              onChange={(e) => setCity(e.value)}
              forceSelection
              style={{ width: '100%' }}
              disabled={province ? false : true}
              className={validator.area_kota && !city ? 'p-invalid' : ''}
            />
            <label htmlFor="city">
              Area Kota{!province && ' (pilih provinsi dulu)'}
            </label>
          </span>
          <small
            style={{
              display: validator.area_kota && !city ? 'block' : 'none',
              marginLeft: '.2rem',
              marginTop: '.1rem',
              fontSize: '12px',
            }}
            className="p-error block"
          >
            Kota tidak boleh kosong
          </small>
        </div>
        <div className="sub-form">
          <div>
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
                className={validator.size && !size ? 'p-invalid' : ''}
              />
              <label htmlFor="size">Ukuran</label>
            </span>
            <small
              style={{
                display: validator.size && !size ? 'block' : 'none',
                marginLeft: '.2rem',
                marginTop: '.1rem',
                fontSize: '12px',
              }}
              className="p-error block"
            >
              Ukuran tidak boleh kosong
            </small>
          </div>
          <div>
            <span className="p-float-label">
              <InputNumber
                value={price}
                onValueChange={(e) => setPrice(e.value)}
                mode="currency"
                currency="IDR"
                locale="id-ID"
                style={{ width: '100%' }}
                className={validator.price && !price ? 'p-invalid' : ''}
              />
              <label htmlFor="price">Harga</label>
            </span>
            <small
              style={{
                display: validator.price && !price ? 'block' : 'none',
                marginLeft: '.2rem',
                marginTop: '.1rem',
                fontSize: '12px',
              }}
              className="p-error block"
            >
              Harga tidak boleh kosong
            </small>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
