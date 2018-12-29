import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Pergunta } from '../model/model';
import { RespostasService } from '../service/respostas.service';

const WS_RESPONDER = 'http://localhost:3000/pergunta/atualizar'

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrls: ['./respostas.component.css']
})
export class RespostasComponent implements OnInit {

  constructor(private http : HttpService,
              private auth : AuthService,
              private router : Router,
              private resp : RespostasService
            ) { }

  pergunta: Pergunta

  ngOnInit() {
    this.pergunta = this.resp.getPergunta()
  }

  cancelar(){
    this.router.navigateByUrl("")
  }

  responder(){
    this.http.post(WS_RESPONDER, this.pergunta, () => {
      this.router.navigateByUrl("")
    })
  }
}