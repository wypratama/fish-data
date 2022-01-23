import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../assets/styles/table-header.scss';
import { MouseEventHandler } from 'react';

export default (
  cb: (arg0: any) => void,
  formState: boolean,
  formToggle: (
    arg0: boolean
  ) => MouseEventHandler<HTMLButtonElement> | undefined
) => {
  return (
    <div className="table-header">
      <Button label="Tambah Baru" onClick={() => formToggle(true)} />
      <h5 className="mx-0 my-1">TABEL HARGA IKAN</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => cb(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
};
