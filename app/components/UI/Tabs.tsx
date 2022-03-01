import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentPropsWithoutRef } from "@radix-ui/react-primitive";
import React from "react";
import cx from "~/utilities/classnames";

export type TabProps = {
  tabs: Array<{ value: string; label: string }>;
  children: React.ReactNode;
};

export function Tabs({ tabs, children }: TabProps) {
  return (
    <TabsPrimitive.Root defaultValue={tabs[0].value}>
      <TabsPrimitive.List className="">
        {tabs.map(({ value, label }) => (
          <TabsPrimitive.Trigger
            value={value}
            key={`tab-trigger-${value}`}
            className={cx(
              "group",
              "mr-1 px-4 py-1 rounded-t-sm transition",
              "text-slate-500 hover:bg-slate-100 hover:bg-opacity-50 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:bg-opacity-40",
              "radix-state-active:bg-slate-100 radix-state-active:bg-opacity-50 radix-state-active:dark:bg-slate-900 radix-state-active:dark:text-white"
            )}
          >
            {label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {children}
    </TabsPrimitive.Root>
  );
}

export const TabContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>((props, ref) => {
  return <TabsPrimitive.TabsContent ref={ref} {...props} />;
});
