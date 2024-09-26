import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import { EditPlaylistComponent } from '../../components/edit-playlist/edit-playlist.component';
import {
  loadPlaylist,
  loadPlaylists,
  loadPlaylistsFail,
  loadPlaylistsSuccess,
  openEditPlaylistModal,
  removeFromPlaylist,
  updatePlaylist,
} from './playlist.actions';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Injectable()
export class PlaylistEffects {
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);
  snackbar: MatSnackBar = inject(MatSnackBar);
  playlistsService: PlaylistService = inject(PlaylistService);

  constructor(private actions$: Actions) {}

  loadPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPlaylists),
      exhaustMap(() =>
        this.playlistsService.getPlaylists().pipe(
          map((playlists: Playlist[]) =>
            loadPlaylistsSuccess({ playlists: playlists })
          ),
          catchError(() => of(loadPlaylistsFail()))
        )
      )
    )
  );

  loadPlaylist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadPlaylist),
        tap((payload) => {
          this.router.navigate(['dashboard', 'playlists', payload.playlistId]);
        })
      ),
    { dispatch: false }
  );

  loadPlaylistsFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadPlaylistsFail),
        map(() =>
          this.snackbar.open(
            'Network Error: Playlists failed to load',
            'Dismiss',
            {
              duration: 5000,
            }
          )
        )
      ),
    { dispatch: false }
  );

  removeTrackFromPlaylist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeFromPlaylist),
        map(() =>
          this.snackbar.open('Track removed from playlist', 'Dismiss', {
            duration: 3000,
          })
        )
      ),
    { dispatch: false }
  );

  openEditPlaylistModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openEditPlaylistModal),
      exhaustMap((payload) =>
        this.dialog
          .open(EditPlaylistComponent, {
            data: {
              playlist: payload.playlist,
            },
          })
          .afterClosed()
          .pipe(
            filter((form) => !!form),
            map((form: FormGroup) => {
              //console.log(form);
              return updatePlaylist({
                title: form.value.title,
                description: form.value.description,
              });
            })
          )
      )
    )
  );

  //updatePlaylist$ = createEffect(() =>
  //  this.actions$.pipe(
  //    ofType(updatePlaylist),
  //    tap((payload) => console.log(payload))
  //  )
  //);
}
