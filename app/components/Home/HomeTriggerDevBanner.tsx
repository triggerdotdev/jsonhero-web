import {
  ArrowSmRightIcon,
  CalendarIcon,
  CheckCircleIcon,
  CodeIcon,
} from "@heroicons/react/outline";
import TriggerDevLogoImage from "~/assets/images/trigger-dev-logo.png";

export function HomeTriggerDevBanner() {
  return (
    <div className="flex items-center justify-start sm:justify-center w-full py-4 bg-gradient-to-r from-purple-600 via-[#485cec] to-purple-600 hover:backdrop-filter hover:backdrop-brightness-75 transition">
      <div className="w-full relative flex flex-col sm:flex-row justify-center items-center sm:px-6 px-4 gap-y-4">
        <div className="flex flex-col">
          <a href="https://trigger.dev" target="_blank" className="mb-1">
            <TriggerDevLogo className="w-48"></TriggerDevLogo>
          </a>
          <p className="text-white sm:text-lg text-lg">
            We're building something new!
          </p>
          <a
            href="https://trigger.dev"
            target="_blank"
            className="flex items-center justify-center w-full px-3 py-2 mt-2 text-center text-xl sm:text-xl text-slate-800 font-bold bg-lime-500 rounded shadow-sm hover:bg-lime-400 transition"
          >
            Check it out <ArrowSmRightIcon className="w-6 h-6 ml-1" />
          </a>
        </div>
        <div className="text-white sm:text-lg text-lg pl-8">
          <p className="font-bold ">
            Create reliable workflows in your codebase:
          </p>
          <p className="sm:text-md text-lg">
            <li className="flex items-center gap-2">
              <CodeIcon className="w-6 h-6 text-lime-400" /> Version controlled,
              keep your own data secure.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-6 h-6 text-lime-400" />
              Popular integrations with easy authentication.
            </li>
            <li className="flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-lime-400" />
              Easy CRON jobs, webhooks and custom events.
            </li>
          </p>
        </div>
      </div>
    </div>
  );
}

function TriggerDevLogo({ className }: { className: string }) {
  return <img src={TriggerDevLogoImage} className={className} />;
}
