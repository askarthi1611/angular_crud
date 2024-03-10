import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppService } from './app.service';

export interface UserData {
  _id: string;
  StudentId: string;
  Name: string;
  Roll: string;
  Birthday: string;
  __v: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['StudentId', 'Name', 'Roll', 'Birthday'];
  dataSource: MatTableDataSource<UserData> | any;
  title = 'ang_crud';
  users: any;
  tablePage: any = true;
  @ViewChild('MatPaginator') paginator: any;
  @ViewChild(MatSort) sort: any;
  newObj = {
    StudentId: '',
    Name: '',
    Roll: '',
    Birthday: '',
  };

  constructor(private myApiService: AppService) {
    this.getDataFromApi();
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {}

  getDataFromApi() {
    this.myApiService.getData().subscribe(
      (result: any) => {
        this.users = result;
        console.log('users from API:', this.users);
        this.dataSource = new MatTableDataSource(this.users);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gotocreateuser() {
    this.tablePage = false;
  }
  createuser(data: any, e: any) {
    if (
      data.StudentId > 0 &&
      data.Roll > 0 &&
      data.Name.length > 0 &&
      data.Birthday.length > 0
    ) {
      this.myApiService.postData(data).subscribe(
        (result: any) => {
          this.getDataFromApi();
        },
        (error: any) => {
          this.getDataFromApi();
        }
      );
      e.style.background = 'green';
      this.tablePage = true;
    } else {
      e.style.background = 'red';
    }
  }
}
