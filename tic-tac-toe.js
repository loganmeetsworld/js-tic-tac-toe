function TicTacToe() {
  this.player1_move = "X"; 
  this.player2_move = "O"; 
  this.wins = [7, 56, 448, 73, 146, 292, 273, 84];
  this.turn = "X";
  this.squares = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  this.boxes = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]; 
  this.moves = 0;

  this.newGame();
  this.selectSpace();
  this.checkForWinner();
}

TicTacToe.prototype = {
  var self = this;
  newGame: function(){
    $(".new-game").click(function () {
      console.log("HELLO");
      self.squares = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      self.turn = "X";
      self.score = {"X": 0, "O": 0};
    });
  },

  selectSpace: function(){
    var self = this;
    this.boxes.forEach(function(box) {
      $("#" + box).click(function () {
        $(this).css('background-color', '#ff0000'); 
        $(this).append('X');
        self.moves ++;
      });
    });
  }, 

  checkForWinner: function(score){
    var self = this;
    for (i = 0; i < wins.length; i += 1) {
      if ((wins[i] & score) === wins[i]) {
          return true;
      };
    };
    return false;
  }
};
