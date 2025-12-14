import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "高薪招聘",
    short_name: "高薪",
    description:
      "高薪是一家专业的求职招聘平台，连接求职者与优质企业。发现高薪职位、职业发展机会和最新招聘信息，为您的职业目标量身打造",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
