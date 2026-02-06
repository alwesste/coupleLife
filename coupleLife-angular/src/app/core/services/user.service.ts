import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {UserPurchaseDTO} from '../interfaces/user-purchase';
import {PurchaseDTO} from '../interfaces/purchase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = "http://localhost:8080/api/user";
  constructor(private http: HttpClient) {}


  getUserPurchases(userId: number): Observable<UserPurchaseDTO> {
    return this.http.get<UserPurchaseDTO>(`${this.API_URL}/${userId}/purchases`);
  }

  sendPurchase(userId: number, purchase: PurchaseDTO): Observable<any> {
    console.log('purchase envoyer au back',purchase);
    return this.http.post<PurchaseDTO>(`${this.API_URL}/${userId}/purchase`, purchase);
  }

  deletePurchase(userId: number, purchaseId:number): Observable<any> {
    console.log('purchase supprimer')
    return this.http.delete(`${this.API_URL}/${userId}/purchase/${purchaseId}`);
  }
}
