import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const input = './src/index.js';

const external = id => {
    return !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('C:');
};

export default [
    {
        input,
        output: {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        external,
        plugins: [
            babel({
                runtimeHelpers: true,
                plugins: ['@babel/transform-runtime'],
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
            sourcemap: true
        },
        external,
        plugins: [
            babel({
                runtimeHelpers: true,
                plugins: [['@babel/transform-runtime', { useESModules: true }]],
            }),
            nodeResolve(),
            commonjs(),
        ],
    },
];