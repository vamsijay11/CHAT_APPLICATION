import {useState} from 'react';
import Chat from './Chat.js';
import './App.css';
import io from "socket.io-client";

const socket=io.connect("http://localhost:5000/");

function App() {

  const [username,setUsername] =useState("");
  const [room,setRoom] = useState("");
  const [showChat , setShowChat] = useState(false);

  const joinRoom = () =>{


    if(username!=="" && room!=="")
    {
      socket.emit("Join_room",room);
      setShowChat(true);
    }

  }
  return (
    <div className="App">
      {!showChat?(
      <div className='joinChatContainer'>
      <h1>Join A Chat</h1>
      <input type="text" placeholder = "NAME" onChange = {(Event) =>{setUsername(Event.target.value)}}/>
      <input type="text" placeholder = "RoomID" onChange = {(Event) =>{setRoom(Event.target.value)}}/>
      <button onClick={joinRoom}>JOIN A ROOM</button>
      </div>):(
      <Chat socket={socket} username = {username} room={room} ></Chat>
      )}
    
    </div>
  );
}

export default App;
