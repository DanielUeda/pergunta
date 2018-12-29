import { Injectable } from "@angular/core";
import { Pergunta } from "../model/model";

@Injectable()
export class RespostasService {

    pergunta : Pergunta

    constructor(){

    }

    setPergunta (p : Pergunta){
        this.pergunta = p
    }
    
    getPergunta (){
        return this.pergunta
    }
}