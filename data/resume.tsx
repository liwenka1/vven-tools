import { Github, Twitter, Mail } from "lucide-react";

export const ResumeData = {
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/liwenka1",
        icon: Github
      },
      X: {
        name: "Twitter",
        url: "https://x.com/liwenka1",
        icon: Twitter
      },
      email: {
        name: "Send Email",
        url: "mailto:2020583117@qq.com",
        icon: Mail
      }
    }
  }
} as const;
