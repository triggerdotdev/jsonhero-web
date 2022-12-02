import { Body } from "../Primitives/Body";

export function HomeWorkflowBanner() {
  return (
    <div className="mt-[52px] sm:mt-[82px] flex items-center justify-center w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:backdrop-filter hover:backdrop-brightness-75 transition">
      <div className="relative flex justify-center items-center  md:w-full pl-6 md:px-6">
        <div className="flex gap-4 items-center py-4">
          <div className="flex flex-col items-start justify-center md:w-auto">
            <Body className=" text-white text-lg md:text-xl font-bold  leading-tight">
              🫵 We need your help...
            </Body>
            <p className=" text-white md:text-lg text-sm">
              Have 2 minutes to answer a few questions about workflows?
            </p>
          </div>
          <div className="flex flex-col items-center justify-center pr-4">
            <a
              href="https://bcymafitv0e.typeform.com/automation"
              target="new"
              className="flex items-center py-2 justify-center px-3 text-center text-md md:text-xl text-slate-800 font-bold bg-lime-500 rounded shadow-md hover:bg-lime-400 transition whitespace-nowrap"
            >
              Start survey &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
