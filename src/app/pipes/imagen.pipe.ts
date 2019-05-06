import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    if ( !img ) { // Si no mando nada
      return url += '/usuario/noimage';
    }
    if ( img.indexOf('https') >= 0 ) { // Si es de google
      return url = img;
    }

    switch ( type ) {
      case 'usuario':
      url += '/usuario/' + img;
      break;
      case 'medico':
      url += '/medico/' + img;
      break;
      case 'hospital':
      url += '/hospital/' + img;
      break;
      default:
      url += '/usuario/noimage';
      break;
    }
    return url;
  }

}
