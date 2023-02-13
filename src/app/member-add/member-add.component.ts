import { Component, OnInit } from '@angular/core';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  isBaptized: string ="no";
  isMaried: boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  // @ts-ignore
  selectItem(e:MatRadioChange){
    // @ts-ignore
   this.isBaptized=e.value;
  }
}
