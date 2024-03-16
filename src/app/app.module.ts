import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { PdfComponent } from './pdf/pdf.component';
import { CrudComponent } from './crud/crud.component'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent, PdfComponent, CrudComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatDatepickerModule,
    NoopAnimationsModule,
    AppRoutingModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
