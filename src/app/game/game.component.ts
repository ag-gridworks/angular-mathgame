import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { GameService } from './game.service';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges, DoCheck {
	// Game Loop
	gameIdle:boolean = true;
	gameStart:boolean = false;
	gameOver:boolean = false;

	private message:string = 'Digite a resposta e pressione enter';
	private messageColor = '';

	// Gerar Cálculos
	private num1:number;
	private num2:number;
	private operations:string[] = ['+','-','*'];
	private operationType;
	private operationSymbol;
	private operation;
	private operationAnswer:number;
	private answerPoints:number;
	private dificulty:number = 1;
	private dificultyName = 'Fácil';
	private dificultyColor = 'easy';
	private numRange:number = 5;
	private numRangeMin:number = 1;

	// Player Variables

	private playerLife = 3;
	private playerPoints:number = 0;
	private playerHighScore:number = 0;

	// Timer
	num = 10;
	timer = 10;
	source;

	constructor(private gameService: GameService) { }

	genCalc(){
		this.num1 = Math.floor((Math.random() * this.numRange) + 1)+this.numRangeMin;
		this.num2 = Math.floor((Math.random() * this.numRange) + 1)+this.numRangeMin;
		this.operationType = Math.floor((Math.random() * 2) + 1);
		this.operationSymbol = this.operations[this.operationType];
		this.operation = this.num1 + this.operationSymbol + this.num2;

		if(this.operationSymbol == '+') {
			this.operationAnswer = this.num1 + this.num2;
		}
		if(this.operationSymbol == '-') {
			this.operationAnswer = this.num1 - this.num2;
		}
		if(this.operationSymbol == '*') {
			this.operationAnswer = this.num1 * this.num2;
		}
	}

	genTimer(){
		this.num = 10;
		this.source = Observable
		.timer(1000, 1000)
		.map(tick => this.num - tick)
		.take(this.num + 1)
		.subscribe(tick => this.timer = tick);
	}

	genWrong(){
		this.playerLife--;
		this.message = 'Resposta Errada';
		this.messageColor = 'wrong';
	}

	genAnswer(answer){
		if(this.operationAnswer == answer) {
			this.genPoints();
			this.message = 'Resposta Correta';
			this.messageColor = '';
		} else {
			this.genWrong();
		}

		if(this.playerLife == 0) {
			this.genGameOver();
		}
		this.source.unsubscribe();
		this.genQuestion();
	}

	genPoints(){
		this.playerPoints = this.playerPoints + ((this.timer * 100)*this.dificulty);
		if(this.playerPoints > this.playerHighScore) {
			this.playerHighScore = this.playerPoints;
		}
	}

	genQuestion(){
		this.genCalc();
		this.genTimer();
	}

	genDificulty(){

	}

	// Loop do Jogo

	genStart(){
		this.gameIdle = false;
		this.gameStart = true;
		this.genQuestion();
	}

	genRestart(){
		this.source.unsubscribe();
		this.message = 'Digite a resposta e pressione enter';
		this.dificulty = 1;
		this.dificultyName = 'Fácil';
		this.dificultyColor = '';
		this.messageColor = '';
		this.numRange = 5;
		this.numRangeMin = 1;
		this.timer = 10;
		this.gameOver = false;
		this.playerLife = 3;
		this.playerPoints = 0;
		this.genStart();
	}

	genGameOver(){
		this.gameOver = true;
		this.gameStart = false;
		this.source.unsubscribe();
	}


	ngOnInit(){

	}

	ngOnChanges(){

	}

	ngDoCheck(){
		if(this.timer == 0) {
			this.genWrong();
			this.genQuestion();
		}

		if(this.playerLife == 0) {
			this.genGameOver();
		}

		if(this.playerPoints > 5000) {
			this.dificulty = 2;
			this.numRange = 15;
			this.numRangeMin = 5;
			this.dificultyName = 'Médio';
			this.dificultyColor = 'medium';
		}

		if(this.playerPoints > 20000) {
			this.dificulty = 3;
			this.numRange = 25;
			this.numRangeMin = 10;
			this.dificultyName = 'Dificil';
			this.dificultyColor = 'hard';
		}
	}

}
