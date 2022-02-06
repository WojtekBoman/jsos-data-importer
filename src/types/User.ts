export interface User {
    userId: number;
    firstName: string;
    secondName?: string;
    lastName: string;
    password: string;
    pesel: number;
    email: string;
    role: string;
    isActive: boolean;
}

export interface Student extends User {
    studentIdNumber: number;
}

export interface Employee extends User {
    academicDegree: string;
}
