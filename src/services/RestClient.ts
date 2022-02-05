import axios from 'axios';
import {Term} from '../types';
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 40000,
});

class RestClient {
    createAuthHeader() {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jsosUser')}`,
            },
        };
    }

    signin(email: string, password: string) {
        return instance.post('/auth/signin', {email, password});
    }

    importTerms(terms: Term[]) {
        return instance.post('/terms/import', {terms}, this.createAuthHeader());
    }
}

export default new RestClient();
