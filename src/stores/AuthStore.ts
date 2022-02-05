import {action, makeObservable, observable} from 'mobx';
import RestClient from '../services/RestClient';
import BaseStore from './BaseStore';
import RootStore from './RootStore';

export default class AuthStore extends BaseStore {
    constructor(rootStore: RootStore) {
        super(rootStore);

        makeObservable(this, {
            isLoggedIn: observable,
            loading: observable,
            error: observable,

            clearError: action,
            setError: action,
            setLoading: action,
            setIsLoggedIn: action,
            logout: action,
        });

        this.isLoggedIn = !!localStorage.getItem('jsosUser');
    }

    isLoggedIn: boolean;

    loading = false;

    error = '';

    clearError = () => {
        this.error = '';
    };

    setError = (value: string) => {
        this.error = value;
    };

    setLoading = (value: boolean) => {
        this.loading = value;
    };

    setIsLoggedIn = (value: boolean) => {
        this.isLoggedIn = value;
    };

    logout = () => {
        localStorage.removeItem('jsosUser');
        this.setIsLoggedIn(false);
    };

    signIn = (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        event.preventDefault();
        this.setLoading(true);
        this.setError('');
        RestClient.signin(email, password)
            .then((res) => {
                if (res.data.roles.includes('ADMIN')) {
                    this.setIsLoggedIn(true);
                    this.setLoading(false);
                    localStorage.setItem('jsosUser', res.data.token);
                } else {
                    this.setError('You do not have proper permissions');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    this.setError('Bad credentials');
                } else {
                    this.setError(error.message);
                }
                this.setLoading(false);
            });
    };
}
