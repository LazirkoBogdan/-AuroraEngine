export default class LocalStorage {
  static getItem(key) {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static setItem(key, value, reload = true) {
    const data = JSON.stringify(value);
    window.localStorage.setItem(key, data);
    if (reload) {
      window.location.reload();
    }
  }

  static clear() {
    window.localStorage.clear();
    window.location.reload();
  }
}
