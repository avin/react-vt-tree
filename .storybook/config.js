import { configure } from '@storybook/react';
import '../src/style.css';
import '../storybook/style.scss';

function loadStories() {
    require('../storybook');
}

configure(loadStories, module);
