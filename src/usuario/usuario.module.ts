import { Module } from "@nestjs/common";
import { UsuarioController } from "./UsuarioController";
import { UsuarioService } from "./usuario.service";
import { IsNomeDeUsuarioUnicoConstraint } from "./is-nome-de-usuario0unico-validadator";


@Module({
    controllers: [UsuarioController],
    providers:[UsuarioService,
              IsNomeDeUsuarioUnicoConstraint]
})
export class UsuarioModulo{}
