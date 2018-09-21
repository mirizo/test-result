import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../shared/services/data.service'
import { Student } from '../../shared/models/student';
import { Test } from '../../shared/models/test';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']
})
export class DataDetailsComponent implements OnInit {
  submitted = false;
  disable=false;
  registerForm: FormGroup;
  test: any;
  private errorMessage: string;
  students: string[];
  subjects: string[];
  constructor(public dialogRef: MatDialogRef<DataDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private dataServise: DataService) {
    this.dataServise.get<string[]>('students').subscribe(res => {
      this.students = res;
    })
    this.dataServise.get<string[]>('subjects').subscribe(res => {
      this.subjects = res;
    })

  }




  ngOnInit() {
    this.test = {
      Id: ' ',
      Grade: ' ',
      SubjectName: '',
      student: {
        Email: '',
        JoinDate: '',
        Name: ''
      }
    }
    this.registerForm = this.formBuilder.group(
      {
        student: ['', Validators.required],
        Grade: ['חובה', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        JoinDate: [{value:'', disabled:true}, ],
        subject: ['', Validators.required]
      }
    );
    if (this.data) {
      this.dataServise.getbyId<Test>('test', this.data.Id).subscribe(res => {
        this.test = res;
      })
      // this.test = this.data;
    } else {
      this.test = {
        Id: ' ',
        Grade: ' ',
        SubjectName: '',
        student: {
          Email: '',
          JoinDate: '',
          Name: ''
        }
      }
      }


    }

  

    onNoClick(): void {
      this.dialogRef.close();
    }

    save(): void {
              this.submitted = true;

      if(this.registerForm.invalid) {
        this.errorMessage = 'כל השדות הינם חובה';
        return;
      }
              this.submitted = false;

    if(this.test.Id > 0) {
      this.dataServise.post('test', this.test).subscribe(res => {

        this.dialogRef.close();

      })
    }
    else {

      this.dataServise.put('test', this.test).subscribe(res => {
        if (res) {
          this.dialogRef.close();

        }
      })
    }


  }


}
