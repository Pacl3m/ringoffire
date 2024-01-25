import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})
export class PlayerMobileComponent {
 
  @Input() name: any;
  @Input() playerImg: string = '1.png';
  @Input() playerActive: boolean = false;
}
