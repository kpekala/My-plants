import { Species } from '../../species/species.model';

export class Profile {
    constructor(
        public email: string,
        public username: string,
        public imagePath: string,
        public favorites: number[],
        public collection: SpecificPlant[],
        public collectionMap = {}
    ) {}
}

export interface SpecificPlant {
    id: number;
    lastTimeWatered: Date;
    plantId: number;
    plantName: string;
}
