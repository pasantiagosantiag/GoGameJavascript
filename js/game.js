class Scene {
    #container = null
    #next = null

    constructor(container, next) {

        this.#next = next
        this.#container = container
    }

}
class Option extends Scene {
    #fieldName1 = null
    #fieldName2 = null
    #buttonNext = null
    #buttonReset = null
    #imageURL1 = null

    #imageURL2 = null
    #imageList1 = null
    #imageList2 = null

    constructor(container, next) {
        super(container, next)
        this.#fieldName1 = container.querySelector("#fieldname1")

        this.#fieldName1.addEventListener("keyup", this.#enableNext)

        this.#fieldName2 = container.querySelector("#fieldname2")
        this.#fieldName2.addEventListener("keyup", this.#enableNext)

        this.#imageList1 = container.querySelector("#imageList1")
        this.#imageList2 = container.querySelector("#imageList2")
        this.#buttonNext = container.querySelector("#buttonAceptarConfiguracion")
        this.#buttonNext.disabled = true;
        this.#buttonReset = container.querySelector("#buttonResetConfiguracion")
        this.#buttonReset.addEventListener("click", this.#reset)


        this.#createList()
    }
    #createList() {
        fetch("https://dragonball-api.com/api/characters?page=1&limit=10")
            .then((response) => response.json())
            .then((data) => {

                for (var i = 0; i < data.meta.itemCount; i++) {
                    var img1 = document.createElement("img");
                    img1.src = data.items[i].image;
                    img1.addEventListener("click", this.#selectImg1)
                    imageList1.appendChild(img1);
                    var img2 = document.createElement("img");
                    img2.src = data.items[i].image;
                    imageList2.appendChild(img2);
                    img2.addEventListener("click", this.#selectImg2)

                }
            });
    }
    #selectImg1 = () => {
        if (this.#imageURL1 != null) {
            console.log(this.#imageURL1)
            this.#imageURL1.style.border = "none"

        }
        this.#imageURL1 = this.#imageList1.querySelector("img:hover")
        this.#imageList1.querySelector("img:hover").style.border = "solid 2px red"
        this.#enableNext()
    }
    #selectImg2 = () => {
        if (this.#imageURL2 != null) {
            console.log(this.#imageURL2)
            this.#imageURL2.style.border = "none";
        }
        this.#imageURL2 = this.#imageList2.querySelector("img:hover")
        this.#imageList2.querySelector("img:hover").style.border = "solid 2px red"
        this.#enableNext()
    }
    #reset = () => {
        this.#fieldName1.value = ""
        this.#fieldName2.value = ""

        if (this.#imageURL1 != null) {

            this.#imageURL1.style.border = "none";
        }

        if (this.#imageURL2 != null) {

            this.#imageURL2.style.border = "none";
        }
        this.#imageURL1 = null
        this.#imageURL2 = null
        this.#enableNext()

    }
    #enableNext = () => {

        if (this.#fieldName1.value != "" && this.#fieldName2.value != "" &&
            this.#imageURL1 != null && this.#imageURL2 != null)
            this.#buttonNext.disabled = false
        else
            this.#buttonNext.disabled = true

    }



}
class Game {
    //array de escenas
    #scenes = []
    #actual = 0
    #nextButton = null
    #previusButton = null
    #container = null

    constructor(queryCSS) {
        this.container = document.querySelector(queryCSS)
        for (const child of this.container.querySelectorAll(".scene")) {
            var id = child.getAttribute("id")
            var scene;
            switch (id) {
                case "scene2":
                    scene = new Option(child, this.next)
                    break;
                /* case "step2":
                     step = new SelectHeroes(child, this.#next, this.#previus)
                     break;
                 case "step3":
                     console.log(child)
                     step = new Juego(child, this.#next, this.#previus)
                     break;
                 case "step4":
                     step = new Final(child, this.#next, this.#previus)
                     break;*/

            }
            this.#scenes.push(child)//step)

        }


    }
    #update = () => {
        this.#scenes.forEach((element, index) => {

            element.classList.toggle("active", index == this.#actual);
            console.log(element.classList)
        });

    }
    previus = () => {
        this.#actual > 0 ? this.#actual-- : 0;
        this.#update()
    };
    next = () => {
        //en bucle
        if (this.#actual < (this.#scenes.length - 1))
            this.#actual++;
        else
            this.#actual = 0;

        this.#update()
    }
}
