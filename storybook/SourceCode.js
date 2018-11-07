import React from 'react';

export default class SourceCode extends React.Component {
    render() {
        return (
            <div className="sourceCode">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://github.com/avin/react-vt-tree/blob/master/storybook/${this.props.children}`}
                >
                    View source code
                </a>
            </div>
        );
    }
}
