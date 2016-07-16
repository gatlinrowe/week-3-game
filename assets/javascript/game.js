function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}

var gameStuff = {
	// number of guesses
	numberKeysPressed: 0,
	//wrong guesses left
	strikes: 5,
	// wins in a row
	streak: 0,
	// word bank
	words: ['html', 'jquery', 'css', 'bootstrap', 'doctype', 'header', 'footer', 'reset', 'id', 'class', 'object', 'function', 'href', 'forloop', 'margin', 'padding', 'div', 'float', 'align' ],
	// current word
	word: "",
	//current word progress
	wordHolder: "",
	//last key pressed
	keyPressed: "",
	//letters already guessed
	guesses: [],
	//is the last guess correct
	correct: false,

	//inital game setup funtions
	gameSetup: function() {
		this.guesses.length = 0;
		this.wordHolder = "";
		this.numberKeysPressed = 0;
		this.strikes = 5;
		this.word = this.words[Math.floor(Math.random()*this.words.length)];
		console.log(this.word);
		if (this.streak < 1) {
			document.getElementById("style1").disabled=true;
			document.getElementById("style2").disabled=true;
			document.getElementById("style3").disabled=true;
		}
		else if (this.streak < 5) {
			document.getElementById("style1").disabled=false;
			document.getElementById("style2").disabled=true;
			document.getElementById("style3").disabled=true;
		}
		else if (this.streak < 7) {
			document.getElementById("style1").disabled=false;
			document.getElementById("style2").disabled=false;
			document.getElementById("style3").disabled=true;
		}
		else if (this.streak >= 7) {
			document.getElementById("style1").disabled=false;
			document.getElementById("style2").disabled=false;
			document.getElementById("style3").disabled=false;
		}
		for (var i = 0; i < this.word.length; i++) {
			this.wordHolder = this.wordHolder + "_";
		}
		document.getElementById("holder").innerHTML = this.wordHolder;
		document.getElementById("turnsLeft").innerHTML = "Tries Left: " +this.strikes;
		document.getElementById("guessed").innerHTML = this.guesses;			
	},


	showKeyPressed: function(keyPressed) {
		this.numberKeysPressed++;
		console.log(this.numberKeysPressed);
		console.log(keyPressed);
		this.keyPressed = keyPressed;
		console.log(this.guesses);
	},
	updateprogress: function() {
		for (i = 0; i < this.word.length; i++){
			if (this.keyPressed === this.word.charAt(i).toLowerCase()) {
				this.correct = true;
				console.log(this.correct);
				this.wordHolder = setCharAt(this.wordHolder,i,this.keyPressed);
				document.getElementById("holder").innerHTML = this.wordHolder;
			}
		}

	},
	guessManager: function() {
		alreadyGuessed = this.guesses.indexOf(this.keyPressed);
		console.log(alreadyGuessed);
		if (alreadyGuessed < 0 && this.correct === false) {
			this.guesses.push(this.keyPressed);
			this.strikes--;
			console.log(this.guesses);
		}
		this.correct = false;
	},
	uiUpdate: function() {
		if (this.wordHolder === this.word){
			console.log("You Win!");
			this.gameSetup();
			this.streak++;
		}
		if (this.strikes < 1){
			console.log("You Lose :(")
			this.streak = 0;
			this.gameSetup();
		}
		document.getElementById("turnsLeft").innerHTML = "Tries Left: "+this.strikes;
		document.getElementById("guessed").innerHTML = this.guesses;
		document.getElementById("streak").innerHTML = "Current Streak: " +this.streak;	
		
	},
}

gameStuff.gameSetup();
document.onkeyup = function(event) {
	gameStuff.showKeyPressed(String.fromCharCode(event.keyCode).toLowerCase());
	gameStuff.updateprogress();
	gameStuff.guessManager();
	gameStuff.uiUpdate();
}
