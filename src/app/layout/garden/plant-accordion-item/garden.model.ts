import { SpecificPlant } from '../../home/profile/profile.model';
import { Species } from '../../species/species.model';

export interface GardenSpecies {
    speciesId: number;
    species: Species;
    specificPlants: SpecificPlant[];
}
