import * as React from "react";
import clsx from "clsx";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
};

export function Checkbox({ checked, onChange, label }: Props) {
  return (
    <label className="inline-flex items-center gap-2 text-xs text-neutral-700 select-none">
      <input
        type="checkbox"
        className={clsx(
          "h-4 w-4 rounded border-neutral-300 text-brand-500 focus:ring-brand-500/40",
        )}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
