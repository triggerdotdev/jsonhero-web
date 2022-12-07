import { ArrowSmRightIcon } from "@heroicons/react/outline";
import TriggerDevLogoImage from "~/assets/images/trigger-dev-logo.png";
import TriggerDevLaptopImage from "~/assets/images/trigger-dev-laptop.png";

export function HomeTriggerDevBanner() {
  return (
    <div className="flex items-center justify-start md:justify-center w-full h-40 bg-gradient-to-r from-purple-600 via-[#485cec] to-purple-600 hover:backdrop-filter hover:backdrop-brightness-75 transition">
      <div className="relative flex justify-center items-center w-1/2 md:w-full pl-6 md:px-6">
        <div className="flex flex-col items-start justify-start">
          <a href="https://trigger.dev" target="_blank" className="mb-1">
            <TriggerDevLogo className="w-64"></TriggerDevLogo>
          </a>
          <p className="text-white md:text-xl text-sm">
            Create Zapier-like workflows in code.
          </p>
          <a
            href="https://trigger.dev"
            target="_blank"
            className="flex items-center justify-center w-full px-3 py-2 mt-2 text-center text-md md:text-xl text-slate-800 font-bold bg-lime-500 rounded shadow-md hover:bg-lime-400 transition"
          >
            Check it out <ArrowSmRightIcon className="w-6 h-6 ml-1" />
          </a>
        </div>
        <a
          href="https://trigger.dev"
          target="_blank"
          className="absolute md:relative -top-10 md:top-auto -right-[20rem] md:right-auto"
        >
          <TriggerDevLaptop className="w-80 md:w-80 mb-2"></TriggerDevLaptop>
        </a>
      </div>
    </div>
  );
}

function TriggerDevLogo({ className }: { className: string }) {
  return <img src={TriggerDevLogoImage} className={className} />;
}

function TriggerDevLaptop({ className }: { className: string }) {
  return <img src={TriggerDevLaptopImage} className={className} />;
}
