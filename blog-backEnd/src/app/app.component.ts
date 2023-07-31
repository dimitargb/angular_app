import { Component, Inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-blog';
  

  firestore: Firestore = Inject(Firestore);

  constructor() {

  }
}
