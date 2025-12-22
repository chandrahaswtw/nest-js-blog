import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import type { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appEnv: ConfigType<typeof appConfig>,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => ({
        apiVersion: this.appEnv.version,
        data: data,
      })),
    );
  }
}
