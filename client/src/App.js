import './App.css';
import React, { Component } from 'react'
import Excalidraw, {exportToBlob} from "@excalidraw/excalidraw";
import "./styles.css";


class App extends Component{
  constructor(props){
    super(props);
    this.state = {}
    this.getState = this.getState.bind(this);
    this.saveDrawing = this.saveDrawing.bind(this);
  }
  componentDidMount(){
    this.saveDrawing();
  }
  
  saveDrawing(){
    setInterval(async()=>{
      let name = Date.now();
      let blob =  await exportToBlob(this.state);
      const myFile = new File([blob], name, {
        type: blob.type,
      });
      const formData = new FormData();
      formData.append('image',myFile,`${name}.jpeg`);
      await fetch('http://localhost:5000/image',{
        method: 'POST',
        body: formData,
      })
      .catch((error)=>{
        console.log(error);
      })
    },10000)
  }
  
  getState(elements, state) {
      this.setState({elements: elements,state: state})
  }

  render()
  {
    return( 
      <div className="App">
        <div className = "excalidraw-wrapper">
          <Excalidraw onChange={this.getState}/>
        </div>
      </div>
    );
  }
}


export default App;
