import React from 'react';
import $ from 'jquery';

import './AnnotationList.scss';

class AnnotationList extends React.Component {
    componentDidMount() {
        $(".annotation-inner").resizable({
            handles: "e, w",
            containment: $(".annotations-list"),
            minHeight: 30
        });
        $(".annotation-inner").draggable({
            axis: "x",
            containment: $(".annotations-list")
        });
    }
    componentDidUpdate() {
        $(".annotation-inner").resizable({
            handles: "e, w",
            containment: $(".annotations-list"),
            minHeight: 28
        });
        $(".annotation-inner").draggable({
            axis: "x",
            containment: $(".annotations-list")
        });
    }
    render() {
        return (
            <div className="annotations-list">
                {this.props.annotations.map((annotation, i) => {
                    return (
                        <div key={i} className="annotation-outer">
                            {/* <textarea className="annotation-inner" defaultValue={annotation.text} onChange={(e)=>this.props.handleChange()}></textarea> */}
                            <div className="annotation-inner">
                                <textarea data-id={i} value={annotation.text} onChange={(e)=>this.props.handleChange(e)}></textarea>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default AnnotationList;
