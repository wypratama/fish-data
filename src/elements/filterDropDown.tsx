import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';

const onStatusChange = (
  e: DropdownChangeParams,
  options: { filterCallback: (arg0: any) => void }
) => {
  options.filterCallback(e.value);
};

export default (
  items: Array<{ label: string; value: string }>,
  type: string
) => {
  return (options: { value: string; filterCallback: (arg0: any) => void }) => (
    <Dropdown
      style={{ width: '100%' }}
      className="ui-column-filter"
      value={options.value}
      options={items}
      onChange={(e) => onStatusChange(e, options)}
      placeholder={'Pilih ' + type}
    />
  );
};
