import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-avtar-card',
  templateUrl: './user-avtar-card.component.html',
  styleUrls: ['./user-avtar-card.component.css'],
})
export class UserAvtarCardComponent implements OnInit {
  @Input() userName: string;
  @Input() image: string;
  constructor() {}

  ngOnInit(): void {}
}
