import { GameComponent } from "../app/game/game.component";

export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: any = '';
    public playerImg: string[] = [];

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffleArray(this.stack);
    }
 
    toJson() {
        return {
            players: this.players,
            playerImg: this.playerImg,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            pickCardAnimation: this.pickCardAnimation,
        }
    }
}

function shuffleArray(array: string[]) {
    function randomSort() {
        return 0.5 - Math.random();
    }
    return array.sort(randomSort);
}