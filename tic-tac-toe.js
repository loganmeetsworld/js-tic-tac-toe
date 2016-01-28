function TicTacToe() {
  this.wins = [7, 56, 448, 73, 146, 292, 273, 84];
  this.turn = "O";
  this.squares = [];
  this.boxes = [["s1"], ["s2"], ["s3"], ["s4"], ["s5"], ["s6"], ["s7"], ["s8"], ["s9"]]; 

  var count = 1;
  this.boxes.forEach(function(box){
    box.push(count);
    count = count * 2;
  })

  this.moves = 0;
  this.score = {"X": 0, "O": 0};

  this.newGame();
  this.selectSpace();
  this.winningScore();
  this.checkEnvironment();
}

TicTacToe.prototype = {
  newGame: function(){
    var self = this;
    $(".new-game").click(function () {
      console.log("HELLO");
      self.squares = [];
      self.turn = "O";
      self.moves = 0;
      self.score = {"X": 0, "O": 0};
      self.boxes.forEach(function(box) {
        $("#" + box).css('background-color', 'white');
        $("#" + box).empty();
      });
    });
  },

  selectSpace: function(){
    var self = this;
    this.boxes.forEach(function(box) {
      $("#" + box).click(function () {
        if (self.turn == "X") {
          $(this).css('background-color', 'red'); 
        } else {
          $(this).css('background-color', 'blue'); 
        };

        $(this).append('<h1>', self.turn, '</h1>');
        self.moves ++;
        self.score[self.turn] += box[1];
        this.onclick = self.checkEnvironment();;
      });
    });
  }, 

  checkEnvironment: function(){
    var self = this; 
    if (self.winningScore(self.score[self.turn])) {
      alert(self.turn + " wins!");
    } else if (self.moves === 9) {
      alert("TIE");
      self.newGame();
    } else {
      self.turn = self.turn === "X" ? "O" : "X";
    }
  },

  winningScore: function(score){
    var self = this;
    for (i = 0; i < self.wins.length; i += 1) {
      if ((self.wins[i] & score) === self.wins[i]) {
        return true;
      }
    }
    return false;
  },
};
