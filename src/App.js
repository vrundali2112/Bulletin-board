import React,{useState,useEffect} from "react";
import "./App.css";
import Draggable from "react-draggable";
import {v4 as uuidv4} from "uuid";

var randomColor = require("randomcolor");

// item - value of input field ,initialize empty string
// items - this is an array that contains all the notes generated saved to localStorage.Initialize empty array if localStorage has no Saved items.



function App() {
  //Initialize states
  const [item,setItem] = useState(" ");                                                    
  const [items,setItems] = useState(JSON.parse(localStorage.getItem("items")) || []
  );      
  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if(code === 13){
      newItem();
    }
   
  }

  const newItem = () => {
    if(item.trim !== "") {
       //if input is not blank, create a new item object
       const newItem = {
         id:uuidv4(),
         item : item,
         color : randomColor({luminosity:"light",}),
         defaultPos : {x:100,y:0},
       };
       setItems((items)=>[...items,newItem]);
       setItem("");
    }else{
      alert("Enter a item");
      setItem("");
    }
  }
  useEffect(() => {
    localStorage.setItem("items",JSON.stringify(items));
  }, [items]);

  
  const updatePos = (data,index) => {
    let newArr = [...items];
    newArr[index].defaultPos = {x:data.x, y:data.y};
    setItems(newArr);
  };
  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <div id="new-item">
        <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter your thought..."
        onKeyPress={(e) => keyPress(e)}
        />
        <button onClick = {newItem}>Enter</button>
      </div>   
      {items.map((item,index) => {
      return(
        <Draggable
        key={item.id}
        defaultPosition = {item.defaultPos}
        onStop = {(e,data)=>{
          updatePos(data,index);
        }}
        >
        <div style = {{backgroundColor:item.color}} className="box">
        {`${item.item}`}
        <button id ="delete" onClick={(e)=> deleteNote(item.id)}>X
        </button>
        </div>
        </Draggable>
      );
    })}
    </div>
  );
}

export default App;
