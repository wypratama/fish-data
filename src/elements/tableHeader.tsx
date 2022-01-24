import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../assets/styles/table-header.scss';
import { MouseEventHandler, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { OverlayPanel } from 'primereact/overlaypanel';

export default (
  cb: (arg0: any) => void,
  searchState: string | null,
  formToggle: (
    arg0: boolean
  ) => MouseEventHandler<HTMLButtonElement> | undefined
) => {
  const isMobile = useMediaQuery({ query: '(max-width: 540px)' }),
    op = useRef<OverlayPanel>(null);
  return (
    <div className="table-header">
      <Button
        label={isMobile ? undefined : 'Tambah Baru'}
        icon="pi pi-plus"
        onClick={() => formToggle(true)}
      />
      <h5 className="mx-0 my-1">TABEL HARGA IKAN</h5>
      {isMobile ? (
        <Button
          label={isMobile ? undefined : 'Tambah Baru'}
          icon="pi pi-search"
          className="p-button-secondary"
          onClick={(e) => op!.current!.toggle(e)}
        />
      ) : (
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => cb(e.currentTarget.value)}
            placeholder="Search..."
          />
        </span>
      )}
      <OverlayPanel ref={op}>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={searchState || ''}
            onInput={(e) => cb(e.currentTarget.value)}
            placeholder="Search..."
          />
        </span>
      </OverlayPanel>
    </div>
  );
};
