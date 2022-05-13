export default function Index() {
  return <Flex />;
}

function Grid() {
  return (
    <div className="grid overflow-hidden grid-cols-1 grid-rows-app gap-0 h-screen">
      <div className="bg-yellow-300 border-yellow-500 border-dashed border">
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

function Flex() {
  return (
    <div className="flex overflow-hidden flex-col gap-0 h-screen">
      <div className="bg-yellow-300 border-yellow-500 border-dashed border min-h-8">
        banner
      </div>
      <div className="bg-green-300 border-green-500 border-dashed border min-h-8">
        header
      </div>
      <div className="bg-red-300 border-red-500 overflow-y-auto border-dashed border flex-grow">
        <div className="h-full w-48 overflow-y-auto no-scrollbar bg-slate-500">
          <div className="">
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
            <TestItem></TestItem>
          </div>
        </div>
      </div>
      <div className="bg-blue-300 border-blue-500 border-dashed border min-h-8">
        footer
      </div>
    </div>
  );
}

function TestItem() {
  return (
    <div className="flex items-center justify-center bg-orange-300 border-b-slate-900 border-b">
      <p className="text-2xl text-black">Test Item</p>
    </div>
  );
}
