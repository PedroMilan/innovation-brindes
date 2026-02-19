import * as React from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ReactNode;
};

export function Input({ className, leftIcon, ...props }: Props) {
  return (
    <div className={clsx("relative w-full", className)}>
      {leftIcon ? (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
          {leftIcon}
        </span>
      ) : null}
      <input
        className={clsx(
          "w-full rounded-full bg-white px-12 py-3 text-sm outline-none ring-1 ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-brand-500/40",
        )}
        {...props}
      />
    </div>
  );
}
