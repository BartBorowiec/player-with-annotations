import React from 'react';
import { scaleLinear } from 'd3-scale';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/themes/base/resizable.css';
import 'jquery-ui/themes/base/draggable.css';

import Player from './Player';
import ElementsBox from './ElementsBox';
import AnnotationList from './AnnotationList';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annotations: [],
      scale: null
    };
  }
  handleChange(e) {
    const newArray = [...this.state.annotations];
    newArray[e.target.dataset.id].text = e.target.value;
    this.setState({
      annotations: newArray
    });
  }
  addNewAnnotation(annotation) {
    this.setState({
      annotations: [...this.state.annotations, annotation]
    });
  }
  saveDuration(duration) {
    const scale = scaleLinear().domain([0, duration]);
    this.setState({
      scale: scale
    });
  }
  updateAnnotationDuration(event, ui) {
    const { scale } = this.state;
    scale.range([0, $(event.target.closest(".annotation-outer")).width()])
    const newArray = [...this.state.annotations];
    newArray[event.target.dataset.id].start = scale.invert(ui.position.left);
    newArray[event.target.dataset.id].duration = scale.invert(ui.position.left + ui.helper[0].getBoundingClientRect().width);
    this.setState({
      annotations: newArray
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Player
          saveDuration={(duration)=>this.saveDuration(duration)}
          handleChange={(e)=>this.handleChange(e)}
          addNewAnnotation={(annotation)=>this.addNewAnnotation(annotation)}
          annotations={this.state.annotations}>
        </Player>
        <ElementsBox></ElementsBox>
        <AnnotationList updateAnnotationDuration={(event, ui) => this.updateAnnotationDuration(event, ui)}
          handleChange={(e)=>this.handleChange(e)}
          annotations={this.state.annotations}>
        </AnnotationList>
      </div>
    );
  }
}

export default App;
