import { Button } from 'primereact/button';
import { Commodity } from '../store';
import { confirmPopup } from 'primereact/confirmpopup';

export default (
  editProduct: (val: Commodity) => void,
  confirmDeleteProduct: (val: Commodity) => void
) => {
  return (rowData: Commodity) => {
    const confirm = (event) => {
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
          className="p-button-sm p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-warning"
          onClick={confirm}
        />
      </div>
    );
  };
};
