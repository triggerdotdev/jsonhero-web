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
    "z-50 fixed bottom-4 inset-x-4 w-auto md:bottom-4 md:right-2 md:left-auto md:bottom-auto md:w-full md:max-w-sm shadow-lg rounded-md",
    "border-[1px]",
    "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
    "radix-state-closed:animate-toast-hide",
    "radix-swipe-end:animate-toast-swipe-out",
    "translate-x-radix-toast-swipe-move-x",
    "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
    "focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
  );

  const typeRootClasses =
    type === "success"
      ? "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-black"
      : "bg-red-100 dark:bg-red-100 border-red-200 dark:border-red-400";

  const titleClasses = type === "success" ? "text-slate-900" : "text-red-900";
  const bodyClasses = type === "success" ? "text-slate-700" : "text-red-700";

  return (
    <ToastPrimitive.Provider duration={duration ?? 2500}>
      <ToastPrimitive.Root className={cx(commonRootClasses, typeRootClasses)}>
        <div className="flex">
          <div className="w-0 flex-1 flex items-center pl-5 py-4">
            <div className="w-full radix">
              <Title className={titleClasses}>{title}</Title>
              <Body className={cx("mt-0.5", bodyClasses)}>{message}</Body>
            </div>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};

export default Toast;
