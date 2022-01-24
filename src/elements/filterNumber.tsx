import { InputNumber } from 'primereact/inputnumber';

export default (options: {
  value: number | null | undefined;
  filterCallback: (arg0: number | null, arg1: any) => void;
  index: any;
}) => {
  return (
    <InputNumber
      value={options.value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      mode="currency"
      currency="IDR"
      locale="id-ID"
    />
  );
};
