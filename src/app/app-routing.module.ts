import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EmployeeAssignmentBoardComponent } from './employee-assignment-board/employee-assignment-board.component';
import { LineStatusComponent } from './line-status/line-status.component';
import { LineStatusArchiveComponent } from './line-status/line-status-archive/line-status-archive.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'assignEmployees', component: EmployeeAssignmentBoardComponent },
  { path: 'lineStatus', component: LineStatusComponent },
  { path: 'lineStatusArchive', component: LineStatusArchiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
