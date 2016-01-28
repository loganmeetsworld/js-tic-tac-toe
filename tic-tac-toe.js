function TicTacToe() {
  this.wins = [7, 56, 448, 73, 146, 292, 273, 84];
  this.turn = "O";
  this.boxes = [["tl"], ["tm"], ["tr"], ["ml"], ["mm"], ["mr"], ["bl"], ["bm"], ["br"]]; 

  var count = 1;
  this.boxes.forEach(function(box){
    box.push(count);
    count = count * 2;
  })

  this.moves = 0;
  this.score = {"X": [], "O": []};

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
      self.turn = "O";
      self.moves = 0;
      self.score = {"X": [], "O": []};
      self.boxes.forEach(function(box) {
        $("#" + box).empty();
      });
    });
  },

  selectSpace: function(){
    var self = this;
    self.boxes.forEach(function(box) {
      $("#" + box).click(function () {
        $(this).append('<h1>' + self.turn + '</h1>');
        self.moves ++;
        self.score[self.turn].push(box[1]);
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
    } else {
      self.turn = self.turn === "X" ? "O" : "X";
    }
  },

  winningScore: function(score){
    var self = this;
    for (i = 0; i < self.wins.length; i += 1) {
      if (score === self.wins[i]) {
        return true;
      }
    }
    return false;
  },
};
