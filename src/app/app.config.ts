import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideFunctions, getFunctions, connectFunctionsEmulator} from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging()),
    // Si estás usando emuladores en desarrollo:
    ...(environment.useEmulators ? [
      // No es necesario envolver en provide(), ya que connect*Emulator no devuelve un provider
      { provide: 'connectAuthEmulator', useValue: connectAuthEmulator },
      { provide: 'connectFirestoreEmulator', useValue: connectFirestoreEmulator },
      { provide: 'connectFunctionsEmulator', useValue: connectFunctionsEmulator },
      { provide: 'connectStorageEmulator', useValue: connectStorageEmulator },
    ] : []),
  ],
};
