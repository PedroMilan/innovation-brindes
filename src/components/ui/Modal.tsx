"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

export function Modal(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content
          className={clsx(
            "fixed left-1/2 top-1/2 w-[min(92vw,820px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-xl outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="text-base font-semibold">{props.title}</Dialog.Title>
            <Dialog.Close
              aria-label="Fechar"
              className="rounded-full p-2 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            >
              ✕
            </Dialog.Close>
          </div>
          <div className="mt-3">{props.children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
