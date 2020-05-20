export class Table {
    element: HTMLTableElement;
    idCount: number = 0

    constructor(id){
        this.element = <HTMLTableElement>document.getElementById(id);
        this.element.appendChild(this.getHeader())
    }
    add(data, { setForm }): void{
        const trBody = document.createElement("tr");
        trBody.id = this.element.id + "_" + this.idCount++

        const tdImie = document.createElement("td");
        const tdNazwisko = document.createElement("td");
        const tdCheck = document.createElement("td");
        const tdUwagi = document.createElement("td");
        const tdMail = document.createElement("td");
        const tdUsun = document.createElement("td");
        const tdEdytuj = document.createElement("td");

        const usunBtn = document.createElement("button");
        usunBtn.addEventListener("click", () => {
            this.element.removeChild(trBody);
        })

        const edytujBtn = document.createElement("button");
        edytujBtn.addEventListener("click", () => {
            setForm(trBody.id, data)
        })

        tdUsun.appendChild(usunBtn);
        tdEdytuj.appendChild(edytujBtn)

        tdImie.innerText = data.imie;
        tdNazwisko.innerText = data.nazwisko;
        tdCheck.innerText = data["e-learning"];
        tdUwagi.innerText = data.uwagi;
        tdMail.innerText = data.email;

        trBody.appendChild(tdImie);
        trBody.appendChild(tdNazwisko);
        trBody.appendChild(tdCheck);
        trBody.appendChild(tdUwagi);
        trBody.appendChild(tdMail);
        trBody.appendChild(tdUsun);
        trBody.appendChild(tdEdytuj);

        this.element.appendChild(trBody);

    }

    edit(rowId, data) {
        const row = <HTMLTableRowElement>document.getElementById(rowId)
        const rowElement = this.element.rows[row.rowIndex]
        console.log(rowElement, rowElement.children)
    }

    getHeader() {
        const trHead = document.createElement("tr");
        const thImie = document.createElement("th");
        const thNazwisko = document.createElement("th");
        const thCheck = document.createElement("th");
        const thUwagi = document.createElement("th");
        const thMail = document.createElement("th");
        const thUsun = document.createElement("th");
        const thEdytuj = document.createElement("th");


        thImie.innerText = "imie";
        thNazwisko.innerText = "nazwisko";
        thCheck.innerText = "e-learning";
        thUwagi.innerText = "uwagi";
        thMail.innerText = "email";
        thUsun.innerText = "usun";
        thEdytuj.innerText = "Edytuj";
        


        trHead.appendChild(thImie);
        trHead.appendChild(thNazwisko);
        trHead.appendChild(thCheck);
        trHead.appendChild(thUwagi);
        trHead.appendChild(thMail);
        trHead.appendChild(thUsun);
        trHead.appendChild(thEdytuj);

    

        return trHead
    }
}
