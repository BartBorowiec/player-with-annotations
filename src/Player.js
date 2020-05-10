import React from 'react';
import $ from 'jquery';

import './Player.scss';

class Player extends React.Component {
    componentDidMount() {
        $(".player-wrapper").droppable({
            drop: (event, ui) => {
                this.addNewAnnotation({
                    top: event.offsetY,
                    left: event.offsetX
                })
            },
            accept: $(".annotation-tile")
        });
        $("video").on("loadedmetadata", (e) => {
            this.props.saveDuration(e.target.duration);
        })
        $("video").on("timeupdate",(e) => {
            $(".annotation").each((id, element) => {
                const arrayElement = this.props.annotations[id];
                if (e.target.currentTime >= arrayElement.start 
                    && e.target.currentTime <= arrayElement.start + arrayElement.duration) {
                    $(element).removeClass("hidden");
                } else {
                    $(element).addClass("hidden");
                }
            });
        });
        $(".annotation").draggable({
            containment: $(".player-wrapper")
        });
        $(".annotation").resizable({
            containment: $(".player-wrapper")
        });
    }
    componentDidUpdate() {
        $(".annotation").draggable({
            containment: $(".player-wrapper")
        });
        $(".annotation").resizable({
            containment: $(".player-wrapper")
        });
    }

    addNewAnnotation(position) {
        const {top, left} = position;
        const annotation = {
            top: top,
            left: left,
            text: "Enter text...",
            start: 0,
            duration: $("video")[0].duration
        }
        this.props.addNewAnnotation(annotation);
    }

    render() {
        return (
            <div className="player-wrapper">
                <video controls autoPlay loop muted
                        src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
                        width="500px">        
                </video>
                {this.props.annotations.map((annotation, i)=> {
                    return <div key={i} className="annotation hidden" style={{
                            top: annotation.top || 0,
                            left: annotation.left || 0
                        }}>
                            <textarea data-id={i} onChange={(e)=>this.props.handleChange(e)} value={annotation.text}></textarea>
                        </div>;
                })}
            </div>
        )
    }
}

export default Player;
