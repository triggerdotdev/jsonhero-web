import { ChromeExtensionBadge } from "../Icons/ChromeExtensionBadge";
import { Body } from "../Primitives/Body";

export function HomeChromeExtensionPrompt() {
  return (
    <div className="flex items-center justify-center w-full py-3 bg-indigo-600">
      <div className="flex items-center">
        <Body className="mr-3 text-xl text-white">
          Try the new Chrome Extension 👉
        </Body>
        <a
          href="https://chrome.google.com/webstore/detail/json-hero/dneionnnnjnofppmhcccbiaklandilch"
          target="_blank"
        >
          <ChromeExtensionBadge />
        </a>
      </div>
    </div>
  );
}
