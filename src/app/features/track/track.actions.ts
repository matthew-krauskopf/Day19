import { createAction, props } from '@ngrx/store';
import { Track } from './track.entity';

export const loadTracks = createAction('[Side Bar] Load Tracks');

export const loadTracksSuccess = createAction(
  '[Side Bar] Load Tracks Successful',
  props<{ tracks: Track[] }>()
);

export const loadTracksFail = createAction('[Side Bar] Load Tracks Fail');

export const loadTrack = createAction(
  '[Tracks] Load Track',
  props<{ id: number }>()
);

export const unloadTrack = createAction('[Tracks] Unload Track');
