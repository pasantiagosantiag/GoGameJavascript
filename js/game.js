

class Game {
    //array de escenas
    #scenes = []
    #actual = 0
    #nextButton = null
    #previusButton = null
    #container = null
    #dataplayer1=null
    #dataplayer2=null

    constructor(queryCSS) {
        this.container = document.querySelector(queryCSS)
        for (const child of this.container.querySelectorAll(".scene")) {
            var id = child.getAttribute("id")
            var scene=null;
            switch (id) {
                case "intro":
                    scene = new Intro(child,this.next)
                   break;
                case "config":
                    scene = new Option(child, (options)=>{
                        this.#dataplayer1=options.player1
                        this.#dataplayer2=options.player2
                        this.next()
                    })
                    break;
                 case "goBoard":
                     scene = new GoBoard(child, this.next,{
                         player1: this.#dataplayer1,
                         player2: this.#dataplayer2,
                     })
                     break;
                     /*case "step3":
                     console.log(child)
                     step = new Juego(child, this.#next, this.#previus)
                     break;
                 case "step4":
                     step = new Final(child, this.#next, this.#previus)
                     break;*/

            }
            if(scene!=null)
                this.#scenes.push(scene)
            this.#update()
            //this.#scenes.push(child)//step)

        }


    }
    #update = () => {
        this.#scenes.forEach((element, index) => {
            if(index==2 && index == this.#actual) {
              element.setOptions({
                  player1: this.#dataplayer1,
                  player2: this.#dataplayer2
              })
            }
            element._container.classList.remove("active");
            if(index == this.#actual){
                element._container.classList.add("active");

                element.start()
               
            }
            else{
                element.stop()

            }


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
