import axios from "axios";

const backend = "http://192.168.1.103:8080";

export default class {
  static getValue(key: string): Promise<string> {
    return axios.get(`${backend}/value?key=${key}`).then(({ data }) => data);
  }

  static setValue(key: string, value: string): Promise<string> {
    if (typeof value !== "string") {
      console.log('setValue: typeof value !== "string"');
    }
    return axios.post(`${backend}/value?key=${key}&value=${value}`);
  }

  static getAllKeys(): Promise<[string]> {
    return axios.get(`${backend}/keys`).then(({ data }) => data || []);
  }

  static getKeysWithPrefix(prefix: string): Promise<[string]> {
    return axios.get(`${backend}/keys?prefix=${prefix}`).then(({ data }) => {
      if (!data) {
        return [];
      }
      return data.map(k => k.replace(new RegExp(`^${prefix}`), ""));
    });
  }

  static deleteAllValues(): Promise<any> {
    return axios.delete(`${backend}/value`);
  }

  static deleteOneValue(key: string): Promise<any> {
    return axios.delete(`${backend}/value?key=${key}`);
  }
}
