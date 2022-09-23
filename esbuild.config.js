const esbuild = require("esbuild");
const pkg = require("./package.json");

async function build() {
  try {
    await esbuild.build({
      absWorkingDir: __dirname,
      bundle: true,
      external: [
        ...Object.keys(pkg.dependencies || {}).filter(dependency => dependency !== "~"),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      platform: "browser",
      sourcemap: false,
      minify: false,
      tsconfig: "tsconfig.json",
      entryPoints: [
        "src/index.ts",
      ],
      splitting: true,
      format: "esm",
      outdir: "dist",
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
build();
