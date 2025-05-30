"use client";

import { useState } from "react";
import { FileUp, FileCode } from "lucide-react";
import { MD5, SHA1, SHA256, SHA512 } from "crypto-js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ToolLayout from "@/components/tools/tool-layout";
import { Card, CardContent } from "@/components/ui/card";

interface HashResult {
  algorithm: string;
  hash: string;
}

export default function HashGeneratorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<HashResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateHashes = (content: string) => {
    return [
      { algorithm: "MD5", hash: MD5(content).toString() },
      { algorithm: "SHA-1", hash: SHA1(content).toString() },
      { algorithm: "SHA-256", hash: SHA256(content).toString() },
      { algorithm: "SHA-512", hash: SHA512(content).toString() }
    ];
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setIsProcessing(true);

    try {
      const content = await selectedFile.text();
      const hashes = calculateHashes(content);
      setResults(hashes);
    } catch (err) {
      setError("文件读取失败，请重试");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <ToolLayout
      title="文件哈希生成器"
      description="计算文件的MD5、SHA1、SHA256等哈希值，用于校验文件完整性"
      icon={<FileCode className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文件工具",
        href: "/#file-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="file-upload">选择文件</Label>
            <div className="mt-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={isProcessing}
              >
                <FileUp className="mr-2 h-4 w-4" />
                {isProcessing ? "处理中..." : "上传文件"}
              </Button>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {file && (
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm">
                文件名: {file.name}
                <br />
                大小: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid gap-4">
              {results.map((result) => (
                <Card key={result.algorithm}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <Label>{result.algorithm}</Label>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.hash)}>
                        复制
                      </Button>
                    </div>
                    <div className="bg-muted mt-2 rounded-md p-2 font-mono text-sm break-all">{result.hash}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
