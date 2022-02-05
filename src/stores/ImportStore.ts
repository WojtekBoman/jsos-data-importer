import {action, makeObservable, observable} from 'mobx';
import RestClient from '../services/RestClient';
import BaseStore from './BaseStore';
import RootStore from './RootStore';
import {handleError} from '../utils/ErrorUtils';
import terms from '../importData/terms.json';
import fieldsOfStudy from '../importData/fieldsOfStudy.json';

export default class ImportStore extends BaseStore {
    constructor(rootStore: RootStore) {
        super(rootStore);

        makeObservable(this, {
            error: observable,
            loading: observable,
            successText: observable,

            clearError: action,
            setError: action,
            setLoading: action,
            clearSuccessText: action,
            setSuccessText: action,
        });
    }

    error = '';
    loading = false;
    successText = '';

    clearError = () => {
        this.error = '';
    };

    setError = (value: string) => {
        this.error = value;
    };

    setLoading = (value: boolean) => {
        this.loading = value;
    };

    clearSuccessText = () => {
        this.successText = '';
    };

    setSuccessText = (value: string) => {
        this.successText = value;
    };

    importTerms = () => {
        this.setLoading(true);
        this.clearError();
        this.clearSuccessText();
        RestClient.importTerms(terms)
            .then(() => {
                this.setLoading(false);
                this.setSuccessText('Terms imported successfully');
            })
            .catch((error) => {
                this.setLoading(false);
                this.setError(handleError(error));
            });
    };
}
