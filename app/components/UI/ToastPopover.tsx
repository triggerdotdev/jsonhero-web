import * as ToastPrimitive from "@radix-ui/react-toast";
import cx from "~/utilities/classnames";
import React, { useEffect } from "react";
import { Body } from "../Primitives/Body";
import { Title } from "../Primitives/Title";

type Props = { message: string };

const Toast = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        onOpenChange={setOpen}
        className={cx(
          "z-50 fixed bottom-4 inset-x-4 w-auto md:top-4 md:right-2 md:left-auto md:bottom-auto md:w-full md:max-w-sm shadow-lg rounded-md",
          "bg-slate-100 dark:bg-slate-900 border-[1px] border-slate-200 dark:border-black",
          "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
          "radix-state-closed:animate-toast-hide",
          "radix-swipe-end:animate-toast-swipe-out",
          "translate-x-radix-toast-swipe-move-x",
          "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
          "focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
        )}
      >
        <div className="flex">
          <div className="w-0 flex-1 flex items-center pl-5 py-4">
            <div className="w-full radix">
              <Title className="dark:text-slate-200">Invalid JSON</Title>
              <Body className="mt-0.5 dark:text-slate-400">
                {props.message}
              </Body>
            </div>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};

export default Toast;
