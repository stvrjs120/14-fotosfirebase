import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const storageRef = firebase.storage().ref();

    for (const image of imagenes) {

      image.loading = true;
      if (image.progress >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${this.CARPETA_IMAGENES}/${image.nombreArchivo}`)
          .put(image.archivo);


      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => image.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error al subir', error),
        () => {
          console.log('Imagen cargada');
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            image.url = downloadURL;
            image.loading = false;
            this.guardarImagen({
              nombre: image.nombreArchivo,
              url: image.url
            });
          });
        });
    }
  }

  private guardarImagen( imagen: { nombre: string, url: string } ) {

    this.db.collection(`/${ this.CARPETA_IMAGENES }`)
            .add( imagen );

  }
}
