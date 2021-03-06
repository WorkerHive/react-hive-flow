import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import commonjs from 'rollup-plugin-commonjs';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const input = "src/index.tsx";


const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
  commonjs({
    include: 'node_modules/**',
    // left-hand side can be an absolute path, a path
    // relative to the current directory, or the name
    // of a module in node_modules
    namedExports: {
      'node_modules/react/index.js': [
        'cloneElement',
        'createContext',
        'Component',
        'createElement'
      ],
      'node_modules/react-dom/index.js': ['render', 'hydrate'],
      'node_modules/react-is/index.js': [
        'isElement',
        'isValidElementType',
        'ForwardRef'
      ]
    }
  }),
  postcss({
    plugins: [autoprefixer()],
    sourceMap: true,
    extract: true,
    minimize: true
  })
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
  },
];

