function TicTacToe() {
  // constants throuhgout game, game begins with X
  this.binaryWins = [7, 56, 448, 73, 146, 292, 273, 84];
  this.currentTurn = "X";

  // box logic for location and scores
  this.boxes = [["tl"], ["tm"], ["tr"], ["ml"], ["mm"], ["mr"], ["bl"], ["bm"], ["br"]]; 
  var count = 1;
  this.boxes.forEach(function(box){
    box.push(count);
    count = count * 2; // Building the associated scores with the boxes
  })

  // things to be reset in new game
  this.movesCount = 0; // In order to check for a tie
  this.score = {"X": 0, "O": 0}; // Keep track of the scores added by selecting a square

  // all game functions
  this.newGame(); // initiates a new game
  this.selectSpace(); 
  this.winningScore();
  this.checkEnvironment(); // after each turn evaluates the game environment, has someone won yet?
}

TicTacToe.prototype = {
  // setting variables back to zero 
  newGame: function(){
    var self = this;
    $(".new-game").click(function () {
      self.currentTurn = "O";
      self.movesCount = 0;
      self.score = {"X": 0, "O": 0};
      self.boxes.forEach(function(box) {
        $("#" + box).empty();
      });
    });
  },

  // selecting a square click logic
  selectSpace: function(){
    var self = this;
    self.boxes.forEach(function(box) {
      $("#" + box).click(function () {
        if ($(this).is(':empty')){
          $(this).append('<h1>' + self.currentTurn + '</h1>');
          self.movesCount ++;
          self.score[self.currentTurn] += box[1];
          this.onclick = self.checkEnvironment();;
        } else {
          alert("Already selected!") 
        };
      });
    });
  }, 

  // checking the condition of the board after each turn
  checkEnvironment: function(){
    var self = this; 
    if (self.winningScore(self.score[self.currentTurn])) {
      alert("Player " + self.currentTurn + " wins!");
      $(".new-game").click()
    } else if (self.movesCount === 9) {
      alert("TIE");
      $(".new-game").click()
    } else {
      // this is wear minimax logic would come in
      self.currentTurn = self.currentTurn === "X" ? "O" : "X"; // switches O to X and vice versa, toggle?
    }
  },

  // checking to see if O or X have a winning score
  winningScore: function(score){
    var self = this;
    for (i = 0; i < self.binaryWins.length; i += 1) {
      if ((score & self.binaryWins[i]) === self.binaryWins[i]) {
        return true;
      }
    }
    return false;
  },
};
