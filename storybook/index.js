import React from 'react';
import { storiesOf } from '@storybook/react';
import Styling from './Styling';
import ScrollToTreeNode from './ScrollToTreeNode';
import StressTreeNode from './StressTreeNode';
import { DataStructures } from './DataStructures';

storiesOf('react-vt-tree', module)
    .add('Various data-structures', () => <DataStructures />)
    .add('Styling tree', () => <Styling />)
    .add('Scroll to tree node', () => <ScrollToTreeNode />)
    .add('STRESS Test', () => <StressTreeNode />);
