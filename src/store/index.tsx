import create from 'zustand';
import { store } from '../helpers/';
import { FishStore, Commodity, Area } from '../types/types';

export default create<FishStore>((set) => ({
  data: null,
  options: {
    size: null,
    area: null,
  },
  province: null,
  city: null,
  tableLoading: false,
  dispatchData: async (option) => {
    set({ tableLoading: true });
    const response: Array<Commodity> = await store.read('list', option),
      mapped = await Promise.all(
        response.map((a) => ({
          ...a,
          tgl_parsed: a.tgl_parsed ? new Date(a.tgl_parsed) : null,
        }))
      );
    set({ data: mapped });
    set({ tableLoading: false });
  },
  dispatchArea: async (option) => {
    const response: Array<Area> = await store.read('option_area', option);
    set((state) => ({ options: { size: state.options.size, area: response } }));
  },
  dispatchProvince: async () => {
    const response = await fetch(
      'https://dev.farizdotid.com/api/daerahindonesia/provinsi'
    );
    const parsed = await response.json();
    set({ province: parsed.provinsi });
  },
  dispatchSize: async (option) => {
    const response: Array<{ size: string }> = await store.read(
      'option_size',
      option
    );
    set((state) => ({ options: { size: response, area: state.options.area } }));
  },
}));
