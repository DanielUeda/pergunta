export class Usuario{
    public _id : string;
    public login : string;
    public senha : string;
    public nome : string;
    public email : string;
    public bio : string;
    public foto : string;
}

export class Pergunta{
    public _id : string;
    public descricao : string;
    public dataPergunta : Date;
    public remetente : Usuario;
    public destinatario : Usuario;
    public reposta : string;
    public dataResposta : Date;
}