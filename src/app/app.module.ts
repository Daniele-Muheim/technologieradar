import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTechnologieComponent } from './components/add-technologie/add-technologie.component';
import { TechnologieRadarViewerComponent } from './components/technologie-radar-viewer/technologie-radar-viewer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PublishTechnologieComponent } from './components/publish-technologie/publish-technologie.component';
import { TechnologieDetailComponent } from './components/technologie-detail/technologie-detail.component';
import { AuthService } from './services/auth-service.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EditTechnologieComponent } from './components/edit-technologie/edit-technologie.component';
import { TechnologyService } from './services/technology.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { TokenService } from './services/token.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTechnologieComponent,
    TechnologieRadarViewerComponent,
    AdminDashboardComponent,
    PublishTechnologieComponent,
    TechnologieDetailComponent,
    EditTechnologieComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatListModule,
    MatExpansionModule,
    HttpClientModule,
    MatGridListModule,
    MatChipsModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule
  ],
  providers: [AuthGuard, AuthService, TechnologyService, RoleGuard, TokenService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
