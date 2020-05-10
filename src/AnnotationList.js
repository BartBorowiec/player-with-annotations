import React from 'react';
import $ from 'jquery';

import './AnnotationList.scss';

class AnnotationList extends React.Component {
    componentDidMount() {
        $(".annotation-inner").resizable({
            handles: "e, w",
            containment: "parent",
            minHeight: 30,
            stop: (event, ui)=>{
                
            } 
        });
        $(".annotation-inner").draggable({
            axis: "x",
            containment: "parent"
        });
    }
    componentDidUpdate() {
        $(".annotation-inner").resizable({
            handles: "e, w",
            containment: "parent",
            stop: (event, ui)=>{
                this.props.updateAnnotationDuration(event, ui)
            } 
        });
        $(".annotation-inner").draggable({
            axis: "x",
            containment: "parent",
            stop: (event, ui)=>{
                this.props.updateAnnotationDuration(event, ui)
            } 
        });
    }
    render() {
        return (
            <div className="annotations-list">
                {this.props.annotations.map((annotation, i) => {
                    return (
                        <div key={i} className="annotation-outer">
                            <div data-id={i} className="annotation-inner">
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
