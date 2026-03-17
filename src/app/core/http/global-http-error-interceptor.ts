import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, retry, tap, throwError } from 'rxjs';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  
  return next(req).pipe(
    retry({ count: 3, delay: 1000 }),
    tap({
      error: (error: HttpErrorResponse) => {
        if ([500, 404].includes(error.status)) {
          snackBar.open(error.message, 'close', {
            duration: 5000
          })
        }
      }
    })
  );
};
