// Getting (way "from store") is done on save, by callback, and passed to components via props. It is to use existing
// React's technology to make page auto-update.
export default class Store {
    constructor() {
        this.saveCallback = null;
    }

    /// @param path string
    get(path) {
        return JSON.parse(sessionStorage.getItem(path));
    }

    /// @param path string
    set(path, value) {
        sessionStorage.setItem(path, JSON.stringify(value));
        if (this.saveCallback !== null) {
            this.saveCallback(path, value);
        }
    }

    /// @param callback function: undefined(string path, any value)
    setSaveCallback(callback) {
        this.saveCallback = callback;
    }
}