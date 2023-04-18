import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, pipe } from "rxjs";
import { map } from "rxjs/operators";
import { NestResponse } from "./nest-response";
@Injectable()
export class TransformaRespostaInterceptor implements NestInterceptor{

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost){
        this.httpAdapter = adapterHost.httpAdapter;
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<any>{
        return next.handle()
                    .pipe(
                        map((respostaDoControlador: NestResponse) => {
                            if(respostaDoControlador instanceof NestResponse){
                                const contexto = context.switchToHttp();
                                const response = contexto.getResponse();
                                const {headers, status, body} = respostaDoControlador;

                                const nomesDosCabeçalhos = Object.getOwnPropertyNames(headers);
                                nomesDosCabeçalhos.forEach( nomeDoCabeçalho =>{
                                    const valorDoCabecalho = headers[nomeDoCabeçalho];
                                    this.httpAdapter.setHeader(response, nomeDoCabeçalho, valorDoCabecalho)                               
                                });

                                this.httpAdapter.status(response, status);

                                return body;
                        }
                            return respostaDoControlador;
                        })
                    );
    }

}