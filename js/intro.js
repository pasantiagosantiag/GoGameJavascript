class Intro extends Scene {
    #sound=null
    constructor(container, next) {
        super(container, next)
        //se le pasa el elemento en el que se pintará el juego, que contienene escenas individuales
        var portada = container.querySelector("#portada");
        var boton_scene1_toscene2 = container.querySelector("#boton_scene1_toscene2");
        this.#sound=container.querySelector(".song");
        boton_scene1_toscene2.addEventListener("click", this._next);
    }
    start(){
        /*
        Chrome: chrome://settings/content/sound
Firefox: about:config y buscar media.autoplay.default
Edge: edge://settings/content/mediaAutoplay
         */
        if(this.#sound!=null){
            this.#sound.play();
        }
    }
    stop(){
        if(this.#sound!=null){
            this.#sound.pause();
        }
    }

    restart(){
    }
}