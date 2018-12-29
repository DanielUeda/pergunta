import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';
import { Usuario, Pergunta } from '../model/model';
import { Router } from '@angular/router';
import { RespostasService } from '../service/respostas.service';

const WS_LISTA = 'http://localhost:3000/pergunta/listar'
const WS_SALVAR = 'http://localhost:3000/pergunta/salvar'
const WS_EXCLUIR = 'http://localhost:3000/pergunta/excluir/'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  usuario : Usuario;
  perguntas : Pergunta[];
  pergunta : Pergunta = new Pergunta();

  constructor(private auth: AuthService,
    private http : HttpService,
    private router: Router,
    private resp : RespostasService) { }

  ngOnInit() {
    this.usuario = this.auth.usuario;
    this.listar();
  }

  listar(){

    this.http.get(WS_LISTA + "?usuario=" + this.usuario._id, (ret)=>{
      this.perguntas = ret;
    })
  }

  salvar(){
    this.pergunta.remetente = this.usuario;
    console.log(this.pergunta)
    this.http.post(WS_SALVAR, this.pergunta, ()=>{
      this.pergunta = new Pergunta();
      this.listar()
    })
  }

  ignorar(id : string,cb : () => void){
    this.http.get(WS_EXCLUIR + id,()=>{
      this.listar()})
  }

  resposta(p: Pergunta){
    this.resp.setPergunta(p)
    this.router.navigateByUrl('/resposta')
  }


}
