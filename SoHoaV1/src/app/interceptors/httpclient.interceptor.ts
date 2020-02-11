// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// @Injectable()
// export class HttpClientInterceptor implements HttpInterceptor {
//     constructor() { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//             request = request.clone({
//                 // setHeaders: {
//                 //     'Access-Control-Allow-Origin': '*',
//                 //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//                 //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
//                 //     'Content-Type': 'application/json',
//                 // }
//                 setHeaders: {
//                     'Access-Control-Allow-Origin': 'https://localhost:44357/',
//                 }
//             });
//         return next.handle(request);
//     }
// }