import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';

export const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: 'AddBook', component: AddBookComponent },
  { path: 'UpdateBook', component: UpdateBookComponent },
  { path: 'DeleteBook', component: DeleteBookComponent },
  { path: '**', redirectTo: 'Home' }, // wildcard
];
