import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 container w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            <span className="hidden font-bold sm:inline-block">VVen Tools</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {/* Add Nav Links Here if needed */}
            {/* Example: <Link href="/tools" className="transition-colors hover:text-foreground/80 text-foreground/60">Tools</Link> */}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ModeToggle />
            {/* Add other buttons like Login/Signup if needed */}
            {/* Example: <Button variant="outline" size="sm">Login</Button> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
