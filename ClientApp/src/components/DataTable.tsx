import { FunctionComponent, useState } from "react";
import { CopyTextButton } from "./CopyTextButton";
import { Title } from "./Primitives/Title";

export type DataTableProps = {
  rows: DataTableRow[];
};

export type DataTableRow = {
  key: string;
  value: string;
  icon?: JSX.Element;
};

type DataRowProps = {
  title: string;
  value: string;
  icon?: JSX.Element;
};

const DataRow: FunctionComponent<DataRowProps> = ({ title, value, icon }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <tr className="divide-solid divide-x transition dark:divide-slate-700">
      <td className="flex items-baseline py-2 pr-3 text-base dark:text-slate-400">
        <div className="flex-1 ml-1">{title}</div>
      </td>
      <td
        onMouseOver={() => setHovering(true)}
        onMouseOut={() => setHovering(false)}
        className={`relative w-full h-full pl-2 py-2 text-base text-slate-800 transition dark:text-slate-300 break-all ${
          hovering ? "bg-slate-100 dark:bg-slate-700" : "bg-transparent"
        }`}
      >
        {value}
        <div
          className={`absolute top-0 right-0 flex justify-end h-full w-full transition ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <CopyTextButton
            className="bg-slate-200 hover:bg-slate-300 h-fit mt-1 mr-1 px-2 py-0.5 rounded-sm transition hover:cursor-pointer dark:text-white dark:bg-slate-600 dark:hover:bg-slate-500"
            value={value}
          ></CopyTextButton>
        </div>
      </td>
    </tr>
  );
};

export const DataTable: FunctionComponent<DataTableProps> = ({ rows }) => {
  return (
    <div>
      <Title className="text-slate-700 dark:text-slate-400 mb-2">
        Properties
      </Title>
      <table className="w-full table-auto border-y-[0.5px] border-slate-300 transition dark:border-slate-700">
        <tbody className="divide-solid divide-y divide-slate-300 w-full transition dark:divide-slate-700">
          {rows.map((row) => {
            return (
              <DataRow
                key={row.key}
                title={row.key}
                value={row.value}
                icon={row.icon}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
