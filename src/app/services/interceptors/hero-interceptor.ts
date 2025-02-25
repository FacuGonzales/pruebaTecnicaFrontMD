import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SuperHero } from '../../models/super-hero-model';

export const heroInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  if (req.url.includes('assets/i18n')) return next(req);

  return next(req).pipe(
    map((e: HttpEvent<any>) => {
      if(e instanceof HttpResponse) {
        if(e.body) {
          if(Array.isArray(e.body)) {
            const formatData = e.body.map(formatHero);
            return e.clone({ body: formatData })
          } else {
            const formatData = formatHero(e.body);
            return e.clone({ body: formatData })
          }
        }
      }
      return e;
    })
  )
}

export function formatHero(data: any): SuperHero {
  return {
    id: data?.id,
    name: data?.name,
    images: {
      xs: data?.images?.xs,
      sm: data?.images?.sm,
      md: data?.images?.md,
      lg: data?.images?.lg
    },
    appearance: {
      gender: data?.appearance?.gender,
      height: data?.appearance?.height,
      weight: data?.appearance?.weight,
      race: data?.appearance?.race
    },
    biography: {
      aliases: data?.biography?.aliases,
      alignment: data?.biography?.alignment,
      firstAppearance: data?.biography?.firstAppearance,
      fullName: data?.biography?.fullName,
      placeOfBirth: data?.biography?.placeOfBirth,
      publisher: data?.biography?.publisher
    },
    powerstats: {
      combat: data?.powerstats?.combat,
      durability: data?.powerstats?.durability,
      intelligence: data?.powerstats?.intelligence,
      power: data?.powerstats?.power,
      speed: data?.powerstats?.speed,
      strength: data?.powerstats?.strength
    }
  };
}
