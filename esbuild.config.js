const esbuild = require("esbuild");
const babel = require("@vip30/esbuild-plugin-babel");
const pkg = require("./package.json");

async function build() {
  try {
    const config = {
      absWorkingDir: __dirname,
      bundle: true,
      external: [
        ...Object.keys(pkg.dependencies || {}).filter(
          (dependency) => dependency !== "~"
        ),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      plugins: [
        babel({
          filter: /.*/,
        }),
      ],
      platform: "browser",
      sourcemap: false,
      minify: false,
      tsconfig: "tsconfig.json",
    };

    await Promise.all([
      esbuild.build({
        ...config,
        entryPoints: ["src/index.ts"],
        format: "cjs",
        outfile: "./dist/cjs/index.js",
      }),
      esbuild.build({
        ...config,
        entryPoints: ["src/index.ts"],
        splitting: true,
        format: "esm",
        outdir: "dist/esm",
      }),
    ]);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
build();
