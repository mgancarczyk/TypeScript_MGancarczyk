enum CellState {
  X = 'X',
  O = 'O',
  Blank = '&nbsp'
}

class Cell {
  private value: CellState = CellState.Blank;
  constructor(private readonly element: HTMLElement) {
    this.element.innerHTML = CellState.Blank;
  }
  
  setValue(value: CellState.X | CellState.O): boolean {
    if (this.value !== CellState.Blank) {
      return false
    }

    this.element.innerHTML = value;
    this.value = value;

    return true;
  }

  getValue(): CellState {
    return this.value;
  }
}

class Board {
  private cells: Cell[][] = [];
  private playerValue: CellState.X | CellState.O = CellState.X;
  private playerMoves: number = 0;
  private table: HTMLTableElement;
  private counter: HTMLElement;
  private gameEnded = false;

  constructor(tableId: string) {
    this.table = document.getElementById(tableId) as HTMLTableElement;
    this.counter = document.getElementById('counter') as HTMLElement;
    this.loadBoard();
  }

  private loadBoard() {
    this.cells = [];
    for (let i = 0, row; row = this.table.rows[i]; i++) {
      this.cells[i] = [];
      for (let j = 0, cell; cell = row.cells[j]; j++) {
        cell.onclick = () => { this.clickCell(i, j, this.playerValue) }
        this.cells[i][j] = new Cell(cell);
      }
   }
  }

  clickCell(x: number, y: number, value: CellState.X | CellState.O) {
    if (this.gameEnded) {
      alert('Game has ended');
      this.displayPlayAgainPrompt();
      return;
    }

    this.playerValue = value === CellState.X ? CellState.O : CellState.X;
    const success = this.cells[x][y].setValue(value); 
    if (!success) {
      alert('Cell already taken! Choose different cell');
    }
    this.counter.innerText = (++this.playerMoves).toString();

    if (this.checkDraw()) {
      alert('Its a draw!');
      this.displayPlayAgainPrompt();
      return;
    }

    if (this.checkIfWon(x,y)) {
      setTimeout(() => {
        alert('Congratulations you won 🎉');
        this.displayPlayAgainPrompt();
      }, 10)
      return;
    }

    return
  }

  private displayPlayAgainPrompt() {
    this.gameEnded = true;
    if (!confirm('Do you want to play again?')) {
      return;
    }
    this.resetGame();
  }

  private resetGame() {
    this.gameEnded = false;
    this.playerMoves = 0;
    this.counter.innerText = '0';
    this.loadBoard();
  }

  private checkColumns(x: number, y: number) {
    for ( let i = 0; this.cells.length; i++) {
      if (this.cells[x][i].getValue() !== this.cells[x][y].getValue()) {
        return false;
      }
      if (i === this.cells.length -1) {
        return true
      }
    }
    return false;
  }

  private checkRows(x: number, y: number) {
    for ( let i = 0; this.cells.length; i++) {
      if (this.cells[i][y].getValue() !== this.cells[x][y].getValue()) {
        return false;
      }
      if (i === this.cells.length -1) {
        return true
      }
    }
    return false;
  }

  private checkDiagonal(x: number, y: number) {
      if(x == y){
        for(let i = 0; i < this.cells.length; i++){
            if(this.cells[i][i].getValue() != this.cells[x][y].getValue())
                return false
            if(i === this.cells.length-1){
                return true;
            }
        }
    }
    return false;
  }

  private checkAntiDiagonal(x: number, y: number) {
    if(x + y === this.cells.length - 1){
      for(let i = 0; i < this.cells.length; i++){
          if(this.cells[i][(this.cells.length-1)-i].getValue() !== this.cells[x][y].getValue()) {
            return false;
          }
          if(i === this.cells.length - 1){
              return true;
          }
      }
    }
    return false;
  }

  private checkDraw() {
    return this.playerMoves === Math.pow(this.cells.length, 2) - 1;
  }

  private checkIfWon(x: number, y: number) {
    if (this.checkColumns(x,y)) {
      return true;
    }

    if (this.checkRows(x,y)) {
      return true;
    }

    if (this.checkDiagonal(x,y)) {
      return true;
    }

    if (this.checkAntiDiagonal(x,y)) {
      return true;
    }

    return false;
  }
}

function init() {
  new Board('board');
}
