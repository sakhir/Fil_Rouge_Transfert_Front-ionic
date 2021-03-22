
import { HttpEvent,  HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS ,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , from  } from 'rxjs';
import { Storage } from  '@ionic/storage';
import {  mergeMap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { JwtHelperService } from "@auth0/angular-jwt";

const TOKEN_HEADER_KEY = 'Authorization';
const helper = new JwtHelperService();
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  protected url   = 'http://127.0.0.1:8000/api';
  protected debug = true;
  constructor( private  storage:  Storage , private autha : AuthentificationService ){

  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const token = this.storage.get('token');
    //console.log(token);
    

    // if (token) {
    //   //return du json
    //   req = req.clone({ headers: req.headers.set('Accept', 'application/json')})
    //   const cloneRequest = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer '+ token)})
    //   return next.handle(cloneRequest);
    // }else {
    //   return next.handle(req);
    // } 
 
    // return from(this.storage.get('token'))
    // .pipe(
      
    //     switchMap(token => {
    //      if(token) {   
    //       request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer '+ token.token ) }); 
    //      }
    //      if (!request.headers.has('Content-Type')) {
           
           
    //       request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    //     }
     
    //       //request = request.clone({ url:request.url });

    //         return next.handle(request).pipe(
    //             map((event: HttpEvent<any>) => {
    //                 if (event instanceof HttpResponse) {
    //                     // do nothing for now
    //                 }
    //                 return event;
    //             }),
    //             catchError((error: HttpErrorResponse) => {
    //                 const status =  error.status;
    //                 const reason = error && error.error.reason ? error.error.reason : '';

    //                 this.presentAlert(status, reason);
    //                 return throwError(error);
    //             })
    //         );
    //     })
    // );


     // autre test  

     // fin autre test 
     return from(this.storage.get('token')).pipe(mergeMap(token => {
     
      if (token ) { 
        
        request = request.clone({ headers: request.headers.set('Accept', 'application/json')})
        const cloneRequest = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer '+ token)})      
        return next.handle(cloneRequest);
      }else {
        this.autha.logout(); 
        return next.handle(request);   
    }

  })) 

  }

  }

export const InterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}