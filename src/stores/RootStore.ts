import AuthStore from './AuthStore';
import ImportStore from './ImportStore';

const stores = (store: RootStore) => ({
    authStore: new AuthStore(store),
    importStore: new ImportStore(store),
});

class RootStore {
    stores = stores(this);
}

export default RootStore;
