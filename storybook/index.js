import React from 'react';
import { storiesOf } from '@storybook/react';
import TreeWithFlatData from './TreeWithFlatData';
import TreeWithStructuredData from './TreeWithStructuredData';

storiesOf('react-vt-tree', module)
    .add('flat data', () => <TreeWithFlatData />)
    .add('structured data', () => <TreeWithStructuredData />);
