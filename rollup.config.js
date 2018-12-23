import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const input = './src/index.js';

const external = id => !id.includes(':\\') && !id.startsWith('.') && !id.startsWith('/');

export default [
    {
        input,
        output: {
            file: pkg.main,
            format: 'cjs',
        },
        external,
        plugins: [
            babel({
                runtimeHelpers: true,
                plugins: ['flow-react-proptypes', '@babel/transform-runtime'],
            }),
            nodeResolve(),
            commonjs(),
            copy({
                'src/style.css': 'dist/style.css',
            }),
        ],
    },

    {
        input,
        output: {
            file: pkg.module,
            format: 'esm',
        },
        external,
        plugins: [
            babel({
                runtimeHelpers: true,
                plugins: ['flow-react-proptypes', ['@babel/transform-runtime', { useESModules: true }]],
            }),
            nodeResolve(),
            commonjs(),
        ],
    },
];
