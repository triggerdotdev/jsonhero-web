import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentPropsWithoutRef } from "@radix-ui/react-primitive";
import React from "react";

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>((props, ref) => {
  return <PopoverPrimitive.Trigger asChild ref={ref} {...props} />;
});

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, ...props }, ref) => {
  return (
    <PopoverPrimitive.Content {...props} ref={ref}>
      {children}
    </PopoverPrimitive.Content>
  );
});

export const PopoverArrow = PopoverPrimitive.Arrow;
