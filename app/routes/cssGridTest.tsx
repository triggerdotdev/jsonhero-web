export default function Index() {
  return (
    <div className="grid overflow-hidden grid-cols-1 grid-rows-app gap-0 h-screen">
      <div className="bg-yellow-300 border-yellow-500 border-dashed border h-0">
        banner
      </div>
      <div className="bg-green-300 border-green-500 border-dashed border">
        header
      </div>
      <div className="bg-red-300 border-red-500 border-dashed border">
        <div className="flex h-full w-24 bg-slate-500"></div>
      </div>
      <div className="bg-blue-300 border-blue-500 border-dashed border">
        footer
      </div>
    </div>
  );
}
