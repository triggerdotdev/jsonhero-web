import { useJson } from "~/hooks/useJson";
import { useJsonDoc } from "~/hooks/useJsonDoc";
import { CopyTextButton } from "./CopyTextButton";
import { Body } from "./Primitives/Body";
import { Mono } from "./Primitives/Mono";
import { SmallTitle } from "./Primitives/SmallTitle";
import { useState } from "react";

export function JsonStringView() {
  const [json] = useJson();
  const { minimal } = useJsonDoc();
  const [formatType, setFormatType] = useState<"java" | "csharp" | "javascript" | "python" | "go" | "c" | "cpp" | "rust">("java");

  // 智能转义函数，避免重复转义
  const smartEscape = (str: string): string => {
    // 检查是否包含已经转义的JSON字符串（包含 \\" 模式）
    const hasEscapedJson = /\\"/.test(str);
    
    if (hasEscapedJson) {
      // 如果包含已转义的JSON，我们需要特殊处理
      // 将 \\" 替换为 \"，然后进行正常转义
      return str
        .replace(/\\\\"/g, '\\"')  // 将 \\" 替换为 \"
        .replace(/\\/g, '\\\\')   // 转义反斜杠
        .replace(/"/g, '\\"');    // 转义双引号
    }
    
    // 否则进行正常转义
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');
  };

  // 将JSON转换为Java String格式（压缩成一行）
  const convertToJavaString = (obj: any): string => {
    const jsonString = JSON.stringify(obj); // 压缩成一行
    console.log('Java conversion - original JSON string:', jsonString);
    const result = `String jsonString = "${smartEscape(jsonString)}";`;
    console.log('Java conversion - final result:', result);
    return result;
  };

  // 将JSON转换为C# String格式（压缩成一行）
  const convertToCSharpString = (obj: any): string => {
    const jsonString = JSON.stringify(obj); // 压缩成一行
    return `string jsonString = "${smartEscape(jsonString)}";`;
  };

  // 将JSON转换为JavaScript String格式（压缩成一行）
  const convertToJavaScriptString = (obj: any): string => {
    const jsonString = JSON.stringify(obj); // 压缩成一行
    return `const jsonString = "${smartEscape(jsonString)}";`;
  };

  // 将JSON转换为Python String格式（压缩成一行）
  const convertToPythonString = (obj: any): string => {
    const jsonString = JSON.stringify(obj); // 压缩成一行
    return `json_string = "${smartEscape(jsonString)}"`;
  };

  // 将JSON转换为Go String格式（压缩成一行）
  const convertToGoString = (obj: any): string => {
    const jsonString = JSON.stringify(obj); // 压缩成一行
    return `jsonString := "${smartEscape(jsonString)}"`;
  };

  // 将JSON转换为C String格式（压缩成一行）
  const convertToCString = (obj: any): string => {
    const jsonString = JSON.stringify(obj); // 压缩成一行
    return `char* jsonString = "${smartEscape(jsonString)}";`;
  };

  // 将JSON转换为C++ String格式（压缩成一行）
  const convertToCppString = (obj: any): string => {
    const jsonString = JSON.stringify(obj); // 压缩成一行
    return `std::string jsonString = "${smartEscape(jsonString)}";`;
  };

  // 将JSON转换为Rust String格式（压缩成一行）
  const convertToRustString = (obj: any): string => {
    const jsonString = JSON.stringify(obj); // 压缩成一行
    return `let json_string = "${smartEscape(jsonString)}";`;
  };

  // 根据选择的格式生成对应的字符串
  const getFormattedString = () => {
    switch (formatType) {
      case "java":
        return convertToJavaString(json);
      case "csharp":
        return convertToCSharpString(json);
      case "javascript":
        return convertToJavaScriptString(json);
      case "python":
        return convertToPythonString(json);
      case "go":
        return convertToGoString(json);
      case "c":
        return convertToCString(json);
      case "cpp":
        return convertToCppString(json);
      case "rust":
        return convertToRustString(json);
      default:
        return convertToJavaString(json);
    }
  };

  const formattedString = getFormattedString();
  const containerHeight = minimal ? "calc(100vh - 66px)" : "calc(100vh - 106px)";

  return (
    <div className="flex flex-col h-full">
      {/* 控制栏 */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <div className="flex items-center space-x-4">
          <SmallTitle>Code String Format</SmallTitle>
          <div className="flex items-center space-x-2 flex-wrap">
            <button
              onClick={() => setFormatType("java")}
              className={`px-3 py-1 rounded-sm text-sm font-medium transition ${
                formatType === "java"
                  ? "bg-lime-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              Java
            </button>
            <button
              onClick={() => setFormatType("csharp")}
              className={`px-3 py-1 rounded-sm text-sm font-medium transition ${
                formatType === "csharp"
                  ? "bg-lime-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              C#
            </button>
            <button
              onClick={() => setFormatType("javascript")}
              className={`px-3 py-1 rounded-sm text-sm font-medium transition ${
                formatType === "javascript"
                  ? "bg-lime-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              JS
            </button>
            <button
              onClick={() => setFormatType("python")}
              className={`px-3 py-1 rounded-sm text-sm font-medium transition ${
                formatType === "python"
                  ? "bg-lime-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setFormatType("go")}
              className={`px-3 py-1 rounded-sm text-sm font-medium transition ${
                formatType === "go"
                  ? "bg-lime-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              Go
            </button>
            <button
              onClick={() => setFormatType("c")}
              className={`px-3 py-1 rounded-sm text-sm font-medium transition ${
                formatType === "c"
                  ? "bg-lime-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              C
            </button>
            <button
              onClick={() => setFormatType("cpp")}
              className={`px-3 py-1 rounded-sm text-sm font-medium transition ${
                formatType === "cpp"
                  ? "bg-lime-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              C++
            </button>
            <button
              onClick={() => setFormatType("rust")}
              className={`px-3 py-1 rounded-sm text-sm font-medium transition ${
                formatType === "rust"
                  ? "bg-lime-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              Rust
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Body className="text-slate-600 dark:text-slate-400">
            {formattedString.length} characters
          </Body>
          <CopyTextButton value={formattedString} />
        </div>
      </div>

      {/* 代码字符串显示区域 */}
      <div 
        className="flex-1 overflow-auto p-4"
        style={{ height: containerHeight }}
      >
        <div className="bg-slate-900 rounded-sm p-4 h-full">
          <Mono className="text-slate-200 text-sm whitespace-pre-wrap break-all">
            {formattedString}
          </Mono>
        </div>
      </div>
    </div>
  );
}
