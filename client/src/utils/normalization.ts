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
    format: (val) => val.toFixed(4),
    normalize: (val) => Math.round(val),
    denormalize: (val) => Math.round(val)
  },
  duration_ms: {
    min: 0,
    max: 1,
    step: .001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
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
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => Math.round(val * 11)
  },
  loudness: {
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => (val * 60) - 60
  },
  mode: {
    min: 0,
    max: 1,
    step: 1,
    format: (val) => val.toFixed(4),
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
    min: 0,
    max: 1,
    step: 0.0001,
    format: (val) => val.toFixed(4),
    normalize: (val) => val,
    denormalize: (val) => (val * 150) + 50
  }
}