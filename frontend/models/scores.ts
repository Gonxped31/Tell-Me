export class Score {
    rated_by: string;
    rated_to: string;
    score: number;

    constructor (data) {
        this.rated_by = data.rated_by;
        this.rated_to = data.rated_to;
        this.score = data.score;
    }

}