import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationStart } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { HttpService } from './service/http.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MinhasPerguntasComponent } from './minhasPerguntas/minhasPerguntas.component';
import { RespostasComponent } from './respostas/respostas.component';
import { RespostasService } from './service/respostas.service';

const rotas : Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'home', component: HomeComponent, children: [
    {path: 'timeline', component: TimelineComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'minhasPerguntas', component: MinhasPerguntasComponent},
    {path: '', pathMatch:'full', redirectTo:'timeline'}
  ]},
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'resposta', component: RespostasComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    TimelineComponent,
    PerfilComponent,
    MinhasPerguntasComponent,
    RespostasComponent 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rotas),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, HttpService,RespostasService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  constructor(private router: Router,
  private auth : AuthService){
    this.definirNavListener();
  }

definirNavListener(): any {
  this.router.events.subscribe( e=>{
    if (e instanceof NavigationStart){
      if (e.url.startsWith('/home') && !this.auth.usuario){
        this.router.navigateByUrl('/login');
      } else if ( (e.url == '/' || e.url =='/login') && this.auth.usuario){
        this.router.navigateByUrl('/home')
      }
    }
  })
} 
}
