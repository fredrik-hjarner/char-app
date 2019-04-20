import axios from "axios";

export default class {
  static getValue(key: string): Promise<string> {
    return axios
      .get(`http://localhost:8080/value?key=${key}`)
      .then(({ data }) => data);
  }

  static setValue(key: string, value: string): Promise<string> {
    return axios.post(`http://localhost:8080/value?key=${key}&value=${value}`);
  }

  static getAllKeys(): Promise<[string]> {
    return axios
      .get("http://localhost:8080/keys")
      .then(({ data }) => data || []);
  }

  static getKeysWithPrefix(prefix: string): Promise<[string]> {
    return axios
      .get(`http://localhost:8080/keys?prefix=${prefix}`)
      .then(({ data }) => data || []);
  }
}
