import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from './core/constants/constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule,
    ]),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'employee-management-c1a06',
        appId: '1:481676635426:web:3c371ff5fdd31fbabf497b',
        databaseURL:
          'https://employee-management-c1a06-default-rtdb.firebaseio.com',
        storageBucket: 'employee-management-c1a06.firebasestorage.app',
        apiKey: 'AIzaSyB80VTr7cPxvt1N8cX5DXRaO1z_VWinuJo',
        authDomain: 'employee-management-c1a06.firebaseapp.com',
        messagingSenderId: '481676635426',
        measurementId: 'G-LWLWMSWGE9',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
