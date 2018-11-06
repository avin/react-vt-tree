import React from 'react';
import { storiesOf } from '@storybook/react';
import TreeWithFlatData from './TreeWithFlatData';
import TreeWithStructuredData from './TreeWithStructuredData';

storiesOf('react-vt-tree', module)
    .add('Flat data-structure', () => <TreeWithFlatData />)
    .add('Nested data-structure', () => <TreeWithStructuredData />);
