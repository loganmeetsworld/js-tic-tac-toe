function TicTacToe() {
  // constants throuhgout game
  this.binary_wins = [7, 56, 448, 73, 146, 292, 273, 84];
  this.current_turn = "O";

  // box logic
  this.boxes = [["tl"], ["tm"], ["tr"], ["ml"], ["mm"], ["mr"], ["bl"], ["bm"], ["br"]]; 
  var count = 1;
  this.boxes.forEach(function(box){
    box.push(count);
    count = count * 2;
  })

  // things to be reset in new game
  this.moves = 0;
  this.score = {"X": 0, "O": 0};
  this.newGame();
  this.selectSpace();
  this.winningScore();
  this.checkEnvironment();
}

TicTacToe.prototype = {
  // setting variables back to zero 
  newGame: function(){
    var self = this;
    $(".new-game").click(function () {
      self.current_turn = "O";
      self.moves = 0;
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
          $(this).append('<h1>' + self.current_turn + '</h1>');
          self.moves ++;
          self.score[self.current_turn] += box[1];
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
    if (self.winningScore(self.score[self.current_turn])) {
      alert("Player " + self.current_turn + " wins!");
      self.newGame();
      $(".new-game").click()
    } else if (self.moves === 9) {
      alert("TIE");
      self.newGame();
      $(".new-game").click()
    } else {
      self.current_turn = self.current_turn === "X" ? "O" : "X";
    }
  },

  // checking to see if O or X have a winning score
  winningScore: function(score){
    var self = this;
    for (i = 0; i < self.binary_wins.length; i += 1) {
      if ((score & self.binary_wins[i]) === self.binary_wins[i]) {
        return true;
      }
    }
    return false;
  },
};
