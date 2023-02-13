import { Component, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

	ngAfterViewInit() { }

	constructor(private router:Router) {
	}

  openComponent() {
    this.router.navigate(['cms/members']);
  }
}
