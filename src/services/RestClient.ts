import axios from 'axios';
import {Entry, Faculty, FieldOfStudy, Term} from '../types';
import {Employee, Student} from '../types/User';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 40000,
});

class RestClient {
    createAuthHeader() {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jsosUser')}`,
                ContentType: 'Application/json',
            },
        };
    }

    signin(email: string, password: string) {
        return instance.post('/auth/signin', {email, password});
    }

    importTerms(terms: Term[]) {
        return instance.post('/jsos/importTerms', terms, this.createAuthHeader());
    }

    importFaculties(faculties: Faculty[]) {
        return instance.post('/jsos/importFaculties', faculties, this.createAuthHeader());
    }

    importFieldsOfStudy(fieldsOfStudy: FieldOfStudy[]) {
        return instance.post('/jsos/importFieldsOfStudy', fieldsOfStudy, this.createAuthHeader());
    }

    importStudents(students: Student[]) {
        return instance.post('/jsos/importStudents', students, this.createAuthHeader());
    }

    importEmployees(employees: Employee[]) {
        return instance.post('/jsos/importEmployees', employees, this.createAuthHeader());
    }

    importEntries(entries: Entry[]) {
        return instance.post('/jsos/importEntries', entries, this.createAuthHeader());
    }
}

export default new RestClient();
