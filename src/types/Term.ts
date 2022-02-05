export interface Term {
    termId: number;
    type: string;
    dateStart: string;
    dateEnd: string;
}

export enum TermType {
    SUMMER = 'SUMMER',
    WINTER = 'WINTER',
}
