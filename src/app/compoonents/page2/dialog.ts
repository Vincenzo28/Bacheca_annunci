import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './ dialog.html',
  styleUrls: ['./page2.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class DialogAnimationsExampleDialog implements OnInit {
  dialogForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService
  ) {
    this.dialogForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const data: any = localStorage.getItem('user');
    const userData = JSON.parse(data);
    const userID = userData.id;
  }

  onSubmit() {
    if (this.dialogForm.valid) {
      const data: any = localStorage.getItem('user');
      const userData = JSON.parse(data);
      const userId = userData.id;
      const userEmail = userData.email
      this.firebase
        .newPost(
          this.dialogForm.value.title,
          this.dialogForm.value.description,
          userId, userEmail
        )
        .subscribe((data) => {
          console.log(data);
        });
      this.dialogRef.close(); // Close the dialog
    }
  }
}
