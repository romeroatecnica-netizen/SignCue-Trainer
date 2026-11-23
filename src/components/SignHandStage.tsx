import React from 'react';
import type {
  FingerName,
  FingerState,
  HandVisualSpec,
  MotionType,
  NonManualCue,
  PalmOrientation,
} from '../types/sign';

interface SignHandStageProps {
  visual: HandVisualSpec;
  viewMode: 'full' | 'zoom';
  palmLabel?: string;
  nonManualLabel?: string;
  handCountLabel?: string;
  showCueMeta?: boolean;
  isAnimated?: boolean;
}

const FINGER_X: Record<FingerName, number> = {
  index: 158,
  middle: 194,
  ring: 229,
  pinky: 261,
};

const FINGER_WIDTH: Record<FingerName, number> = {
  index: 25,
  middle: 26,
  ring: 24,
  pinky: 21,
};

const FINGER_TIP_Y: Record<FingerName, number> = {
  index: 102,
  middle: 90,
  ring: 104,
  pinky: 128,
};

const SPREAD_ANGLE: Record<FingerName, number> = {
  index: -12,
  middle: -2,
  ring: 8,
  pinky: 18,
};

function renderFinger(
  name: FingerName,
  state: FingerState,
  palm: PalmOrientation,
  fingerGap: 'tight' | 'normal' | 'wide' = 'normal',
) {
  const baseX = FINGER_X[name];
  const w = FINGER_WIDTH[name];
  const tipY = FINGER_TIP_Y[name];
  const baseY = name === 'pinky' ? 212 : name === 'ring' ? 204 : 198;
  const isBack = palm === 'back';
  const fillMain = isBack ? '#E9C4AC' : '#F4D5C0';
  const fillShadow = '#DFB296';
  const stroke = '#334155';

  const gapShift =
    fingerGap === 'wide'
      ? name === 'index'
        ? -4
        : name === 'pinky'
          ? 5
          : name === 'ring'
            ? 2
            : 0
      : fingerGap === 'tight'
        ? name === 'index'
          ? 2
          : name === 'pinky'
            ? -4
            : name === 'ring'
              ? -2
              : 0
        : 0;

  const cx = baseX + gapShift;

  if (state === 'extended' || state === 'spread') {
    const angle = state === 'spread' ? SPREAD_ANGLE[name] : 0;
    const h = baseY - tipY;
    return (
      <g key={name} transform={`rotate(${angle}, ${cx}, ${baseY})`}>
        <rect
          x={cx - w / 2}
          y={tipY}
          width={w}
          height={h + 10}
          rx={w / 2}
          fill={fillMain}
          stroke={stroke}
          strokeWidth={2.4}
        />
        {/* Joint crease lines */}
        <path
          d={`M ${cx - w * 0.28} ${tipY + h * 0.34} Q ${cx} ${tipY + h * 0.37} ${cx + w * 0.28} ${tipY + h * 0.34}`}
          fill="none"
          stroke="#B8876D"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - w * 0.3} ${tipY + h * 0.66} Q ${cx} ${tipY + h * 0.69} ${cx + w * 0.3} ${tipY + h * 0.66}`}
          fill="none"
          stroke="#B8876D"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        {isBack ? (
          <rect
            x={cx - w * 0.28}
            y={tipY + 4}
            width={w * 0.56}
            height={11}
            rx={4}
            fill="#FBECE2"
            stroke="#C7967A"
            strokeWidth={1.1}
          />
        ) : (
          <ellipse cx={cx} cy={tipY + 9} rx={w * 0.24} ry={5} fill="#F9E5D8" opacity={0.85} />
        )}
      </g>
    );
  }

  if (state === 'hook') {
    const hookY = tipY + 42;
    return (
      <g key={name}>
        <path
          d={`M ${cx - w / 2} ${baseY + 4}
              L ${cx - w / 2} ${hookY + 12}
              Q ${cx - w / 2} ${hookY - 10} ${cx + w * 0.45} ${hookY - 6}
              Q ${cx + w * 0.72} ${hookY} ${cx + w * 0.48} ${hookY + 26}
              L ${cx + w * 0.24} ${hookY + 26}
              Q ${cx + w * 0.32} ${hookY + 10} ${cx + w * 0.14} ${hookY + 10}
              L ${cx + w / 2} ${baseY + 4} Z`}
          fill={fillMain}
          stroke={stroke}
          strokeWidth={2.4}
          strokeLinejoin="round"
        />
        <path
          d={`M ${cx - w * 0.24} ${hookY + 18} L ${cx + w * 0.2} ${hookY + 18}`}
          stroke="#B8876D"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </g>
    );
  }

  if (state === 'bent') {
    const bendY = baseY - 54;
    return (
      <g key={name}>
        <path
          d={`M ${cx - w / 2} ${baseY + 4}
              L ${cx - w / 2} ${bendY + 18}
              Q ${cx - w / 2} ${bendY - 8} ${cx + 4} ${bendY - 8}
              Q ${cx + w * 0.65} ${bendY - 6} ${cx + w * 0.65} ${bendY + 24}
              L ${cx + w * 0.22} ${bendY + 28}
              Q ${cx + w * 0.22} ${bendY + 12} ${cx} ${bendY + 12}
              L ${cx + w / 2} ${baseY + 4} Z`}
          fill={fillMain}
          stroke={stroke}
          strokeWidth={2.4}
          strokeLinejoin="round"
        />
      </g>
    );
  }

  if (state === 'curled') {
    // Half-curled over upper palm (used in A, M, N, T, D, F, 6, 7, 8, 9)
    return (
      <g key={name}>
        <rect
          x={cx - w / 2}
          y={baseY - 26}
          width={w}
          height={44}
          rx={w / 2.2}
          fill={fillShadow}
          stroke={stroke}
          strokeWidth={2.3}
        />
        <rect
          x={cx - w / 2 + 1}
          y={baseY - 6}
          width={w - 2}
          height={28}
          rx={w / 2.4}
          fill={fillMain}
          stroke={stroke}
          strokeWidth={2.2}
        />
      </g>
    );
  }

  // 'closed' tightly into palm
  return (
    <g key={name}>
      <rect
        x={cx - w / 2}
        y={baseY - 12}
        width={w}
        height={38}
        rx={w / 2.3}
        fill={fillShadow}
        stroke={stroke}
        strokeWidth={2.3}
      />
      <path
        d={`M ${cx - w * 0.28} ${baseY + 12} L ${cx + w * 0.28} ${baseY + 12}`}
        stroke="#A47259"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </g>
  );
}

function renderThumb(visual: HandVisualSpec) {
  const {thumb, palm} = visual;
  const isBack = palm === 'back';
  const fill = isBack ? '#E9C4AC' : '#F4D5C0';
  const stroke = '#334155';

  if (thumb === 'out') {
    return (
      <g key="thumb-out">
        <path
          d="M 142 268 Q 108 248 92 206 Q 86 190 102 184 Q 116 179 126 196 L 154 242 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <ellipse cx={105} cy={196} rx={5.5} ry={7.5} transform="rotate(-24, 105, 196)" fill="#F9E5D8" />
      </g>
    );
  }

  if (thumb === 'up') {
    return (
      <g key="thumb-up">
        <path
          d="M 144 260 L 122 174 Q 120 156 135 154 Q 150 153 152 172 L 164 244 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <ellipse cx={136} cy={166} rx={5.5} ry={7.5} fill="#F9E5D8" />
      </g>
    );
  }

  if (thumb === 'across') {
    return (
      <g key="thumb-across">
        <path
          d="M 136 266 Q 134 226 160 218 L 222 214 Q 238 214 238 228 Q 238 242 222 243 L 164 248 Q 152 252 150 272 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <path
          d="M 186 220 L 186 240"
          stroke="#B8876D"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </g>
    );
  }

  if (thumb === 'tucked') {
    return (
      <g key="thumb-tucked">
        <path
          d="M 140 272 Q 146 242 172 238 L 214 238 Q 226 239 226 250 Q 226 262 212 263 L 154 274 Z"
          fill="#E5B79C"
          stroke={stroke}
          strokeWidth={2.3}
          strokeLinejoin="round"
        />
      </g>
    );
  }

  if (thumb === 'touch-index') {
    return (
      <g key="thumb-touch-index">
        <path
          d="M 138 268 Q 122 226 142 196 Q 154 182 168 190 Q 178 197 166 212 Q 152 226 156 258 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <circle cx={161} cy={196} r={5} fill="#4F46E5" opacity={0.22} />
      </g>
    );
  }

  if (thumb === 'touch-all') {
    return (
      <g key="thumb-touch-all">
        <path
          d="M 140 270 Q 120 228 148 196 Q 172 178 206 186 Q 218 190 214 202 Q 210 214 194 210 Q 172 204 160 220 Q 152 234 156 262 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <circle cx={202} cy={196} r={6} fill="#4F46E5" opacity={0.22} />
      </g>
    );
  }

  // Between fingers: T (1-2), N (2-3), M (under-3)
  const peekX =
    thumb === 'between-1-2' ? 176 : thumb === 'between-2-3' ? 211 : 245;

  return (
    <g key={`thumb-${thumb}`}>
      {/* Thumb base curving under curled fingers */}
      <path
        d={`M 138 272 Q 142 238 176 232 L ${peekX - 6} 226 L ${peekX + 10} 240 L 154 274 Z`}
        fill="#E5B79C"
        stroke={stroke}
        strokeWidth={2.3}
      />
      {/* Thumb tip peeking cleanly between the target fingers */}
      <ellipse
        cx={peekX}
        cy={212}
        rx={10.5}
        ry={14}
        fill={fill}
        stroke={stroke}
        strokeWidth={2.4}
      />
      <ellipse cx={peekX} cy={207} rx={5.5} ry={6} fill="#FBECE2" />
    </g>
  );
}

function renderMotionOverlay(motion: MotionType | undefined) {
  if (!motion || motion === 'none') {
    return null;
  }

  const paths: Record<Exclude<MotionType, 'none'>, React.ReactNode> = {
    'arc-j': (
      <path
        d="M 272 125 C 282 178, 250 218, 212 206"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.5}
        strokeDasharray="6 5"
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'zigzag-z': (
      <path
        d="M 136 86 L 205 86 L 145 140 L 214 140"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    wave: (
      <path
        d="M 235 96 C 268 88, 294 102, 308 124"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.5}
        strokeDasharray="6 4"
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'chin-out': (
      <path
        d="M 210 130 C 238 142, 266 168, 282 198"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.5}
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'chest-circle': (
      <path
        d="M 164 214 A 42 42 0 1 1 248 214 A 42 42 0 0 1 214 256"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.2}
        strokeDasharray="6 5"
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'nod-fist': (
      <g>
        <path
          d="M 284 150 L 284 202"
          fill="none"
          stroke="#4F46E5"
          strokeWidth={3.5}
          strokeLinecap="round"
          markerEnd="url(#signcue-arrow)"
        />
        <path
          d="M 296 196 L 296 156"
          fill="none"
          stroke="#4F46E5"
          strokeWidth={2.5}
          strokeDasharray="4 4"
          strokeLinecap="round"
          markerEnd="url(#signcue-arrow)"
        />
      </g>
    ),
    'tap-fingers': (
      <path
        d="M 185 112 C 176 130, 174 146, 176 164"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.2}
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'lift-up': (
      <path
        d="M 286 240 L 286 156"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.8}
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'shake-side': (
      <path
        d="M 134 114 L 106 114 M 274 114 L 302 114"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.2}
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'tap-temple': (
      <path
        d="M 222 104 L 246 84"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.4}
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'flick-index': (
      <path
        d="M 158 148 L 158 92"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.6}
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
    'chop-down': (
      <path
        d="M 210 132 L 210 218"
        fill="none"
        stroke="#4F46E5"
        strokeWidth={3.6}
        strokeLinecap="round"
        markerEnd="url(#signcue-arrow)"
      />
    ),
  };

  return (
    <g className="animate-sign-motion" aria-hidden="true">
      {paths[motion]}
    </g>
  );
}

function renderNonManualHead(nonManual: NonManualCue | undefined, placement: HandVisualSpec['placement']) {
  const showHead = nonManual && nonManual !== 'neutral';
  const showBody = placement && placement !== 'neutral';
  if (!showHead && !showBody) {
    return null;
  }

  const headX = 112;
  const headY = 92;

  return (
    <g aria-hidden="true">
      {/* Upper shoulders & torso outline */}
      <path
        d="M 28 338 C 36 276, 68 258, 112 258 C 156 258, 188 276, 196 338"
        fill="#EEF2FF"
        stroke="#CBD5E1"
        strokeWidth={2}
      />
      {/* Head circle */}
      <ellipse
        cx={headX}
        cy={headY}
        rx={42}
        ry={48}
        fill="#FFF7F2"
        stroke="#94A3B8"
        strokeWidth={2.2}
      />
      {/* Eyes */}
      <circle cx={headX - 15} cy={headY - 2} r={3.2} fill="#334155" />
      <circle cx={headX + 15} cy={headY - 2} r={3.2} fill="#334155" />

      {/* Eyebrows reflecting grammatical non-manual marker */}
      {nonManual === 'brow-raise' ? (
        <>
          <path d={`M ${headX - 24} ${headY - 19} Q ${headX - 15} ${headY - 27} ${headX - 6} ${headY - 19}`} fill="none" stroke="#4F46E5" strokeWidth={2.8} strokeLinecap="round" />
          <path d={`M ${headX + 6} ${headY - 19} Q ${headX + 15} ${headY - 27} ${headX + 24} ${headY - 19}`} fill="none" stroke="#4F46E5" strokeWidth={2.8} strokeLinecap="round" />
        </>
      ) : nonManual === 'brow-furrow' ? (
        <>
          <path d={`M ${headX - 24} ${headY - 17} L ${headX - 6} ${headY - 11}`} fill="none" stroke="#D97706" strokeWidth={2.8} strokeLinecap="round" />
          <path d={`M ${headX + 24} ${headY - 17} L ${headX + 6} ${headY - 11}`} fill="none" stroke="#D97706" strokeWidth={2.8} strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d={`M ${headX - 23} ${headY - 14} Q ${headX - 15} ${headY - 17} ${headX - 7} ${headY - 14}`} fill="none" stroke="#64748B" strokeWidth={2.2} strokeLinecap="round" />
          <path d={`M ${headX + 7} ${headY - 14} Q ${headX + 15} ${headY - 17} ${headX + 23} ${headY - 14}`} fill="none" stroke="#64748B" strokeWidth={2.2} strokeLinecap="round" />
        </>
      )}

      {/* Mouth */}
      {nonManual === 'warm-smile' ? (
        <path d={`M ${headX - 14} ${headY + 18} Q ${headX} ${headY + 29} ${headX + 14} ${headY + 18}`} fill="none" stroke="#059669" strokeWidth={2.6} strokeLinecap="round" />
      ) : nonManual === 'brow-furrow' || nonManual === 'head-shake' ? (
        <path d={`M ${headX - 10} ${headY + 21} Q ${headX} ${headY + 16} ${headX + 10} ${headY + 21}`} fill="none" stroke="#64748B" strokeWidth={2.2} strokeLinecap="round" />
      ) : (
        <path d={`M ${headX - 10} ${headY + 20} L ${headX + 10} ${headY + 20}`} fill="none" stroke="#64748B" strokeWidth={2.2} strokeLinecap="round" />
      )}

      {/* Head movement arrows */}
      {nonManual === 'head-nod' && (
        <path
          d={`M ${headX} ${headY - 64} L ${headX} ${headY - 50}`}
          stroke="#059669"
          strokeWidth={3}
          strokeLinecap="round"
          markerEnd="url(#signcue-arrow-emerald)"
        />
      )}
      {nonManual === 'head-shake' && (
        <>
          <path
            d={`M ${headX - 54} ${headY} L ${headX - 68} ${headY}`}
            stroke="#E11D48"
            strokeWidth={3}
            strokeLinecap="round"
            markerEnd="url(#signcue-arrow-rose)"
          />
          <path
            d={`M ${headX + 54} ${headY} L ${headX + 68} ${headY}`}
            stroke="#E11D48"
            strokeWidth={3}
            strokeLinecap="round"
            markerEnd="url(#signcue-arrow-rose)"
          />
        </>
      )}

      {/* Placement highlight dot */}
      {placement === 'temple' && (
        <circle cx={headX + 40} cy={headY - 12} r={8} fill="#4F46E5" opacity={0.2} stroke="#4F46E5" strokeWidth={1.5} />
      )}
      {placement === 'forehead' && (
        <circle cx={headX + 28} cy={headY - 34} r={8} fill="#4F46E5" opacity={0.2} stroke="#4F46E5" strokeWidth={1.5} />
      )}
      {placement === 'chin' && (
        <circle cx={headX + 6} cy={headY + 42} r={8} fill="#4F46E5" opacity={0.2} stroke="#4F46E5" strokeWidth={1.5} />
      )}
      {placement === 'chest' && (
        <circle cx={headX} cy={292} r={14} fill="#4F46E5" opacity={0.14} stroke="#4F46E5" strokeWidth={1.5} strokeDasharray="3 3" />
      )}
    </g>
  );
}

function renderSecondaryHand(shape: HandVisualSpec['secondaryShape']) {
  if (!shape) {
    return null;
  }
  if (shape === 'base-palm') {
    return (
      <g aria-hidden="true" transform="translate(8, 224)">
        <rect x={148} y={64} width={126} height={24} rx={12} fill="#E9C4AC" stroke="#334155" strokeWidth={2.3} />
        <rect x={136} y={56} width={34} height={14} rx={7} fill="#E9C4AC" stroke="#334155" strokeWidth={2} />
      </g>
    );
  }
  if (shape === 'flat-palm') {
    return (
      <g aria-hidden="true" transform="translate(-105, 22) scale(0.86)">
        <rect x={156} y={196} width={118} height={92} rx={24} fill="#EED0BC" stroke="#334155" strokeWidth={2.4} />
        <rect x={154} y={110} width={22} height={96} rx={11} fill="#EED0BC" stroke="#334155" strokeWidth={2.2} />
        <rect x={182} y={100} width={22} height={106} rx={11} fill="#EED0BC" stroke="#334155" strokeWidth={2.2} />
        <rect x={210} y={108} width={22} height={98} rx={11} fill="#EED0BC" stroke="#334155" strokeWidth={2.2} />
        <rect x={238} y={124} width={20} height={82} rx={10} fill="#EED0BC" stroke="#334155" strokeWidth={2.2} />
      </g>
    );
  }
  // mirror-o
  return (
    <g aria-hidden="true" transform="translate(-88, 12) scale(0.88)">
      <path
        d="M 145 278 C 140 220, 178 188, 214 196 C 234 202, 232 222, 212 224 C 194 226, 186 244, 192 278 Z"
        fill="#EED0BC"
        stroke="#334155"
        strokeWidth={2.4}
      />
    </g>
  );
}

export const HandVectorCore: React.FC<{visual: HandVisualSpec}> = ({visual}) => {
  const isBack = visual.palm === 'back';
  const palmFill = isBack ? '#E9C4AC' : '#F4D5C0';
  const rotation = visual.rotation ?? 0;

  // Order thumb z-index properly: if 'across' or 'touch-*' or 'between-*', render AFTER fingers so it sits in front/between!
  const thumbInFront =
    visual.thumb === 'across' ||
    visual.thumb === 'touch-index' ||
    visual.thumb === 'touch-all' ||
    visual.thumb === 'between-1-2' ||
    visual.thumb === 'between-2-3' ||
    visual.thumb === 'under-3';

  return (
    <g transform={`rotate(${rotation}, 205, 248)`}>
      {/* Wrist */}
      <rect
        x={168}
        y={282}
        width={78}
        height={64}
        rx={16}
        fill={palmFill}
        stroke="#334155"
        strokeWidth={2.4}
      />

      {/* Fingers */}
      {(['pinky', 'ring', 'middle', 'index'] as FingerName[]).map((finger) =>
        renderFinger(finger, visual.fingers[finger], visual.palm, visual.fingerGap),
      )}

      {/* Thumb behind palm if tucked/out */}
      {!thumbInFront && renderThumb(visual)}

      {/* Palm Body */}
      <path
        d={
          visual.palm === 'side-in' || visual.palm === 'side-out'
            ? 'M 152 204 C 146 240, 146 286, 170 296 L 242 296 C 266 284, 270 236, 266 202 Z'
            : 'M 142 204 C 138 242, 144 286, 170 296 L 242 296 C 268 286, 276 242, 272 204 Z'
        }
        fill={palmFill}
        stroke="#334155"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Palm creases vs dorsal knuckles */}
      {!isBack ? (
        <g opacity={0.65}>
          <path
            d="M 164 236 Q 204 242 248 228"
            fill="none"
            stroke="#C7967A"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <path
            d="M 168 264 Q 196 248 214 282"
            fill="none"
            stroke="#C7967A"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </g>
      ) : (
        <g opacity={0.55}>
          <path
            d="M 156 212 Q 207 204 260 212"
            fill="none"
            stroke="#B8876D"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Thumb in front when crossing, touching, or peeking between fingers */}
      {thumbInFront && renderThumb(visual)}

      {/* Motion Arrows */}
      {renderMotionOverlay(visual.motion)}
    </g>
  );
};

export const SignHandStage: React.FC<SignHandStageProps> = ({
  visual,
  viewMode,
  palmLabel,
  nonManualLabel,
  handCountLabel,
  showCueMeta = true,
}) => {
  const hasHeadContext =
    viewMode === 'full' &&
    ((visual.nonManual && visual.nonManual !== 'neutral') ||
      (visual.placement && visual.placement !== 'neutral'));

  const viewBox =
    viewMode === 'zoom'
      ? '76 76 260 245'
      : hasHeadContext
        ? '14 14 358 336'
        : '48 48 318 296';

  const handOffsetX = hasHeadContext ? 56 : 0;
  const handOffsetY =
    hasHeadContext && visual.placement === 'forehead'
      ? -18
      : hasHeadContext && visual.placement === 'temple'
        ? -14
        : hasHeadContext && visual.placement === 'chin'
          ? 6
          : hasHeadContext && visual.placement === 'chest'
            ? 24
            : 0;

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="relative flex min-h-[290px] items-center justify-center bg-[radial-gradient(circle_at_50%_38%,#F8FAFC_0%,#F1F5F9_100%)] p-4 sm:min-h-[340px]">
        <svg
          viewBox={viewBox}
          className="h-64 w-full max-w-[420px] select-none transition-all duration-200 sm:h-80"
          role="img"
          aria-label="Sign language handshape visual stage"
        >
          <defs>
            <marker
              id="signcue-arrow"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#4F46E5" />
            </marker>
            <marker
              id="signcue-arrow-emerald"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" fill="#059669" />
            </marker>
            <marker
              id="signcue-arrow-rose"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" fill="#E11D48" />
            </marker>
          </defs>

          {/* Subtle stage floor shadow */}
          <ellipse cx={206} cy={334} rx={84} ry={10} fill="#CBD5E1" opacity={0.35} />

          {/* Signer schematic head & placement context when in Full View */}
          {viewMode === 'full' && renderNonManualHead(visual.nonManual, visual.placement)}

          {/* Optional secondary hand for two-handed signs */}
          {viewMode === 'full' && visual.twoHanded && (
            <g transform={`translate(${handOffsetX}, ${handOffsetY})`}>
              {renderSecondaryHand(visual.secondaryShape)}
            </g>
          )}

          {/* Primary dominant hand */}
          <g transform={`translate(${handOffsetX}, ${handOffsetY})`}>
            <HandVectorCore visual={visual} />
          </g>
        </svg>
      </div>

      {showCueMeta && (palmLabel || nonManualLabel || handCountLabel) && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-600">
          {palmLabel && <span>{palmLabel}</span>}
          {handCountLabel && (
            <>
              <span aria-hidden="true">·</span>
              <span>{handCountLabel}</span>
            </>
          )}
          {nonManualLabel && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-indigo-700">{nonManualLabel}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const SignHandThumb: React.FC<{visual: HandVisualSpec; label: string}> = ({
  visual,
  label,
}) => {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5">
      <svg
        viewBox="74 74 264 252"
        className="h-24 w-24 select-none"
        role="img"
        aria-label={label}
      >
        <defs>
          <marker
            id="signcue-arrow-thumb"
            markerWidth="6"
            markerHeight="6"
            refX="4"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill="#4F46E5" />
          </marker>
        </defs>
        <HandVectorCore visual={visual} />
      </svg>
      <span className="text-xs font-semibold text-slate-800">{label}</span>
    </div>
  );
};
