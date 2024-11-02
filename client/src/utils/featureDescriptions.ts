export const featureDescriptions = {
  acousticness: "A confidence measure of whether the track is acoustic. A value of 1.0 represents high confidence the track is acoustic.",
  danceability: "How suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.",
  duration_ms: "The duration of the track in milliseconds.",
  energy: "A measure representing intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.",
  instrumentalness: "Predicts whether a track contains no vocals. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 represent instrumental tracks.",
  is_explicit: "Whether or not the track contains explicit lyrics (true = 1, false = 0).",
  key: "The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.",
  liveness: "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.",
  loudness: "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track.",
  mode: "Indicates the modality (major or minor) of a track. Major is represented by 1 and minor is 0.",
  speechiness: "Detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value.",
  tempo: "The overall estimated tempo of a track in beats per minute (BPM).",
  valence: "A measure describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
};