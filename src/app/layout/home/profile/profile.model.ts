export class Profile {
    constructor(
        public email: string,
        public username: string,
        public imagePath: string,
        public favorites: number[],
        public collection: CollectionItem[],
        public collectionMap = {}
    ) {}
}

export interface CollectionItem {
    id: number;
}
