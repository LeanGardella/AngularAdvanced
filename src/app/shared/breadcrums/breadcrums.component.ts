import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  title = 'Nueva página';

  constructor(private router: Router, private htmlTitle: Title, private meta: Meta) { 
   
    this.getDataRoute().subscribe( (data) => {
      this.title = data.title;
      this.htmlTitle.setTitle(this.title + ' - MedicalPRO');

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.title
      };

      meta.updateTag(metaTag);
      });
  }
  
  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( (event) => (event instanceof ActivationEnd)),
      filter( (event: ActivationEnd) => (event.snapshot.firstChild === null)),
      map( (event: ActivationEnd ) => (event.snapshot.data))
      );
  }

}
