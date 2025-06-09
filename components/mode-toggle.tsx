"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-9 h-9" />;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all duration-200 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all duration-200 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">切换主题</span>
    </Button>
  );
}
