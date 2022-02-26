import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTechnologieComponent } from './components/add-technologie/add-technologie.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditTechnologieComponent } from './components/edit-technologie/edit-technologie.component';
import { LoginComponent } from './components/login/login.component';
import { TechnologieDetailComponent } from './components/technologie-detail/technologie-detail.component';
import { TechnologieRadarViewerComponent } from './components/technologie-radar-viewer/technologie-radar-viewer.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'rader-viewer', component: TechnologieRadarViewerComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard/:id', component: EditTechnologieComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'detail/:id', component: TechnologieDetailComponent, canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
