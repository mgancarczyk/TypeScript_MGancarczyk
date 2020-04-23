// Przechowuje wartosci komorki, X, 0 albo Blank - puste
var CellState;
(function (CellState) {
    CellState["X"] = "X";
    CellState["O"] = "O";
    CellState["Blank"] = "&nbsp";
})(CellState || (CellState = {}));
var Cell = /** @class */ (function () {
    // konstruktor przyjmuje element komorki (td)
    function Cell(element) {
        this.element = element;
        // wartosc wpisana do komorki, domyslnie jest pusta
        this.value = CellState.Blank;
        // ustawia wartosc w srodku komorki na pustą
        this.element.innerHTML = CellState.Blank;
    }
    // ustawia nową wartość komórki, metoda przyjume X albo O, nie mozna ustawic pustej
    Cell.prototype.setValue = function (value) {
        // jesli obecna wartosc komorki nie jest pusta, tzn ze jest juz zajeta to zwroc false, ze nie mozna jej zajac
        if (this.value !== CellState.Blank) {
            return false;
        }
        // wpisz wartosc do html X albo O
        this.element.innerHTML = value;
        // przypisz wpisana wartosc do obiektu klasy Cell, zeby moc sobie ja potem wyciagnac
        this.value = value;
        // zwroc true ze udalo sie przypisac wartosc X lub O do komorki
        return true;
    };
    // pobierz przypisana wartosc do komorki
    Cell.prototype.getValue = function () {
        return this.value;
    };
    return Cell;
}());
var Board = /** @class */ (function () {
    // id elementu tabeli
    function Board(tableId) {
        // wszystkie komorki tabeli/planszy
        this.cells = [];
        // obecna wartosc 
        this.playerValue = CellState.X;
        // liczba krokow
        this.playerMoves = 0;
        // czy gra zostala zakonczona
        this.gameEnded = false;
        // pobierz table z html po podanym id
        this.table = document.getElementById(tableId);
        // pobierz miejsce to wpisania licznika z html po id counter
        this.counter = document.getElementById('counter');
        this.loadBoard();
    }
    // zaladuj plansze
    Board.prototype.loadBoard = function () {
        var _this = this;
        // wyzeruje komorki
        this.cells = [];
        var _loop_1 = function (i, row) {
            // przypisz pusta tablice zeby moc do niej przypisywac komorki
            this_1.cells[i] = [];
            var _loop_2 = function (j, cell) {
                // ustaw w elemencie komorki td event onclick, zeby wywolac metode klasy clickCell
                cell.onclick = function () { _this.clickCell(i, j, _this.playerValue); };
                // przypisz komorke to tablicy wszystkich komorek
                this_1.cells[i][j] = new Cell(cell);
            };
            // przejdz po wszystkich komorkach danego wiersza
            for (var j = 0, cell = void 0; cell = row.cells[j]; j++) {
                _loop_2(j, cell);
            }
        };
        var this_1 = this;
        // przejdz po wszystkich wierszach tabeli
        for (var i = 0, row = void 0; row = this.table.rows[i]; i++) {
            _loop_1(i, row);
        }
    };
    // obsluz akcje klikniecia na dana komorke x - numer kolumny, y - numer wiersza, value - wartosc do przypisania X albo O
    Board.prototype.clickCell = function (x, y, value) {
        var _this = this;
        // sprawdz czy gra sie juz przypadkiem nie skonczyla
        if (this.gameEnded) {
            // wyswietl alert ze gra skonczona
            alert('Game has ended');
            // wyswietl zapytanie czy gracz chce zagrac jeszcze raz
            this.displayPlayAgainPrompt();
            return;
        }
        // ustaw wartosc konkretnej komorki
        var success = this.cells[x][y].setValue(value);
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
        if (this.checkIfWon(x, y)) {
            // jesli tak to wypisz alert o wygranej i zapytaj czy chce grac jeszcze raz
            setTimeout(function () {
                alert('Congratulations you won 🎉');
                _this.displayPlayAgainPrompt();
            }, 10);
            return;
        }
        // sprawdz czy jest remis, jesli tak wypisz alert o remisie i zapytaj czy chce grac jeszcze raz
        if (this.checkDraw()) {
            alert('Its a draw!');
            this.displayPlayAgainPrompt();
            return;
        }
        return;
    };
    // wysietl zapytanie czy uzytkownik chce zagrac jeszcze raz
    Board.prototype.displayPlayAgainPrompt = function () {
        // ustaw ze gra sie skonczyla
        this.gameEnded = true;
        if (!confirm('Do you want to play again?')) {
            // jesli uzytkownik nie chce grac jeszcze raz to nic nie rob
            return;
        }
        // jesli uzytkownik chce zagrac jeszcze raz, zresetuj gre
        this.resetGame();
    };
    // resetuj gre, ustawia wszystkie warwtosci na domyslne
    Board.prototype.resetGame = function () {
        // ustawia ze gra sie nie skonczyla
        this.gameEnded = false;
        // ustawia ruchy gracza na 0
        this.playerMoves = 0;
        // ustawia licznik ruchow graczy na 0 w html
        this.counter.innerText = '0';
        // laduje plansze od nowa z html
        this.loadBoard();
    };
    // sprawdz czy w kolumnie jest wygrana
    // X X X
    // - - -
    // - - -
    Board.prototype.checkColumns = function (x, y) {
        for (var i = 0; this.cells.length; i++) {
            if (this.cells[x][i].getValue() !== this.cells[x][y].getValue()) {
                return false;
            }
            if (i === this.cells.length - 1) {
                return true;
            }
        }
        return false;
    };
    // sprawdz czy w wierszu jest wygrana
    // X - -
    // X - -
    // X - -
    Board.prototype.checkRows = function (x, y) {
        for (var i = 0; this.cells.length; i++) {
            if (this.cells[i][y].getValue() !== this.cells[x][y].getValue()) {
                return false;
            }
            if (i === this.cells.length - 1) {
                return true;
            }
        }
        return false;
    };
    // sprawdz czy w przekatnej jest wygrana
    // X - -
    // - X -
    // - - X
    Board.prototype.checkDiagonal = function (x, y) {
        if (x == y) {
            for (var i = 0; i < this.cells.length; i++) {
                if (this.cells[i][i].getValue() != this.cells[x][y].getValue())
                    return false;
                if (i === this.cells.length - 1) {
                    return true;
                }
            }
        }
        return false;
    };
    // sprawdz czy w przekatnej jest wygrana
    // - - X
    // - X -
    // X - -
    Board.prototype.checkAntiDiagonal = function (x, y) {
        if (x + y === this.cells.length - 1) {
            for (var i = 0; i < this.cells.length; i++) {
                if (this.cells[i][(this.cells.length - 1) - i].getValue() !== this.cells[x][y].getValue()) {
                    return false;
                }
                if (i === this.cells.length - 1) {
                    return true;
                }
            }
        }
        return false;
    };
    // sprawdz czy jest remis
    Board.prototype.checkDraw = function () {
        // czy aktualna liczba krokow rowna sie ilosci wszystkich komorek
        return this.playerMoves === Math.pow(this.cells.length, 2);
    };
    // sprwadz czy ktos wygral w danym ruchu
    Board.prototype.checkIfWon = function (x, y) {
        // sprawdz kolumny
        if (this.checkColumns(x, y)) {
            return true;
        }
        // sprawdz wiersze
        if (this.checkRows(x, y)) {
            return true;
        }
        // sprawdz przekatna
        if (this.checkDiagonal(x, y)) {
            return true;
        }
        // sprawdz przeciw przekatna
        if (this.checkAntiDiagonal(x, y)) {
            return true;
        }
        return false;
    };
    return Board;
}());
// stworz plansze
function init() {
    new Board('board');
}
