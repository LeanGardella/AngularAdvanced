import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, observable, Subscription } from 'rxjs';
// import { retry } from 'rxjs/operators';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subs: Subscription;
  constructor() { 

    this.subs = this.contarTres()// .pipe(retry(2)) // permite reintentar ante error, el número de veces indicado por parámetro
    .subscribe(
      num => console.log('Numero ', num ),
      error => console.error('Error! ', error),
      () => console.log('fin')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  contarTres(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        // if ( contador === 3 ) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if ( contador === 2 ) {
        //  // clearInterval(intervalo);
        //   observer.error('auxiliooo!');
        // }

      }, 1000);
    }).pipe( map(data => data.valor),
      filter( (v) => {
        if ( v % 2 === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
