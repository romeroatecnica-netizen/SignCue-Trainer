export type LangCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'pt'
  | 'ru'
  | 'hi'
  | 'ar'
  | 'zh'
  | 'ja';

export type SignSystem = 'asl' | 'lse' | 'isl';

export type TrainingMode = 'spotter' | 'builder' | 'lookalike' | 'cues' | 'review';

export type SignCategory = 'letters' | 'numbers' | 'lookalike' | 'cues';

export type FingerName = 'index' | 'middle' | 'ring' | 'pinky';

export type FingerState =
  | 'extended'
  | 'spread'
  | 'bent'
  | 'curled'
  | 'closed'
  | 'hook';

export type ThumbState =
  | 'out'
  | 'up'
  | 'across'
  | 'tucked'
  | 'touch-index'
  | 'touch-all'
  | 'between-1-2'
  | 'between-2-3'
  | 'under-3';

export type PalmOrientation = 'front' | 'back' | 'side-in' | 'side-out' | 'down' | 'up';

export type MotionType =
  | 'none'
  | 'arc-j'
  | 'zigzag-z'
  | 'wave'
  | 'chin-out'
  | 'chest-circle'
  | 'nod-fist'
  | 'tap-fingers'
  | 'lift-up'
  | 'shake-side'
  | 'tap-temple'
  | 'flick-index'
  | 'chop-down';

export type NonManualCue =
  | 'neutral'
  | 'brow-raise'
  | 'brow-furrow'
  | 'head-nod'
  | 'head-shake'
  | 'warm-smile';

export type PlacementZone = 'neutral' | 'forehead' | 'temple' | 'chin' | 'chest';

export interface HandVisualSpec {
  fingers: Record<FingerName, FingerState>;
  thumb: ThumbState;
  palm: PalmOrientation;
  rotation?: number; // degrees clockwise
  motion?: MotionType;
  twoHanded?: boolean;
  secondaryShape?: 'flat-palm' | 'mirror-o' | 'base-palm';
  nonManual?: NonManualCue;
  placement?: PlacementZone;
  fingerGap?: 'tight' | 'normal' | 'wide';
}

export interface SignCueDetails {
  keyFeatureKey: string;
  contrastTipKey: string;
  mistakeTipKey: string;
}

export interface SignItem {
  id: string;
  label: string;
  category: 'letters' | 'numbers' | 'cues';
  isLookalikePriority?: boolean;
  visual: HandVisualSpec;
  systemVariants?: Partial<Record<SignSystem, Partial<HandVisualSpec>>>;
  confusableWith: string[];
  meaningKey?: string;
  scenarioKey?: string;
  cueDetails: SignCueDetails;
  systemNoteKey?: string;
}

export interface WordChallenge {
  id: string;
  word: string;
  themeKey: string;
  preferredSystem?: SignSystem;
}

export interface CategoryStats {
  attempts: number;
  correct: number;
  totalMs: number;
}

export interface ItemStats {
  attempts: number;
  misses: number;
  lastMissedAt?: number;
}

export interface SessionRecord {
  id: string;
  timestamp: number;
  mode: TrainingMode;
  system: SignSystem;
  total: number;
  correct: number;
  avgMs: number;
}

export interface UserProgress {
  xp: number;
  streak: number;
  bestStreak: number;
  totalAnswered: number;
  totalCorrect: number;
  totalResponseMs: number;
  categories: Record<SignCategory, CategoryStats>;
  items: Record<string, ItemStats>;
  sessions: SessionRecord[];
}
