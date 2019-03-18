import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { nombre: string; url: string; }

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  items: Observable<Item[]>;

  constructor(private db: AngularFirestore) {
    this.items = db.collection<Item>('img').valueChanges();
  }

  ngOnInit() {
  }

}
