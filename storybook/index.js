import React from 'react';
import { storiesOf } from '@storybook/react';
import Tree from '../src';

storiesOf('react-vt-tree', module).add('demo', () => {
    return <Tree />;
});
