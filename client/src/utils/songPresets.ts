export interface SongPreset {
  name: string;
  artist: string;
  is_explicit: number;
  duration_ms: number;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
}

export const songPresets: SongPreset[] = [
  {
    name: "Reckoner",
    artist: "Radiohead",
    is_explicit: 0,
    duration_ms: 289760,
    danceability: 0.49,
    energy: 0.632,
    key: 4,
    loudness: -7.449,
    mode: 0,
    speechiness: 0.027,
    acousticness: 0.496,
    instrumentalness: 0.157,
    liveness: 0.0827,
    valence: 0.237,
    tempo: 104.265
  },
  {
    name: "Shake It Off",
    artist: "Taylor Swift",
    is_explicit: 0,
    duration_ms: 219200,
    danceability: 0.646,
    energy: 0.778,
    key: 7,
    loudness: -5.364,
    mode: 1,
    speechiness: 0.158,
    acousticness: 0.06,
    instrumentalness: 0,
    liveness: 0.497,
    valence: 0.945,
    tempo: 160.082
  },
  {
    name: "Lay All Your Love on Me",
    artist: "ABBA",
    is_explicit: 0,
    duration_ms: 273533,
    danceability: 0.66,
    energy: 0.734,
    key: 2,
    loudness: -6.385,
    mode: 0,
    speechiness: 0.0267,
    acousticness: 0.0863,
    instrumentalness: 0.000267,
    liveness: 0.422,
    valence: 0.779,
    tempo: 133.491
  }
]