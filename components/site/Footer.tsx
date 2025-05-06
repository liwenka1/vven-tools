const Footer = () => {
  return (
    <footer className="container py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose text-balance md:text-left">
          Built by{" "}
          <a
            href="https://github.com/your-github-username" // Replace with your actual GitHub link
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Your Name
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/your-github-username/vven-tools" // Replace with your actual repo link
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
