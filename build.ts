import * as esbuild from "esbuild";
import {
  type ScriptMetadata,
  generateBanner,
  iconFromDomain,
} from "./utils/metadata.ts";

const pkg = await import("./package.json", { assert: { type: "json" } });

const metadata: ScriptMetadata = {
  name: pkg.name,
  version: pkg.version,
  author: pkg.author.name,
  description: pkg.description,
  icon: iconFromDomain("zhihu.com"),
  match: ["https://*.zhihu.com/*"],
};

console.log("Building the script with the following metadata:", metadata);

await esbuild.build({
  entryPoints: ["src/main.ts"],
  target: "es2020",
  bundle: true,
  outfile: `dist/${metadata.name}.user.js`,
  platform: "browser",
  format: "esm",
  banner: {
    js: generateBanner(metadata),
  },
});
