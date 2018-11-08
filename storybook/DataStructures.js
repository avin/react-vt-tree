import React from 'react';
import TreeWithFlatData from './TreeWithFlatData';
import TreeWithStructuredData from './TreeWithStructuredData';
import ImmutableJsData from './ImmutableJsData';

export class DataStructures extends React.Component {
    render() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div className="column-container">
                        <h2>Flat data structure</h2>
                        <TreeWithFlatData />
                    </div>
                    <div className="column-container">
                        <h2>Nested data structure</h2>
                        <TreeWithStructuredData />
                    </div>
                    <div className="column-container">
                        <h2>Using Immutable.js</h2>
                        <ImmutableJsData />
                    </div>
                </div>
            </div>
        );
    }
}
