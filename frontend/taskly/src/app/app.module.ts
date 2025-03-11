import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TaskComponent } from './components/task/task.component';
import { CreateTaskDialogComponent } from './components/task/create-task-dialog/create-task-dialog.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UpdateTaskDialogComponent } from './components/task/update-task-dialog/update-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    NotFoundComponent,
    TaskComponent,
    CreateTaskDialogComponent,
    HomePageComponent,
    UpdateTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
