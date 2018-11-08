import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

const input = './src/index.js';

export default [
    {
        input,
        output: {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        plugins: [
            external(),
            babel({
                runtimeHelpers: true,
                exclude: 'node_modules/**',
                plugins: ['@babel/transform-runtime', 'flow-react-proptypes'],
            }),
            nodeResolve(),
            commonjs(),
        ],
    },

    {
        input,
        output: {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
        },
        plugins: [
            external(),
            babel({
                runtimeHelpers: true,
                exclude: 'node_modules/**',
                plugins: [['@babel/transform-runtime', { useESModules: true }], 'flow-react-proptypes'],
            }),
            nodeResolve(),
            commonjs(),
        ],
    },
];
