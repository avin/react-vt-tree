import React from 'react';
import { storiesOf } from '@storybook/react';
import TreeWithFlatData from './TreeWithFlatData';
import TreeWithStructuredData from './TreeWithStructuredData';
import Styling from './Styling';

storiesOf('react-vt-tree', module)
    .add('Flat data-structure', () => <TreeWithFlatData />)
    .add('Nested data-structure', () => <TreeWithStructuredData />)
    .add('Styling tree', () => <Styling />);
