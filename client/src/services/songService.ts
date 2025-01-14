export interface Song {
  spotify_id: string;
  name: string;
  artists: string;
}

export async function loadSongs(): Promise<Song[]> {
  try {
    const response = await fetch('/api/refdata/songs')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to load songs:', error)
    return []
  }
}

export function searchSongs(songs: Song[], query: string): Song[] {
  const searchTerm = query.toLowerCase().trim()
  if (!searchTerm) return []

  return songs
    .filter(song => {
      // Add type checking to ensure properties exist and are strings
      if (typeof song?.name !== 'string' || typeof song?.artists !== 'string') {
        console.warn('Invalid song data:', song)
        return false
      }
      
      return song.name.toLowerCase().includes(searchTerm) ||
             song.artists.toLowerCase().includes(searchTerm)
    })
    .slice(0, 10)
}

// Helper function to validate song data
export function validateSong(song: any): song is Song {
  return typeof song === 'object' &&
         song !== null &&
         typeof song.spotify_id === 'string' &&
         typeof song.name === 'string' &&
         typeof song.artists === 'string'
}