import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //inject dependency
  private http = inject(HttpClient);



  constructor() { }

  getProducts(category_id?: string, productLimit?: number){
    const url = new URL('https://api.escuelajs.co/api/v1/products');
    const offset = 0;

    if(category_id)
      url.searchParams.set('categoryId', category_id);

    if(productLimit){
      url.searchParams.set('offset', offset.toString())
      url.searchParams.set('limit', productLimit.toString())
    }

    return this.http.get<Product[]>(url.toString());
  }

  getOneProduct(id: string){
    return this.http.get<Product>('https://api.escuelajs.co/api/v1/products/' + id);
  }

  //Obtenemos productos similares por categoria
  getSimilarProducts(categoryId : number){
    const url = new URL('https://api.escuelajs.co/api/v1/products?offset=0&limit=8')

    url.searchParams.set('categoryId', categoryId.toString());
    
    return this.http.get<Product[]>(url.toString());
  }
}
