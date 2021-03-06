require("babel-register")({
  presets: ["es2015", "react"]
});

const router = require("./sitemapRoutes").default; // 좀 전에 만든 sitemapRoutes 파일이 있는 경로입니다.
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://mymask.info")
    .save("./public/sitemap.xml");
}

generateSitemap();
