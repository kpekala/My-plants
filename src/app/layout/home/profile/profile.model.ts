export class Profile {

    constructor(
        public email: string,
        public username: string,
        public imagePath: string,
        public collection?: number[]) {
    }
}
