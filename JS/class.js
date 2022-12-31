class Calculador{
    constructor (horassolar,consumo,potencia){
        this.horassolar = horassolar
        this.consumo = consumo
        this.potencia = potencia 
    }

    calculoPaneles (){
       return Math.ceil((((this.consumo*1000*12)/this.horassolar)/this.potencia)) 
    }
}