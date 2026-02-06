import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }


getChache(key: string) {
  localStorage.getItem(key);
}

setChache(key: string, value: Object) {
  localStorage.setItem(key, JSON.stringify(value));
}


}
