// Przechowuje wartosci komorki, X, 0 albo Blank - puste
enum CellState {
  X = 'X',
  O = 'O',
  Blank = '&nbsp'
}

class Cell {
  // wartosc wpisana do komorki, domyslnie jest pusta
  private value: CellState = CellState.Blank;
  // konstruktor przyjmuje element komorki (td)
  constructor(private readonly element: HTMLElement) {
    // ustawia wartosc w srodku komorki na pustą
    this.element.innerHTML = CellState.Blank;
  }
  
  // ustawia nową wartość komórki, metoda przyjume X albo O, nie mozna ustawic pustej
  setValue(value: CellState.X | CellState.O): boolean {
    // jesli obecna wartosc komorki nie jest pusta, tzn ze jest juz zajeta to zwroc false, ze nie mozna jej zajac
    if (this.value !== CellState.Blank) {
      return false
    }

    // wpisz wartosc do html X albo O
    this.element.innerHTML = value;
    // przypisz wpisana wartosc do obiektu klasy Cell, zeby moc sobie ja potem wyciagnac
    this.value = value;
    // zwroc true ze udalo sie przypisac wartosc X lub O do komorki
    return true;
  }

  // pobierz przypisana wartosc do komorki
  getValue(): CellState {
    return this.value;
  }
}

class Board {
  // wszystkie komorki tabeli/planszy
  private cells: Cell[][] = [];
  // obecna wartosc 
  private playerValue: CellState.X | CellState.O = CellState.X;
  // liczba krokow
  private playerMoves: number = 0;
  // tabla html z plansza
  private table: HTMLTableElement;
  // licznik html do wpisania ilosci krokow
  private counter: HTMLElement;
  // czy gra zostala zakonczona
  private gameEnded = false;

  // id elementu tabeli
  constructor(tableId: string) {
    // pobierz table z html po podanym id
    this.table = document.getElementById(tableId) as HTMLTableElement;
    // pobierz miejsce to wpisania licznika z html po id counter
    this.counter = document.getElementById('counter') as HTMLElement;
    this.loadBoard();
  }

  // zaladuj plansze
  private loadBoard() {
    // wyzeruje komorki
    this.cells = [];
    // przejdz po wszystkich wierszach tabeli
    for (let i = 0, row; row = this.table.rows[i]; i++) {
      // przypisz pusta tablice zeby moc do niej przypisywac komorki
      this.cells[i] = [];
      // przejdz po wszystkich komorkach danego wiersza
      for (let j = 0, cell; cell = row.cells[j]; j++) {
        // ustaw w elemencie komorki td event onclick, zeby wywolac metode klasy clickCell
        cell.onclick = () => { this.clickCell(i, j, this.playerValue) }
        // przypisz komorke to tablicy wszystkich komorek
        this.cells[i][j] = new Cell(cell);
      }
   }
  }

  // obsluz akcje klikniecia na dana komorke x - numer kolumny, y - numer wiersza, value - wartosc do przypisania X albo O
  clickCell(x: number, y: number, value: CellState.X | CellState.O) {
    // sprawdz czy gra sie juz przypadkiem nie skonczyla
    if (this.gameEnded) {
      // wyswietl alert ze gra skonczona
      alert('Game has ended');
      // wyswietl zapytanie czy gracz chce zagrac jeszcze raz
      this.displayPlayAgainPrompt();
      return;
    }

    // ustaw wartosc konkretnej komorki
    const success = this.cells[x][y].setValue(value); 
    // sprawdz czy sie nie udalo
    if (!success) {
      // jak sie nie udalo to znaczy ze komorka jest zajeta
      alert('Cell already taken! Choose different cell');
      return;
    }
    // jesli nie jest zajeta i udalo sie przypisac wartosc, zwieksz liczbe ruchow uzytkownika
    this.counter.innerText = (++this.playerMoves).toString();
    // jesli obecnie ustawia X to zmien w nastepnej kolejce wartosc gracza na O i odwrotnie
    this.playerValue = value === CellState.X ? CellState.O : CellState.X;

    // sprawdz czy przy wpisywani X albo O gracz wygral
    if (this.checkIfWon(x,y)) {
      // jesli tak to wypisz alert o wygranej i zapytaj czy chce grac jeszcze raz
      setTimeout(() => {
        alert('Congratulations you won 🎉');
        this.displayPlayAgainPrompt();
      }, 10)
      return;
    }

    // sprawdz czy jest remis, jesli tak wypisz alert o remisie i zapytaj czy chce grac jeszcze raz
    if (this.checkDraw()) {
      alert('Its a draw!');
      this.displayPlayAgainPrompt();
      return;
    }

    return
  }

  // wysietl zapytanie czy uzytkownik chce zagrac jeszcze raz
  private displayPlayAgainPrompt() {
    // ustaw ze gra sie skonczyla
    this.gameEnded = true;
    if (!confirm('Do you want to play again?')) {
      // jesli uzytkownik nie chce grac jeszcze raz to nic nie rob
      return;
    }
    // jesli uzytkownik chce zagrac jeszcze raz, zresetuj gre
    this.resetGame();
  }

  // resetuj gre, ustawia wszystkie warwtosci na domyslne
  private resetGame() {
    // ustawia ze gra sie nie skonczyla
    this.gameEnded = false;
    // ustawia ruchy gracza na 0
    this.playerMoves = 0;
    // ustawia licznik ruchow graczy na 0 w html
    this.counter.innerText = '0';
    // laduje plansze od nowa z html
    this.loadBoard();
  }

  // sprawdz czy w kolumnie jest wygrana
  // X X X
  // - - -
  // - - -
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

  // sprawdz czy w wierszu jest wygrana
  // X - -
  // X - -
  // X - -
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

  // sprawdz czy w przekatnej jest wygrana
  // X - -
  // - X -
  // - - X
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

  // sprawdz czy w przekatnej jest wygrana
  // - - X
  // - X -
  // X - -
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

  // sprawdz czy jest remis
  private checkDraw() {
    // czy aktualna liczba krokow rowna sie ilosci wszystkich komorek
    return this.playerMoves === Math.pow(this.cells.length, 2);
  }

  // sprwadz czy ktos wygral w danym ruchu
  private checkIfWon(x: number, y: number) {
    // sprawdz kolumny
    if (this.checkColumns(x,y)) {
      return true;
    }

    // sprawdz wiersze
    if (this.checkRows(x,y)) {
      return true;
    }

    // sprawdz przekatna
    if (this.checkDiagonal(x,y)) {
      return true;
    }

    // sprawdz przeciw przekatna
    if (this.checkAntiDiagonal(x,y)) {
      return true;
    }

    return false;
  }
}

// stworz plansze
function init() {
  new Board('board');
}
