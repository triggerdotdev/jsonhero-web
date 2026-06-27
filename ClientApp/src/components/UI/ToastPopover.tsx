import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import * as ToastPrimitive from "@radix-ui/react-toast";
import cx from "~/utilities/classnames";
import { Body } from "../Primitives/Body";
import { Title } from "../Primitives/Title";

const Toast = ({
  message,
  title,
  duration,
  type,
}: {
  message: string;
  title: string;
  type: "success" | "error";
  duration?: number;
}) => {
  const commonRootClasses = cx(
    "z-50 fixed top-4 left-4 py-2 w-auto md:top-4 md:right-4 md:left-auto md:top-auto md:w-full md:max-w-sm shadow-lg rounded-md",
    "border-[1px]",
    "radix-state-open:animate-toast-slide-in-top md:radix-state-open:animate-toast-slide-in-right",
    "radix-state-closed:animate-toast-hide",
    "radix-swipe-end:animate-toast-swipe-out",
    "translate-x-radix-toast-swipe-move-x",
    "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
    "focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
  );

  const typeRootClasses =
    type === "success"
      ? "bg-slate-50 dark:bg-slate-900"
      : "bg-rose-50 dark:bg-rose-100";

  const titleClasses =
    type === "success" ? "text-emerald-500" : "text-slate-900";
  const bodyClasses =
    type === "success" ? "text-emerald-500" : "text-slate-700";

  const iconType =
    type === "success" ? "text-emerald-700 h-7 w-7" : "text-rose-700 h-7 w-7";

  return (
    <ToastPrimitive.Provider duration={duration ?? 2500}>
      <ToastPrimitive.Root className={cx(commonRootClasses, typeRootClasses)}>
        <div className="flex">
          <div className="flex-1 flex items-center">
            <div className="flex px-4">
              {type === "success" ? (
                <InformationCircleIcon className={cx(iconType)} />
              ) : (
                <ExclamationCircleIcon className={cx(iconType)} />
              )}
            </div>
            <div className="w-full radix">
              <Title className={cx("-mb-0.5", titleClasses)}>{title}</Title>
              <Body className={cx("mb-0.5", bodyClasses)}>{message}</Body>
            </div>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};

export default Toast;
