import { Calendar } from 'primereact/calendar';

export default (options: {
  value: Date | Date[] | undefined;
  filterCallback: (arg0: Date | Date[] | undefined, arg1: any) => void;
  index: any;
}) => {
  return (
    <Calendar
      value={options.value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      dateFormat="mm/dd/yy"
      placeholder="mm/dd/yyyy"
      mask="99/99/9999"
    />
  );
};
