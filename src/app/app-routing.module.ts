import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from './pdf/pdf.component';
import { CrudComponent } from './crud/crud.component';

const routes: Routes = [
  { path: 'pdf', component: PdfComponent },
  { path: '', component: CrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
