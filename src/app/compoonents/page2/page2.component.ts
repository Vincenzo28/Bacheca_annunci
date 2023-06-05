import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from './dialog';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
})
export class Page2Component implements OnInit{
  posts:any;
  postId!:string
  constructor(public dialog: MatDialog, private firebase:FirebaseService) {}
  ngOnInit(): void {
    const data:any = localStorage.getItem('user')
    const userData = JSON.parse(data)
    const userId = userData.id
    this.firebase.getPosts().subscribe((data: any) => {
      console.log(data);
      this.posts = Object.keys(data).map((key) => {
        data[key]['id'] = key;
        this.postId = key
        return data[key];
      }).filter(posts => posts.userId === userId)
    });
  }

  onDelete(){
 this.firebase.deleteData('https://corso-angular-d3b25-default-rtdb.europe-west1.firebasedatabase.app/posts/', this.postId ).subscribe()
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}

