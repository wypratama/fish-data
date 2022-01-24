import { Button } from 'primereact/button';
import { confirmPopup } from 'primereact/confirmpopup';
import { Commodity } from '../types/types';

export default (
  editProduct: (val: Commodity) => void,
  confirmDeleteProduct: (val: Commodity) => void
) => {
  return (rowData: Commodity) => {
    const confirm = (event: { currentTarget: any }) => {
      confirmPopup({
        target: event.currentTarget,
        message: 'Yakin mau dihapus?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => confirmDeleteProduct(rowData),
        // reject: () => rejectFunc(),
      });
    };
    return (
      <div className="action-column">
        <Button
          icon="pi pi-pencil"
          className="p-button-sm mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={confirm}
        />
      </div>
    );
  };
};
