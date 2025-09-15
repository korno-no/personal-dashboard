import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { TasksComponent } from './features/tasks/tasks.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'home page'
    },
    {
        path: 'tasks',
        component: TasksComponent,
        title: 'tasks page'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'profile page'
    },
];
