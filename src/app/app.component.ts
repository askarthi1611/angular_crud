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
  displayedColumns: string[] = ['StudentId', 'Name', 'Roll', 'Birthday','Action'];
  dataSource: MatTableDataSource<UserData> | any;
  title = 'ang_crud';
  users: any;
  UpdatePage: any = false;
  tablePage: any = true;
  @ViewChild('MatPaginator') paginator: any;
  @ViewChild(MatSort) sort: any;
  newObj :any= {
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
    this.newObj={
      StudentId: '',
      Name: '',
      Roll: '',
      Birthday: '',
    };
    this.myApiService.getData().subscribe(
      (result: any) => {
        this.users = result;
        console.log('users from API:', this.users);
        this.dataSource = new MatTableDataSource(this.users);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1000);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
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
    this.UpdatePage=false
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
  updateuser(data: any, e: any) {
    if (
      this.newObj.StudentId > 0 &&
      this.newObj.Roll > 0 &&
      this.newObj.Name.length > 0 &&
      this.newObj.Birthday.length > 0
    ) {
      console.log(this.newObj);
      this.myApiService.UpdateData(this.newObj).subscribe(
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
  deleteResource(id: number): void {
    this.myApiService.deleteResource(id)
      .subscribe(
        () => {
          console.log('Resource deleted successfully');
          // Handle success, if needed
          this.getDataFromApi();

        },
        (error: any) => {
          console.error('Error deleting resource:', error);
          // Handle error, if needed
          this.getDataFromApi();

        }
      );
      }
      Updatepage(row:any){
        this.UpdatePage=true
        this.newObj=row;
        this.tablePage=false;
      }
      backtopage(){
        this.tablePage=true;
        this.getDataFromApi();
      }
      themechange(e:any){
        let body :any = document.querySelector('body')
        console.log(e.innerText,e.innerHTML,e);
        if (body.className=="darkbg") {
          body.className=""
          e.innerText="Dark"
        }else{
          e.innerText="Light"
          body.className="darkbg"
        }
        
      }
}
