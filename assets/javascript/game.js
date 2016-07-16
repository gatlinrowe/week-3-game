function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}

var gameStuff = {
	numberKeysPressed: 0,
	words: ['html', 'jquery', 'css', 'bootstrap', ],
	word: "",
	wordHolder: "",
	keyPressed: "",
	//guess: "",
	guesses: [],
	gameSetup: function() {
		this.wordHolder = "";
		this.numberKeysPressed = 0;
		this.word = this.words[Math.floor(Math.random()*this.words.length)];
		console.log(this.word);

		for (var i = 0; i < this.word.length; i++) {
			this.wordHolder = this.wordHolder + "_";
			console.log(this.wordHolder);

		}
		document.getElementById("holder").innerHTML = this.wordHolder;
	},

	showKeyPressed: function(keyPressed) {
		this.numberKeysPressed++;
		console.log(this.numberKeysPressed);
		console.log(keyPressed);
		this.keyPressed = keyPressed;
	},
	updateprogress: function() {
		for (i = 0; i < this.word.length; i++){
			if (this.keyPressed === this.word.charAt(i).toLowerCase()) {
				console.log("correct")
				this.wordHolder = setCharAt(this.wordHolder,i,this.keyPressed);
				document.getElementById("holder").innerHTML = this.wordHolder;
			}
		}
	
		if (this.wordHolder === this.word){
			console.log("You Win!");
			this.gameSetup();

		}
	}
}
	
	// put more functions here like gameSetup(), etc...

gameStuff.gameSetup();
document.onkeyup = function(event) {
	gameStuff.showKeyPressed(String.fromCharCode(event.keyCode).toLowerCase());
	gameStuff.updateprogress();
}
