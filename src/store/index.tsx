import create from 'zustand';
import { store } from '../helpers/';

export interface Commodity {
  uuid: string | null;
  komoditas: string | null;
  area_provinsi: string | null;
  area_kota: string | null;
  size: string | null;
  price: string | null;
  tgl_parsed: Date | string | null;
  timestamp: string | null;
}

export interface Area {
  province: string;
  city: string;
}

export interface Province {
  id: number;
  nama: string;
}

export interface FishStore {
  data: Array<Commodity> | null;
  options: {
    size: Array<{ size: string }> | null;
    area: Array<Area> | null;
  };
  province: Array<Province> | null;
  city: null;
  dispatchData: (option?: Options) => void;
  dispatchArea: (option?: Options) => void;
  dispatchProvince: (option?: Options) => void;
  dispatchSize: (option?: Options) => void;
}

export default create<FishStore>((set) => ({
  data: null,
  options: {
    size: null,
    area: null,
  },
  province: null,
  city: null,
  dispatchData: async (option) => {
    const response: Array<Commodity> = await store.read('list', option),
      mapped = await Promise.all(
        response.map((a) => ({
          ...a,
          tgl_parsed: a.tgl_parsed ? new Date(a.tgl_parsed) : null,
        }))
      );
    set({ data: mapped });
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
