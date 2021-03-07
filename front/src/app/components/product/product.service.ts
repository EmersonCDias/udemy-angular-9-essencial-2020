import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";

import { Product } from "./product.model";
import {EMPTY, Observable} from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  baseApiUrl = 'http://localhost:3001/products'

  constructor(
      private snackBar: MatSnackBar,
      private httpClient: HttpClient,
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }

  create(product: Product): Observable<Product> {
    return this.httpClient
        .post<Product>(this.baseApiUrl, product)
        .pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e)),
        )
  }

  read(): Observable<Product[]> {
    return this.httpClient
        .get<Product[]>(this.baseApiUrl)
        .pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e)),
        );
  }

  readById(id: string | null): Observable<Product> {
    return this.httpClient
        .get<Product>(`${this.baseApiUrl}/${id}`)
        .pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e)),
        );
  }

  update(product: Product): Observable<Product> {
    return this.httpClient
        .put<Product>(`${this.baseApiUrl}/${product.id}`, product)
        .pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e)),
        );
  }

  delete(id: number | undefined): Observable<Product> {
    return this.httpClient
        .delete<Product>(`${this.baseApiUrl}/${id}`)
        .pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e)),
        )
  }
}
