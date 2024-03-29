import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input() name: any;
  @Input() playerImg: string = '1.png';
  @Input() playerActive: boolean = false;
}
