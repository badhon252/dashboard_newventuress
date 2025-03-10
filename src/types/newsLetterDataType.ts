export type NewsletterResponse = {
    status: boolean;
    message: string;
    data: Newsletter[];
    meta: Meta;
};

export type Newsletter = {
    _id: string;
    email: string;
    __v: number;
};
type Meta = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
};