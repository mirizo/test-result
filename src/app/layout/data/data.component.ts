import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Test } from '../../shared/models/test';
import { DataDetailsComponent } from '../data-details/data-details.component'
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DataService } from '../../shared/services/data.service'
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['StudentName', 'Grade', 'SubjectName', 'Settings'];
  testsArr: Test[];
  tests = new MatTableDataSource<Test>(this.testsArr);
  filterValue: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private dataServise: DataService) {

    this.getTests();
  }
  getTests() {
    this.dataServise.get<Test[]>('test').subscribe(res => {
      this.testsArr = res;
      this.tests.data = this.testsArr

    })

  }
  ngOnInit() {
    let filterValue = localStorage.getItem("filterValue")
    if (filterValue.length > 0) {
      this.filterValue = filterValue;
      this.applyFilter(filterValue);
    }
  }

  openDialog(row: any): void {

    let dialogRef;
    if (row) {
      dialogRef = this.dialog.open(DataDetailsComponent, {
        data: Object.assign({}, row)
      });
    } else {
      dialogRef = this.dialog.open(DataDetailsComponent, {
        data: null
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      this.getTests();
    });
  }

  applyFilter(filterValue: string) {
    this.tests.filter = filterValue.trim().toLowerCase();

    localStorage.setItem('filterValue', filterValue.trim())
  }

  ngAfterViewInit() {
    this.tests.sort = this.sort;
    this.tests.paginator = this.paginator;

  }
  delete(test): void {
    this.dataServise.delete<boolean>('test?id=' + test.Id).subscribe(res => {
      if (res) {
        this.getTests();

      }

    })
  }
}

