export interface RootState {
    version: string;
}

export interface StoreBase {
    state(): any;
    mutations: any;
    actions: any;
    getters?: any;
}
