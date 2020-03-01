import { HttpHeaders } from '@angular/common/http';

export const ApiUrl = {
    apiUrl: "https://localhost:44357/api/",
    prod: true
};

export const HttpHeadersOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}