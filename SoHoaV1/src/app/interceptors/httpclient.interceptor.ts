import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            request = request.clone({
                setHeaders: {
                    'Cache-Control': 'no-store',
                    Pragma: 'no-cache'
                }
            });
        return next.handle(request);
    }
}