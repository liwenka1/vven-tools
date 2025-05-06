"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">XML 转 JSON</CardTitle>
          <CardDescription>将您的 XML 数据快速转换为 JSON 格式。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium">输入 XML</h3>
              <Textarea
                placeholder="在此处粘贴您的 XML..."
                value={xmlInput}
                onChange={(e) => setXmlInput(e.target.value)}
                className="min-h-[200px] rounded-md border p-2 focus:ring-2 focus:ring-blue-500 md:min-h-[300px]"
                aria-label="XML Input"
              />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">输出 JSON</h3>
              <Textarea
                placeholder="转换后的 JSON 将显示在此处..."
                value={jsonOutput}
                readOnly
                className="min-h-[200px] rounded-md border bg-gray-50 p-2 md:min-h-[300px] dark:bg-gray-800"
                aria-label="JSON Output"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button onClick={handleConvert} className="w-full sm:w-auto">
              转换
            </Button>
            <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
              清空
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
