# Ejemplo proyecto Javascript. Juego Go

Implementación simplificada del famoso juego [Go](https://es.wikipedia.org/wiki/Go). En esta versión gana el jugador que
posea la mitad de las posiciones más uno, y no se tiene en cuenta regiones, limitaciones en posicionar piezas...

Se tiene una serie de escenas o pantallas:

- Introducción
- Elección de personajes
- Tablero
- Finalización


Se decide crear un sitio web tipo [SPA](https://es.wikipedia.org/wiki/Single-page_application), de forma que no sea necesario
recargar la página para "navegar" entre las diferentes escenas.

**En JavaScript se pueden crear aplicaciones usando muchas técnicas y filosofías, por ejemplo, crear todos los elementos
usando únicamente JavaScript (sin prácticamente HTML) o usar diferentes características de JavaScript que no existen en otros lenguajes.
En este caso se intenta aplicar principios de la POO, e interactuar sobre etiquetas HTML/CSS creadas.**


## Estructura del proyecto

Posee la estructura clásica de una aplicación web:

- index.html  Página principal, en este caso la única página web
- css         Carpeta con los estilos
- imgs        Imágenes usadas en la web
- js          Ficheros js
- sounds      Carpeta nueva, contiene la música del proyecto

## Escenas o pantallas

En casi todo los juegos se tiene diferentes escenas o pantallas, teniendo que realizar una gestión unificacada de todas ellas de 
forma sencilla: Pasa a la siguiente escena, iniciar la escena, abandonar la escena...

Se hace uso de las características de la POO, en concreto las interfaces/clases abstractas (al estilo Javascript...). 
Se define en el fichero /js/scene una clase abstracta (una forma para hacer un método abstracto en JavaScript es hacer saltar una excepción si se llama
al método)

```js
class Scene {
    _container = null  //elemento HTML sobre el que se construye la escena
    _next = null  //escena siguiente
    constructor(container, next) {
        this._next = next
        this._container = container
    }
    start(){
        throw new Error('Método Start de la Scene(Clase base abstracta), se tiene que implementar en el hijo');
    }
    stop(){
        throw new Error('Método Stop de cla Scene(Clase base abstracta), se tiene que implementar en el hijo');

    }
    restart(){
        throw new Error('Método Restart de la Scene(Clase base abstracta), se tiene que implementar en el hijo');
    }
}
```

Ahora para definir una nueva escena, se ha de heredad de la clase escene, implementar los métodos abstractos y añadir la lógica propia de la 
escena. Por ejemplo, en la escena de introducción:

```js
class Intro extends Scene {
    //atributos de la escena 
    #sound = null
    //constructor
    constructor(container, next) {
        //llamada constructor clase base
        super(container, next)
        //obteniendo elementos del DOM necesarios para la escena
        //configuración de escuchadores de eventos y asociarlos a métodos internos de la clase
        var portada = container.querySelector("#portada");
        var boton_scene1_toscene2 = container.querySelector("#boton_scene1_toscene2");
        boton_scene1_toscene2.addEventListener("click", this._next);
        //inicio del sonido
        this.#sound = container.querySelector(".song");

    }
    /**
     * Implementación método abstrcato
     */
    start() {
        /*
        Chrome: chrome://settings/content/sound
        Firefox: about:config y buscar media.autoplay.default
        Edge: edge://settings/content/mediaAutoplay
         */
        if (this.#sound != null) {
            this.#sound.play();
        }
    }
    /**
     * Implementación método abstrcato
     */
    stop() {
        if (this.#sound != null) {
            this.#sound.pause();
        }
    }
    /**
     * Implementación método abstrcato, no es una buena práctica POO se debería
     * no tener estos casos, pero añade complejidad al desarrollo
     */
    restart() {
    }
}
```

Esta clase es sencilla, hereda de Scene, contiene únicamente un atributo/propiedad: el sonido. Implementa los métodos abstratos de la clase
scene y configura en el constructor los eventos.

### Clase Game

Se necesita un elemento que gestione la creación de las escenas, este elemento es la clase Game que se encuentra en el fichero js/game.js.  A partir de las etiquetas HTML con un id concreto se crean las escenas y se añaden a una lista.


```js
class Game {
    //array de escenas
    #scenes = []
    #actual = 0
    //para pruebas de funcioanmiento
    //#nextButton = null
    //#previusButton = null
    #container = null
    #dataplayer1 = null
    #dataplayer2 = null

    /**
     * se le pasa el contenedor en que se creara el juego
     * crea y añade al array asociativo scenes las diferentes escenas
     * @param queryCSS
     */
    constructor(queryCSS) {
        this.container = document.querySelector(queryCSS)
        for (const child of this.container.querySelectorAll(".scene")) {
            var id = child.getAttribute("id")
            var scene = null;
            switch (id) {
                case "intro":
                    scene = new Intro(child, this.next)
                    break;
                case "config":
                    scene = new Option(child, (options) => {
                        this.#dataplayer1 = options.player1
                        this.#dataplayer2 = options.player2
                        this.next()
                    })
                    break;
                case "goBoard":
                    scene = new GoBoard(child, this.next, {
                        player1: this.#dataplayer1,
                        player2: this.#dataplayer2,
                    })
                    break;
                case "end":

                    scene = new End(child, this.next)
                    break;
            }
            //se añaden al array asociativo/lista
            if (scene != null)
                this.#scenes.push(scene)
            this.#update()
        }
    }

    /**
     * método privado #, cambia a visible/no visible las diferentes escenas
     */
    #update = () => {
        this.#scenes.forEach((element, index) => {
            if (index == 2 && index == this.#actual) {
                element.setOptions({
                    player1: this.#dataplayer1,
                    player2: this.#dataplayer2
                })
            }
            element._container.classList.remove("active");
            if (index == this.#actual) {
                element._container.classList.add("active");
                element.start()
            } else {
                element.stop()
            }
        });

    }
    /**
     * funcionles lambda (almacenado en variable) que cambia la escena actual
     */
    previus = () => {
        this.#actual > 0 ? this.#actual-- : 0;
        this.#update()
    };
    /**
     * funcionles lambda (almacenado en variable) que cambia la escena actual
     */
    next = () => {
        //en bucle

        if (this.#actual < (this.#scenes.length - 1))
            this.#actual++;
        else
            this.#actual = 0;
        this.#update()
    }
}

```
En la página HTML se tiene las diferentes etiquetas con las escenas ( *se puede hacer de muchas formas distintas, en este caso es para prácticar la selecciñon de nodos DOM*):

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Go Game</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/intro.css">
    <link rel="stylesheet" href="css/options.css">
    <link rel="stylesheet" href="css/goBoard.css">
    <!--se incluyen las diferentes clases js-->
    <script src="js/scene.js"></script>
    <script src="js/intro.js"></script>
    <script src="js/options.js"></script>
    <script src="js/end.js"></script>
    <script src="js/goBoard.js"></script>
    <script src="js/game.js"></script>
    <script>
        var game = null;
        //inicio del juego, se ejecuta al terminar la carga de la página ( <body onload="iniciar()...)
        function iniciar() {
            game = new Game(".dam-game");
        }
    </script>
</head>

<body onload="iniciar()">
<!--contenedor principal-->
<main class="dam-game">

    <div class="scene active" id="intro">
        <audio class="song">
...
```

Por ejemplo, para crear la escena intro se obtiene el nodo con id intro y se pasa al constructor de la clase Intro, junto con la función lamda de siguiente (se llama dentro de la escena, de forma que 
se ejecuta el código de la clase  Game)

## Clases Intro y End

No destacan en nada, simplemente un SVG con un botón para ir al siguiente.

## Clase Options
