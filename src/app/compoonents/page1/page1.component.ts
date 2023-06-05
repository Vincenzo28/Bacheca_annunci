import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit {
  posts: any;
  constructor(private firebase: FirebaseService) {}
  ngOnInit(): void {
    const userId = localStorage.getItem('user')
    this.firebase.getPosts().subscribe((data: any) => {
      console.log(data);
      this.posts = Object.keys(data).map((key) => {
        data[key]['id'] = key;
        return data[key];
      });
    });
  }
}
