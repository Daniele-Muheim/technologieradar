export interface Technologie {
    _id?: string;
    name?: string;
    ring?: string;
    category?: string;
    description?: string;
    descriptionClassification?: string
    status?: boolean;
    creationDate?: string,
    publicationDate?: string,
    history: Change[];
}

export interface Change {
    author: string;
    changeDate: string;
}
