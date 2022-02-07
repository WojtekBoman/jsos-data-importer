import {action, makeObservable, observable} from 'mobx';
import RestClient from '../services/RestClient';
import BaseStore from './BaseStore';
import RootStore from './RootStore';
import {handleError} from '../utils/ErrorUtils';
import terms from '../importData/terms.json';
import fieldsOfStudy from '../importData/fieldsOfStudy.json';
import faculties from '../importData/faculties.json';
import entries from '../importData/entries.json';
import students from '../importData/students.json';
import employees from '../importData/employees.json';

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
                this.setSuccessText('Dane semestrów zostały zaimportowane prawidłowo!');
            })
            .catch((error) => {
                this.setLoading(false);
                this.setError(handleError(error));
            });
    };

    importFaculties = () => {
        this.setLoading(true);
        this.clearError();
        this.clearSuccessText();
        RestClient.importFaculties(faculties)
            .then(() => {
                this.setLoading(false);
                this.setSuccessText('Dane wydziałów zostały zaimportowane prawidłowo!');
            })
            .catch((error) => {
                this.setLoading(false);
                this.setError(handleError(error));
            });
    };

    importFieldsOfStudy = () => {
        this.setLoading(true);
        this.clearError();
        this.clearSuccessText();
        RestClient.importFieldsOfStudy(fieldsOfStudy)
            .then(() => {
                this.setLoading(false);
                this.setSuccessText('Dane kierunków studiów zostały zaimportowane prawidłowo!');
            })
            .catch((error) => {
                this.setLoading(false);
                this.setError(handleError(error));
            });
    };

    importEmployees = () => {
        this.setLoading(true);
        this.clearError();
        this.clearSuccessText();
        RestClient.importEmployees(employees)
            .then(() => {
                this.setLoading(false);
                this.setSuccessText('Dane pracowników zostały zaimportowane prawidłowo!');
            })
            .catch((error) => {
                this.setLoading(false);
                this.setError(handleError(error));
            });
    };

    importStudents = () => {
        this.setLoading(true);
        this.clearError();
        this.clearSuccessText();
        RestClient.importStudents(students)
            .then(() => {
                this.setLoading(false);
                this.setSuccessText('Dane studentów zostały zaimportowane prawidłowo!');
            })
            .catch((error) => {
                this.setLoading(false);
                this.setError(handleError(error));
            });
    };

    importEntries = () => {
        this.setLoading(true);
        this.clearError();
        this.clearSuccessText();
        RestClient.importEntries(entries)
            .then(() => {
                this.setLoading(false);
                this.setSuccessText('Dane wpisów studentów zostały zaimportowane prawidłowo!');
            })
            .catch((error) => {
                this.setLoading(false);
                this.setError(handleError(error));
            });
    };
}
