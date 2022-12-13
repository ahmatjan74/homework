import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import clear from "rollup-plugin-clear";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import htmlTemplate from "rollup-plugin-generate-html-template";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: ["./src/index.tsx"],
  output: {
    file: "dist/main.js",
    format: "cjs",
  },
  plugins: [
    typescript(), // 会自动读取sconfig.json配置文件
    peerDepsExternal({includeDependencies: false}),
    postcss(),
    clear({
      targets: ["dist"],
      watch: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"), // 否则会报：process is not defined的错
    }),
    nodeResolve({}),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
    serve("dist"),
    livereload("dist"),
    htmlTemplate({
      template: "public/index.html",
      target: "dist/index.html",
    }),
  ],
  external: [
    {
      includeDependencies: true,
    },
  ],
};
