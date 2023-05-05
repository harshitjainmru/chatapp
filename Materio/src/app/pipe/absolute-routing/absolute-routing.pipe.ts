import { Pipe, PipeTransform } from '@angular/core';
import * as routes from '../../constant/absolute-routes'
@Pipe({
  name: 'absoluteRouting'
})
export class AbsoluteRoutingPipe implements PipeTransform {

  transform(route:any) {
    return routes[route];
  }

}
