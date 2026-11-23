import React from 'react';

interface AdSlotProps {
  slotId: string;
  size: '728x90' | '300x250';
  label: string;
  note: string;
}

/**
 * Media.net Pre-configured Responsive Ad Container
 * ------------------------------------------------
 * Production Integration Steps:
 * 1. Add your Media.net contextual script tag inside index.html <head>:
 *    <script type="text/javascript">
 *      window._mNHandle = window._mNHandle || {};
 *      window._mNHandle.queue = window._mNHandle.queue || [];
 *      medianet_versionId = "3121199";
 *    </script>
 *    <script src="https://contextual.media.net/dmedianet.js?cid=YOUR_CUSTOMER_ID" async="async"></script>
 * 2. Replace `data-mnet-adunit` below with your Media.net crid and push `_mNDetails.loadTag(slotId, size, slotId)`.
 *
 * CLS Protection: Fixed minimum heights (`min-h-[90px]` / `min-h-[250px]`) prevent layout shift.
 * Print Protection: `.ad-slot-container` is hidden automatically under `@media print`.
 */
export const AdSlot: React.FC<AdSlotProps> = ({slotId, size, label, note}) => {
  const minHeightClass = size === '728x90' ? 'min-h-[90px]' : 'min-h-[250px]';

  return (
    <aside
      aria-label={label}
      className="ad-slot-container print:hidden my-6 rounded-xl border border-dashed border-slate-300 bg-slate-100/70 px-4 py-3 text-center"
    >
      <p className="mb-2 text-[11px] font-medium tracking-wide text-slate-500">{label}</p>
      <div
        id={slotId}
        data-mnet-size={size}
        data-mnet-adunit="SIGNCUE_MEDIANET_SLOT"
        className={`mx-auto flex w-full max-w-[728px] items-center justify-center rounded-lg border border-slate-200/80 bg-white/80 px-4 py-3 text-xs text-slate-500 ${minHeightClass}`}
      >
        <span>{note}</span>
      </div>
    </aside>
  );
};
