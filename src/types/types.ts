import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

export interface ListOption {
  label: string;
  value: string;
}
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

export interface Size {
  size: string;
}

export interface FishStore {
  data: Array<Commodity> | null;
  options: {
    size: Array<Size> | null;
    area: Array<Area> | null;
  };
  province: Array<Province> | null;
  city: null;
  tableLoading: boolean;
  dispatchData: (option?: Options) => void;
  dispatchArea: (option?: Options) => void;
  dispatchProvince: (option?: Options) => void;
  dispatchSize: (option?: Options) => void;
}

export type ToastRef = RefObject<Toast>;

export interface SubmitCallbackParams {
  commodity: string;
  province: ListOption | string;
  city: ListOption | string;
  size: Size | string;
  price: number | string | null;
  toast: ToastRef;
  dispatchData: (option?: Options | undefined) => void;
  closeFunction: () => void;
  setValidator: any;
  type: 'edit' | 'append';
  oldData?: Commodity;
}
