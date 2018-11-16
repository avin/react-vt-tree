import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Tree from '../';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

let data = [
    {
        id: 1,
        content: 'Foo1',
        parentId: 0,
    },
    {
        id: 2,
        content: 'Foo1Child1',
        parentId: 1,
    },
];

const treeProps = {
    height: 200,
    width: 400,
    firstLevelNodesSelector: nodes => nodes.filter(node => !node.parentId),
    isNodeExpandedSelector: node => true,
    nodeContentSelector: node => node.content,
    nodeChildrenSelector: node => data.filter(i => i.parentId === node.id),
    nodes: data,
};

test('isNodeExpandedSelector works', () => {
    const wrapper = mount(<Tree {...treeProps} />);

    expect(wrapper).toIncludeText('Foo1Child1');
    wrapper.setProps({ isNodeExpandedSelector: () => false });
    expect(wrapper).not.toIncludeText('Foo1Child1');
});

test('click expander calls onNodeCollapse/onNodeExpand', () => {
    const onNodeCollapse = sinon.spy();
    const onNodeExpand = sinon.spy();

    const wrapper = mount(<Tree {...treeProps} onNodeCollapse={onNodeCollapse} onNodeExpand={onNodeExpand} />);
    wrapper
        .find('.VTTree__NodeExpander')
        .at(0)
        .simulate('click');
    expect(onNodeCollapse).toHaveProperty('callCount', 1);

    wrapper.setProps({ isNodeExpandedSelector: () => false });

    wrapper
        .find('.VTTree__NodeExpander')
        .at(0)
        .simulate('click');
    expect(onNodeExpand).toHaveProperty('callCount', 1);
});
