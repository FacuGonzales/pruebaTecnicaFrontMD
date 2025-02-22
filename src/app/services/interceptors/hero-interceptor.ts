import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SuperHero } from '../../models/super-hero-model';

export const heroInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    map((e: HttpEvent<any>) => {
      if(e instanceof HttpResponse) {
        if(e.body) {
          if(Array.isArray(e.body)) {
            const formatData = e.body.map(formatHero);
            return e.clone({ body: formatData })
          } else {
            const formData = e.body.map(formatHero);
            return e.clone({ body: formData })
          }
        }
      }
      return e;
    })
  )
}

export function formatHero(data: any): SuperHero {
  return {
    id: data.id,
    name: data.name,
    images: data.images,
    appearance: data.appearance,
    biography: data.biography,
    connections: data.connections,
    powerstats: data.powerstats
  };
}
