interface FeatureRange {
  min: number;
  max: number;
  step: number;
  format: (val: number) => string;
  normalize: (val: number) => number;
  denormalize: (val: number) => number;
}

export const featureConfigs: Record<string, FeatureRange> = {
  is_explicit: {
    min: 0,
    max: 1,
    step: 1,
    format: (val) => val === 1 ? 'Yes' : 'No',
    normalize: (val) => Math.round(val),
    denormalize: (val) => Math.round(val)
  },
  duration_ms: {
    min: 0,
    max: 600000,
    step: 1000,
    format: (val) => `${Math.round(val / 1000)}s`,
    normalize: (val) => val / 600000,
    denormalize: (val) => val * 600000
  },
  danceability: {
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => val
  },
  energy: {
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => val
  },
  key: {
    min: 0,
    max: 11,
    step: 1,
    format: (val) => val.toString(),
    normalize: (val) => val / 11,
    denormalize: (val) => Math.round(val * 11)
  },
  loudness: {
    min: -60,
    max: 0,
    step: 1,
    format: (val) => `${val.toFixed(1)}dB`,
    normalize: (val) => (val + 60) / 60,
    denormalize: (val) => (val * 60) - 60
  },
  mode: {
    min: 0,
    max: 1,
    step: 1,
    format: (val) => val === 1 ? 'Major' : 'Minor',
    normalize: (val) => Math.round(val),
    denormalize: (val) => Math.round(val)
  },
  speechiness: {
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => val
  },
  acousticness: {
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => val
  },
  instrumentalness: {
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => val
  },
  liveness: {
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => val
  },
  valence: {
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => val
  },
  tempo: {
    min: 50,
    max: 200,
    step: 1,
    format: (val) => `${val.toFixed(1)} BPM`,
    normalize: (val) => (val - 50) / 150,
    denormalize: (val) => (val * 150) + 50
  }
}