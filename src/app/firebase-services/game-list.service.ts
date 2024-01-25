import { Injectable, inject } from "@angular/core";
import { GameComponent } from "../game/game.component";
import { Game } from "../../models/game";
import { Firestore, collection, doc, getDoc, onSnapshot, updateDoc } from "@angular/fire/firestore";


@Injectable({
    providedIn: "root"
})
export class GameListService {
    firestore: Firestore = inject(Firestore);
    game = new Game();
    gameId!: string;
    gameComponent: GameComponent | undefined;

    constructor() {

    }

    setGameId(id: string): void {
        this.gameId = id;
        console.log('Game ID in service:', this.gameId);
    }

    getData() {
        let aCollection = collection(this.firestore, 'games');
        let docRef = doc(aCollection, this.gameId);
        console.log('DocRef:', docRef);

        onSnapshot(aCollection, (list) => {
            list.forEach(element => {
                console.log(element.id, ':', element.data());
            });
            getDoc(docRef).then((docSnap: any) => {
                if (docSnap) {
                    console.log('Dokumentendaten', docSnap.data());
                    this.gameComponent?.loadGameId(docSnap.data());
                }
            })
        });
    }

    saveGame(game: any) {
        let aCollection = collection(this.firestore, 'games');
        let docRef = doc(aCollection, this.gameId);
        updateDoc(docRef, game.toJson());
    }

    setGameComponent(gameComponent: GameComponent): void {
        this.gameComponent = gameComponent;
    }
}

