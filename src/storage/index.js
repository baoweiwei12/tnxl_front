class Storage {
    constructor(key, prefix = 'app_') {
        this.prefix = prefix;
        this.key = prefix + key;
    }

    set(value) {
        localStorage.setItem(this.key, JSON.stringify(value))
    }

    get() {
        const data = localStorage.getItem(this.key)
        return data ? JSON.parse(data) : null
    }

    remove() {
        localStorage.removeItem(this.key)
    }
}

export const tokenStorage = new Storage('token')
export const userStorage = new Storage('user')

export const clearStorage = (prefix = 'app_') => {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
        }
    });
}