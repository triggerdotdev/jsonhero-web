import * as DialogPrimitive from "@radix-ui/react-dialog";
import React, { ComponentPropsWithoutRef } from "react";
import { omit } from "lodash-es";

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    onOverlayClick?: () => void;
  }
>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      forceMount
      className="fixed inset-0 z-20 bg-black/60"
      onClick={() => {
        props.onOverlayClick && props.onOverlayClick();
      }}
    />
    <DialogPrimitive.Content
      forceMount
      {...omit(props, "onOverlayClick")}
      ref={forwardedRef}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
