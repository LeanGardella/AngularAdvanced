import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.contarTres().then( (status) => console.log('Finalizò promesa', status)).catch( (err) => console.error('error: ' + err));
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0 ;
      const interval = setInterval( () => {
        contador++;
        console.log(contador);
        if ( contador === 3 ) { 
          clearInterval(interval);
          resolve(true);
          // reject('un simple error');
        }
      }, 1000);
    });

  }

}
