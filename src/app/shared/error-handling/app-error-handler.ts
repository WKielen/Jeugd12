import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    handleError(error: any) {

/***************************************************************************************************
/ Als er een fout komt uit de firebase library, komt deze eerst door deze handler voordat de catch
/ gebeurd in deze app. Hierdoor komt er altijd een alert box. Om dit te voorkomen, negeer ik de
/ error message door op de properties code en message te testen en dan maar te hopen dat andere
/ messages deze niet hebben. Het is niet mooi maar ik weet even geen oplossing.
/***************************************************************************************************/
        if (error.hasOwnProperty('message') && !error.hasOwnProperty('user')) {
          alert (error.message);
          return;
        }

        if (error.hasOwnProperty('code') && error.hasOwnProperty('message') && error.hasOwnProperty('a'))
          return;

        console.log(error);

        if (error.originalError && error.originalError.StatusText) {
            alert (error.originalError.StatusText);
            return;
        }

        if (error.originalError && error.originalError.error) {
            alert (error.originalError.error);
            return;
        }

        if (error.originalError) {
            alert (error.originalError);
            return;
        }
        alert('Oeps, een onverwachte fout.');
    }
}
