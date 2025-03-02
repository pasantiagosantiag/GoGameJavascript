class Scene {
    _container = null
    _next = null
    constructor(container, next) {
        this._next = next
        this._container = container
    }
    start(){
        throw new Error('Método Start de clas Scene(Clase base abstracta), se tiene que implementar en el hijo');
    }
    stop(){
        throw new Error('Método Start de clas Scene(Clase base abstracta), se tiene que implementar en el hijo');

    }
  
    restart(){
        throw new Error('Método Start de clas Scene(Clase base abstracta), se tiene que implementar en el hijo');
    }

}