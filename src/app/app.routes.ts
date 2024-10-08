import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { TrackDetailComponent } from './components/track-detail/track-detail.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tracks',
      },
      {
        path: 'tracks',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: TracksComponent,
          },
          {
            path: ':id',
            component: TrackDetailComponent,
          },
        ],
      },
      {
        path: 'playlists',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: PlaylistsComponent,
          },
          {
            path: ':id',
            component: PlaylistDetailComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
