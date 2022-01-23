import { Button } from 'primereact/button';
import { Commodity } from '../store';

export default (
  editProduct: (val: Commodity) => void,
  confirmDeleteProduct: (val: Commodity) => void
) => {
  return (rowData: Commodity) => {
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
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };
};
