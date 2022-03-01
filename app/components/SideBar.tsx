import { TemplateIcon, CodeIcon, TerminalIcon } from "@heroicons/react/outline";
import { TreeIcon } from "~/components/Icons/TreeIcon";
import { useHotkeys } from "react-hotkeys-hook";
import { Link, useLocation, useNavigate } from "remix";
import { useJsonDoc } from "~/hooks/useJsonDoc";
import { ToolTip } from "./ToolTip";
import { Body } from "./Primitives/Body";
import { ShortcutIcon } from "./Icons/ShortcutIcon";

export function SideBar() {
  const { doc } = useJsonDoc();

  return (
    <div className="side-bar flex flex-col align-center justify-between h-full p-1 bg-slate-200 transition dark:bg-slate-800">
      <ol className="relative">
        <SidebarLink to={`/j/${doc.id}`} hotKey="cmd+1">
          <ToolTip arrow="left">
            <Body>Column view</Body>
            <ShortcutIcon>⌘</ShortcutIcon>
            <ShortcutIcon>1</ShortcutIcon>
          </ToolTip>
          <TemplateIcon className="p-2 w-full h-full" />
        </SidebarLink>
        <SidebarLink to={`/j/${doc.id}/editor`} hotKey="cmd+2">
          <ToolTip arrow="left">
            <Body>JSON view</Body>
            <ShortcutIcon>⌘</ShortcutIcon>
            <ShortcutIcon>2</ShortcutIcon>
          </ToolTip>
          <CodeIcon className="p-2 w-full h-full" />
        </SidebarLink>
        <SidebarLink to={`/j/${doc.id}/tree`} hotKey="cmd+3">
          <ToolTip arrow="left">
            <Body>Tree view</Body>
            <ShortcutIcon>⌘</ShortcutIcon>
            <ShortcutIcon>3</ShortcutIcon>
          </ToolTip>
          <TreeIcon className="p-2 w-full h-full" />
        </SidebarLink>
      </ol>
      <ol>
        <SidebarLink to={`/j/${doc.id}/terminal`} hotKey="cmd+4">
          <ToolTip arrow="left">
            <Body>Terminal</Body>
            <ShortcutIcon>⌘</ShortcutIcon>
            <ShortcutIcon>4</ShortcutIcon>
          </ToolTip>
          <TerminalIcon className="p-2 w-full h-full" />
        </SidebarLink>
      </ol>
    </div>
  );
}

function SidebarLink({
  children,
  to,
  hotKey,
}: {
  children: React.ReactNode;
  to?: string;
  hotKey?: string;
}) {
  const location = useLocation();

  const isActive = location.pathname === to;

  if (hotKey) {
    const navigate = useNavigate();
    useHotkeys(
      hotKey,
      (e) => {
        e.preventDefault();
        if (!isActive && to) {
          navigate(to);
        }
      },
      [navigate, isActive, to]
    );
  }

  const classes = isActive
    ? "relative w-10 h-10 mb-1 text-white bg-indigo-700 rounded-sm cursor:pointer transition"
    : "relative w-10 h-10 mb-1 text-slate-700 hover:bg-slate-300 rounded-sm cursor:pointer transition dark:text-white dark:hover:bg-slate-700";

  return !!to ? (
    <Link to={to} prefetch={isActive ? "none" : "render"}>
      <li className={classes}>{children}</li>
    </Link>
  ) : (
    <li className={classes}>{children}</li>
  );
}
