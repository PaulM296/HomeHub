import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RoomComponent } from './components/room/room.component';
import { RoomStoragesComponent } from './components/room-storages/room-storages.component';
import { ItemComponent } from './components/item/item.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'houses/:houseId/rooms', component: RoomComponent},
    {path: 'rooms/:roomId/storages', component: RoomStoragesComponent},
    {path: 'storage/:storageId/items', component: ItemComponent},
    {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];
