import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RoomComponent } from './components/room/room.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'houses/:houseId/rooms', component: RoomComponent},
    {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];
