import store from './steinstore';
import {
  Commodity,
  ListOption,
  Size,
  SubmitCallbackParams,
} from '../types/types';
import uuidv4 from './uuid';

export default ({
  commodity,
  province,
  city,
  size,
  price,
  toast,
  dispatchData,
  closeFunction,
  setValidator,
  type,
  oldData,
}: SubmitCallbackParams) => {
  return async () => {
    try {
      const date = new Date(),
        stamp = Date.now(),
        provinceInput = province as ListOption,
        cityInput = city as ListOption,
        sizeInput = size as Size,
        uuid = uuidv4(),
        inputData = {
          komoditas: commodity,
          area_provinsi: provinceInput.value || provinceInput,
          area_kota: cityInput.value || cityInput,
          size: sizeInput.size || size,
          price: price?.toString(),
          tgl_parsed: date,
          timestamp: stamp.toString(),
          uuid: uuid,
        },
        validate = {
          komoditas: !inputData.komoditas,
          area_provinsi: !inputData.area_provinsi,
          area_kota: !inputData.area_kota,
          size: !inputData.size,
          price: !Number(inputData.price),
        };
      let isOk = Object.values(validate).filter((val) => val === true);
      if (!isOk.length) {
        if (type === 'append') {
          const res = await store.append('list', [inputData]);
          console.log(res);
        } else {
          const searchKey: any = {};
          let key: keyof Commodity;
          for (key in oldData) {
            if (oldData![key]) {
              searchKey[key] = oldData![key];
            }
          }
          const res = await store.edit('list', {
            search: searchKey,
            set: {...inputData, tgl_parsed: oldData?.tgl_parsed, timestamp: oldData?.timestamp, uuid: oldData?.uuid},
            limit: 1,
          });
          console.log(res);
        }
        toast?.current?.show({
          severity: 'success',
          summary: `Berhasil ${type === 'append' ? 'Memambah' : 'Mengubah'}!`,
          detail: `Berhasil ${
            type === 'append' ? 'memambah' : 'mengubah'
          } data ${commodity}`,
        });
        dispatchData();
        closeFunction();
      } else {
        throw { validate };
      }
    } catch (error: any) {
      const errValidaton = error.validate || {
        komoditas: true,
        area_provinsi: true,
        area_kota: true,
        size: true,
        price: true,
      };
      console.log(errValidaton);
      setValidator(errValidaton);
      toast?.current?.show({
        severity: 'error',
        summary: 'Gagal Memambah!',
        detail: `Gagal menambah data ${commodity}`,
      });
    }
  };
};
