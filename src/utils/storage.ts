interface MyStorage {
    save: (data: any, key: string) => void;
    get: (key: string) => any;
    clearAll: () => Promise<void>;
}

const storageController: MyStorage = {
    save: async (data: any, key: string) => {
        const serialisedData = JSON.stringify(data);
        try {
            await window.localStorage.setItem(key, serialisedData);
        } catch (error) {
            // console.log(error);
            throw error;
        }
    },
    get: (key: string) => {
        if (typeof window !== 'undefined') {
            const result = window.localStorage.getItem(key);
            if (result) {
                return JSON.parse(result);
            }
            return result;
        }
    },
    clearAll: async () => {
        return await window.localStorage.clear();
    },
};

export { storageController };
