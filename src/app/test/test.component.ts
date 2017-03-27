import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	num;
	num2;
	source;
	playerPoints:number = 0.


	start(){
		this.num = 10;
		this.source = Observable
		.timer(1000, 1000)
		.map(tick => this.num - tick)
		.take(this.num + 1)
		.subscribe(tick => this.num2 = tick);
	}

	points(){
		this.playerPoints = this.playerPoints + (this.num2 * 100);
		this.source.unsubscribe();
		this.num2 = 0;
	}

	constructor() { }

	ngOnInit() {

	}

}
