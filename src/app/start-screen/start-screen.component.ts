import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }

  newGame() {
    let aCollection = collection(this.firestore, 'games');
    let game = new Game();
    // console.log(aCollection, game);
    addDoc(aCollection, game.toJson())
      .then((gameInfo: any) => {
        // console.log(gameInfo.id);
        this.router.navigateByUrl('/game/' + gameInfo.id);
      })
  }
}
