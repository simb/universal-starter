import {Component, Directive, ElementRef, Renderer} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';


@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // we must interact with the dom through Renderer for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}



@Component({
  selector: 'home',
  template: `
  Home
  `
})
export class Home {
}

@Component({
  selector: 'about',
  providers: [HTTP_PROVIDERS],
  template: `
  <h2>About</h2>
  <ul>
    <li *ngFor="#user of users">{{user}}</li>
  </ul>
  `
})
export class About {
  users:Array<string>;
  constructor(public http:Http){
    http.get('/api/v1/users').subscribe((res)=>{
      this.users = res.json();
    })
  }
}


@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  styles: [`
    .router-link-active {
      background-color: lightgray;
    }
  `],
  template: `
  <div>
    <nav>
      <a [routerLink]=" ['./Home'] ">Home</a>
      <a [routerLink]=" ['./About'] ">About</a>
    </nav>
    <div>
      <span x-large>Hello, {{ name }}!</span>
    </div>

    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' }
])
export class App {
  name: string = 'Angular 2';
}


