import { configure } from '@storybook/react';
import '../src/style.css';
import '../storybook/style.css';

function loadStories() {
    require('../storybook');
}

configure(loadStories, module);
