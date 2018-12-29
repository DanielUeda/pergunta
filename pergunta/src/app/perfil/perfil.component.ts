import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/model';
import { HttpService } from '../service/http.service';
import {Md5} from 'ts-md5';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

const WS_ATUALIZAR= 'http://localhost:3000/usuario/atualizar'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  public conteudoImg;

  usuario : Usuario;

  constructor(private http: HttpService,
    private router : Router,
    private auth : AuthService) { 

  }

  ngOnInit() {
    this.usuario = this.auth.usuario
  }

  atualizarDados(user: Usuario){
    user.senha = Md5.hashStr(this.usuario.senha) as string;
    this.http.post(WS_ATUALIZAR, user,()=>{});
  }

}
