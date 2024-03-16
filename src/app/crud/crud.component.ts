import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CrudService } from './crud.service';
import { ToastrService } from 'ngx-toastr';

export interface UserData {
  _id: string;
  StudentId: string;
  Name: string;
  Roll: string;
  Birthday: string;
  __v: string;
}
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements AfterViewInit {
  displayedColumns: string[] = ['StudentId', 'Name', 'Roll', 'Birthday','Action'];
  dataSource: MatTableDataSource<UserData> | any;
  title = 'ang_crud';
  users: any;
  UpdatePage: any = false;
  tablePage: any = true;
  @ViewChild('MatPaginator') paginator: any;
  @ViewChild(MatSort) sort: any;
  iframetab:any=false;
  src:any;
  newObj :any= {
    StudentId: '',
    Name: '',
    Roll: '',
    Birthday: '',
  };
  PDFGEN:any=false;
  constructor(private myApiService: CrudService,private domSanitizer: DomSanitizer,private toastr: ToastrService) {
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
        this.toastr.success('Fetching data', 'Success', {
          timeOut: 500,
        });
        // console.log('users from API:', this.users);
        this.dataSource = new MatTableDataSource(this.users);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1000);
      },
      (error: any) => {
        // console.error('Error fetching data:', error);
        this.toastr.error('Error fetching data', 'Error', {
          timeOut: 3000,
        });
      }
    );
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
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
      data.Name.length > 0
    ) {
      let date= new Date(data.Birthday)
      data.Birthday=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      this.myApiService.postData(data).subscribe(
        (result: any) => {
          this.toastr.success('Added Successfully', 'dded', {
            timeOut: 3000,
          });
          this.getDataFromApi();
        },
        (error: any) => {
          this.toastr.error('Error adding data', 'Error', {
            timeOut: 3000,
          });
          this.getDataFromApi();
        }
      );
      e.style.background = 'green';
      this.tablePage = true;
    } else {
      e.style.background = 'red';
      this.toastr.error('Error adding data', 'Error', {
        timeOut: 3000,
      });
    }
  }

  updateuser(data: any, e: any) {
    if (
      data.StudentId > 0 &&
      data.Roll > 0 &&
      data.Name.length > 0
    ) {
      let date= new Date(data.Birthday)
      data.Birthday=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      this.myApiService.UpdateData(this.newObj).subscribe(
        (result: any) => {
          this.toastr.success('Updated Successfully', 'Updated', {
            timeOut: 3000,
          });
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
      this.toastr.error('Error Updateing data', 'Error', {
        timeOut: 3000,
      });
    }
  }
  deleteResource(id: any): void {
    this.myApiService.deleteResource(id)
      .subscribe(
        () => {
          // console.log('Resource deleted successfully');
          this.toastr.success('Deleted successfully', 'Successfully', {
            timeOut: 3000,
          });
          // Handle success, if needed
          this.getDataFromApi();

        },
        (error: any) => {
          // console.error('Error deleting resource:', error);
          this.toastr.error('Error deleting resource', id, {
            timeOut: 3000,
          });
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
        if (body.className=="darkbg") {
          body.className=""
          e.innerText="Dark"
        }else{
          e.innerText="Light"
          body.className="darkbg"
        }
      }
      printpage(){
        this.PDFGEN=true;
      }
}
