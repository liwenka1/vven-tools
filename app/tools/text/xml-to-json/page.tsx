"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileJson, ClipboardCopy } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Label } from "@/components/ui/label";

// A simple XML to JSON converter function (basic implementation)
// For a more robust solution, a library like 'xml2js' would be better, but that requires adding a dependency.
const convertXmlToJson = (xmlString: string): string => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // Check for parsing errors
    const parserError = xmlDoc.getElementsByTagName("parsererror");
    if (parserError.length > 0) {
      return JSON.stringify({ error: "Invalid XML format", details: parserError[0].textContent }, null, 2);
    }

    const result = xmlToJson(xmlDoc);
    return JSON.stringify(result, null, 2);
  } catch (error) {
    if (error instanceof Error) {
      return JSON.stringify({ error: "Error converting XML to JSON", message: error.message }, null, 2);
    }
    return JSON.stringify({ error: "Unknown error converting XML to JSON" }, null, 2);
  }
};

// Helper function to get the value of a node
const getNodeValue = (node: Node): string | number | Record<string, unknown> | null | undefined => {
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue && node.nodeValue.trim() !== "") {
    // text node
    const textContent = node.nodeValue.trim();
    // Try to convert to number if it's a valid number string
    const num = Number(textContent);
    return isNaN(num) ? textContent : num;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // element node
    return xmlToJson(node);
  }
  return undefined;
};

// Helper function to aggregate node values into an object
const aggregateNodeValue = (
  obj: Record<string, unknown>,
  nodeName: string,
  value: string | number | Record<string, unknown> | null | undefined
) => {
  if (value === undefined) return;
  if (typeof obj[nodeName] === "undefined") {
    obj[nodeName] = value;
  } else {
    if (!Array.isArray(obj[nodeName])) {
      obj[nodeName] = [obj[nodeName]];
    }
    (obj[nodeName] as (string | number | Record<string, unknown> | null | undefined)[]).push(value);
  }
};

// Helper function to process child nodes of an XML element
const processChildNodes = (xml: Node, obj: Record<string, unknown>) => {
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      if (!item || item.nodeType === Node.COMMENT_NODE) {
        // ignore null or comment nodes
        continue;
      }

      const nodeName = item.nodeName;
      const value = getNodeValue(item);

      if (value !== undefined) {
        aggregateNodeValue(obj, nodeName, value);
      }
    }
  }
};

// Helper function to convert XML DOM to JSON object
const xmlToJson = (xml: Node): Record<string, unknown> | string | number | null | undefined => {
  if (xml.nodeType === Node.DOCUMENT_NODE) {
    // Document node
    const doc = xml as Document;
    return doc.documentElement ? xmlToJson(doc.documentElement) : null;
  }

  if (xml.nodeType !== Node.ELEMENT_NODE) {
    // Process only element nodes further
    return undefined; // Or handle other node types if necessary
  }

  const obj: Record<string, unknown> = {};
  processChildNodes(xml, obj);

  // Simplify output for single text node children
  const keys = Object.keys(obj);
  if (keys.length === 1 && keys[0] === "#text" && typeof obj["#text"] !== "object") {
    return obj["#text"] as string | number | undefined;
  }

  // Represent empty elements (e.g., <tag/> or <tag></tag>) as null
  if (keys.length === 0 && !xml.hasChildNodes()) {
    return null; // Or "" for an empty string, or {} for an empty object
  }

  return obj;
};

export default function XmlToJsonPage() {
  const [xmlInput, setXmlInput] = useState<string>("");
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleConvert = () => {
    if (!xmlInput.trim()) {
      setJsonOutput(JSON.stringify({ error: "XML input cannot be empty." }, null, 2));
      return;
    }
    const result = convertXmlToJson(xmlInput);
    setJsonOutput(result);
  };

  const handleClear = () => {
    setXmlInput("");
    setJsonOutput("");
  };

  const handleCopy = async () => {
    if (!jsonOutput) return;
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ToolLayout
      title="XML 转 JSON"
      description="将 XML 数据快速转换为 JSON 格式"
      icon={<FileJson className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文本工具",
        href: "/#text-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="xml-input" className="font-medium">
              输入 XML
            </Label>
            <Textarea
              id="xml-input"
              placeholder="在此处粘贴您的 XML..."
              value={xmlInput}
              onChange={(e) => setXmlInput(e.target.value)}
              className="min-h-[300px] resize-y font-mono text-sm"
              aria-label="XML Input"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="json-output" className="font-medium">
                输出 JSON
              </Label>
              {jsonOutput && (
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  复制
                </Button>
              )}
            </div>
            <Textarea
              id="json-output"
              placeholder="转换后的 JSON 将显示在此处..."
              value={jsonOutput}
              readOnly
              className="bg-muted/30 min-h-[300px] resize-y font-mono text-sm"
              aria-label="JSON Output"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button onClick={handleConvert} className="bg-blue-600 hover:bg-blue-700" disabled={!xmlInput.trim()}>
            转换
          </Button>
          <Button onClick={handleClear} variant="outline" disabled={!xmlInput && !jsonOutput}>
            清空
          </Button>
        </div>

        {copied && (
          <div className="fixed right-4 bottom-4 z-50">
            <div className="flex items-center rounded-full bg-blue-100 px-3 py-2 text-sm text-blue-800 shadow-lg dark:bg-blue-900 dark:text-blue-200">
              <ClipboardCopy className="mr-2 h-4 w-4" />
              已复制到剪贴板
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
