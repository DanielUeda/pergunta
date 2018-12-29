import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { Usuario, Pergunta } from '../model/model';

const WS_LISTA = 'http://localhost:3000/pergunta/minhasPerguntas'
const WS_SALVAR = 'http://localhost:3000/pergunta/salvar'
const WS_USUARIOS = 'http://localhost:3000/usuario/listar'

@Component({
  selector: 'app-minhasPerguntas',
  templateUrl: './minhasPerguntas.component.html',
  styleUrls: ['./minhasPerguntas.component.css']
})
export class MinhasPerguntasComponent implements OnInit {

  usuario : Usuario;
  perguntas : Pergunta[];
  pergunta : Pergunta = new Pergunta();
  usuarios :Usuario[]

  constructor(private http : HttpService,
    private auth: AuthService,
    private route : Router) { }

  ngOnInit() {
    this.usuario = this.auth.usuario;
    this.listar();
  }

  listar(){
    this.http.get(WS_LISTA + "?usuario=" + this.usuario._id,(res)=>{
        this.perguntas = res;
    });
    this.listarUsuarios()
  }

  listarUsuarios(){
    this.http.get(WS_USUARIOS,(res)=>{
        this.usuarios = res;
    });
  }
  
  perguntar(){
    this.pergunta.remetente = this.usuario
    this.pergunta.dataPergunta = new Date()
    this.http.post(WS_SALVAR, this.pergunta, () =>{
      this.pergunta = new Pergunta()
      this.listar()
    })
}


}
