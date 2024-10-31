// src/types/music.ts
export interface Track {
  id: string
  title: string
  artist: string
  album?: string
  duration: number
  albumArt?: string
}

export interface Playlist {
  id: string
  name: string
  tracks: Track[]
  createdAt: Date
}