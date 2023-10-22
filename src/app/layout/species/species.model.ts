export class Species {

    constructor(
        public speciesName: string,
        public imageUrl: string,
        public ownersCount: number,
        public family: string,
        public description: string,
        public link: string,
        public id: number) {
    }
}

export class NewSpecies { 
    constructor(
        public name = '',
        public imageUrl = '',
        public family = '',
        public description = '',
        public link = ''
    ){}

    mapToSpecies(){
        return new Species(this.name,this.imageUrl, 0, this.family, 
                this.description, this.link, -1);
    }
}
