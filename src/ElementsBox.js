import React from 'react';
import * as $ from 'jquery';

import './ElementsBox.scss';

class ElementsBox extends React.Component {
    componentDidMount() {
        $(".annotation-tile").draggable({
            helper: "clone"
        });
    }
    render() {
        return (
            <div className="elements-box">
                <div className="annotation-tile">
                    Add annotation
                </div>
            </div>
        )
    }
}

export default ElementsBox;
