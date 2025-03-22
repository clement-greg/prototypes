import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerpapiService {

  constructor(private http: HttpClient) { }

  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      url = encodeURIComponent(url);
      const fullUrl = `http://localhost:3000/api/greg-test/serpapi?url=${url}`;
      console.log(fullUrl);
       this.http.get(fullUrl).subscribe((data)=> resolve(data));
    });

  }
}
