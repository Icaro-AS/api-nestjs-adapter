import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsuarioModulo } from './usuario/usuario.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroDeExcecaoHttp } from './common/filtros/filtro-de-excecao-fttp.filter';
import { TransformaRespostaInterceptor } from './core/http/transforma-resposta.interceptor';


@Module({
  imports: [UsuarioModulo],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoHttp
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass:TransformaRespostaInterceptor
    }
  ],
})
export class AppModule {}
