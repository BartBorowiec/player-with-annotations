import React from 'react';
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
      annotations: [{text:"Hello", top: 10, left: 10},{text:"world", top: 10, left: 100},{text:"!!!", top: 10, left: 200}]
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
    this.setState({
      duration: duration
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
        <AnnotationList handleChange={(e)=>this.handleChange(e)} annotations={this.state.annotations}></AnnotationList>
      </div>
    );
  }
}

export default App;
