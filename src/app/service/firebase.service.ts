import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  url =
    'https://corso-angular-d3b25-default-rtdb.europe-west1.firebasedatabase.app/posts/.json';
  constructor(private http: HttpClient) {}

  newPost(title:string,description:string, userId:string, email:string){
    return this.http.post(this.url,{title,description,userId, email})
  }

  getPosts(){
    return this.http.get(this.url)
  }
  deleteData(url: string, id: string) {
    return this.http.delete(`${url}/${id}.json`);
  }
}
