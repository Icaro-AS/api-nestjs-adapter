import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsNomeDeUsuarioUnico } from "./is-nome-de-usuario-unico-validadator";
import { Exclude, Expose } from "class-transformer";

export class Usuario {
    @Expose({name: 'id'})
    id: number;
 
    @IsNomeDeUsuarioUnico({message:"nomeDeUsuario precisa ser único"})
    @IsNotEmpty({message: 'nomeDeUsuario é obrigatório.'})
    @IsString({message: 'nomeDeUsuario precisa ser uma string.'})
    @Expose({name: 'username'})
    nomeDeUsuario: string;
 
    @IsEmail({}, {message: 'email precisa ser um endereço de email válido.'})
    @Expose({name: 'email'})
    email: string;
 
    @IsNotEmpty({message: 'senha é obrigatório.'})
    @Exclude({toPlainOnly:true})
    @Expose({name: 'password'})
    senha: string;
 
    @IsNotEmpty({message: 'nomeCompleto é obrigatório.'})
    @Expose({name: 'fullname'})
    nomeCompleto: string;
 
    @Expose({name: 'joindate'})
    dataDeEntrada: Date;
 }