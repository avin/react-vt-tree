import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

export default [
    {
        input: './src/index.js',
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
                plugins: ['flow-react-proptypes', ['@babel/transform-runtime', { useESModules: true }]],
            }),
            nodeResolve(),
            commonjs(),
            copy({
                'src/style.css': 'dist/style.css',
            }),
        ],
    },
];
