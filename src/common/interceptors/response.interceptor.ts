import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ResponseDto } from "../dto/response.dto";
import { map, Observable } from "rxjs";

@Injectable() 
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseDto<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>>  {
        return next.handle().pipe(
            map((responseData) => {
                const message = typeof responseData === 'object' && responseData?.message
                                        ? responseData.message
                                        : 'عملیات با موفقیت انجام شد';
                
                const data = typeof responseData === 'object' && responseData?.data
                                        ? responseData.data
                                        : responseData
                
                return {
                    success: true,
                    message,
                    data
                }
            })
        )
    }
}