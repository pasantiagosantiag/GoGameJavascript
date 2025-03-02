class GoBoard extends Scene {

    _options = null
    #rows = 19
    #cols = 19
    #turn = 0

    constructor(container, next) {
        super(container, next)
        this._options = {
            player1:{
                name:"Player 1",
                url: "./images/musculman.jpg",
            },
            player2:{
                name:"Player 2",
                url: "./images/musculman.jpg",
            }
        }

    }
    setOptions(options) {
        this._options = options
        console.log("l----------as opciones son "+options)
        console.log(options)
        console.log(this._container)
        //no se debe hacer, se realiza como ejemplo
        this._container.querySelector("#infoPlayer1 .nombrePlayer").innerHTML = options.player1.name
        this._container.querySelector("#infoPlayer1 .imagenPlayer img").src = options.player1.url

        //no se debe hacer, se realiza como ejemplo
        this._container.querySelector("#infoPlayer2 .nombrePlayer").innerHTML = options.player2.name
        this._container.querySelector("#infoPlayer2 .imagenPlayer img").src = options.player2.url
    }
    #evalBoard() {

    }

    getTurn() {
        return this.#turn
    }

    toggleTurn() {
        this.#turn = !this.#turn
    }
    #createCircle(node){

    }

    #createNode(row, board) {
        var nodo = document.createElement("div")
        nodo.classList.add("cell")
        //para que no de excepcion



        //nodo.classList.add("cell_with_circle")
        nodo.addEventListener("click", (event) => {
            var node = event.target
            console.log(this)
             if (!node.classList.contains("circle")) {
                /*var node=this.#getCellFreeInColumn(event)
                if(node!=null){*/
                var circle = document.createElement("div")

                circle.classList.add("circle")
                if (this.getTurn()) {
                    circle.style.backgroundImage="url('"+this._options.player1.url+"')";
                    circle.classList.add("circle_playerOne")

                } else {
                    circle.style.backgroundImage="url('"+this._options.player2.url+"')";

                    circle.classList.add("circle_playerTwo")
                }
                this.toggleTurn();
                // node.classList.remove("cell_with_circle")
                node.appendChild(circle)
            }
            /* }*/
        })
        row.appendChild(nodo)

    }

    #createBoard() {

        //se crea la fina
        for (var i = 0; i < this.#rows; i++) {
            var row = document.createElement("div")
            row.classList.add("row")
            document.getElementById("board").appendChild(row)
            //se crean las columnas
            for (var j = 0; j < this.#cols; j++) {
                this.#createNode( row)
            }

        }

    }

    getCellFreeInColumn(event) {
        var cell = event.target
        console.log(cell)
        var column = this.#getColumn(cell, cell.parentElement)
        console.log("el resultado de la columna es " + column)
        var rows = cell.parentElement.parentElement
        var encontrado = null
        for (var index = this.#rows - 1; index >= 0 && encontrado == null; index--) {
            //esta vacio
            console.log()
            if (rows.children[index].children[column] != undefined && rows.children[index].children[column].childNodes.length == 0) {
                encontrado = rows.children[index].children[column]
            }
            // console.log(element.children[column])
        }
        ;
        return encontrado
    }

    #getColumn(cell, parent) {
        var index = 0;
        var childrens = parent.childNodes
        while (childrens[index] != cell && index < childrens.length) {
            index++
        }
        return index;

    }

    //this._container.appendChild(svg);

    #reset = () => {
        var nodes = document.getElementById("board").childNodes
        console.log(this)
        nodes.forEach((element, index) => {
            //filas
            element.childNodes.forEach(((cell, index) => {
                //celdas
                console.log(cell)
                if ((cell.nodeType === Node.ELEMENT_NODE)) {
                    if (!cell.classList.contains("cell_with_circle"))
                        cell.classList.add("cell_with_circle")
                    if (cell.firstChild != null) {
                        cell.removeChild(cell.firstChild)
                    }
                }
            }))

        });

    }

    start(){
        this.#reset()
        this.#createBoard();
        console.log("llamandoooo")

    }
    stop(){

    }

    restart(){
        this.#reset()
        this.#createBoard()
    }
}
