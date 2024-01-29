import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameListService } from '../firebase-services/game-list.service';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game!: Game;
  gameId!: string;
  gameData!: any;

  constructor(public dialog: MatDialog, private gameService: GameListService, private route: ActivatedRoute) {
    this.newGame();
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      // console.log('Game ID:', this.gameId);
      this.gameService.setGameId(this.gameId);
    });
    this.gameService.setGameComponent(this);
    this.gameService.getData();
  }

  loadGameId(docSnap: any) {
    this.gameData = docSnap;
    this.game.currentPlayer = this.gameData.currentPlayer,
      this.game.playedCards = this.gameData.playedCards,
      this.game.players = this.gameData.players,
      this.game.playerImg = this.gameData.playerImg,
      this.game.stack = this.gameData.stack,
      this.game.currentCard = this.gameData.currentCard,
      this.game.pickCardAnimation = this.gameData.pickCardAnimation
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.players.length == 0) {
      this.openDialog();
    } else {
      if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.gameService.saveGame(this.game);
        setTimeout(() => {
          this.game.pickCardAnimation = false;
          this.game.playedCards.push(this.game.currentCard);
          this.gameService.saveGame(this.game);
        }, 1500);
      }
    }
  }

  openEditPlayer(playerId: number): void {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        this.game.playerImg[playerId] = change;
      } if (change == 'DELETE') {
        this.game.players.splice(playerId, 1);
        this.game.playerImg.splice(playerId, 1);
      }
      this.gameService.saveGame(this.game);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.game.players.push(result);
        this.game.playerImg.push('1.png');
        this.gameService.saveGame(this.game);
      }
    });
  }
}
