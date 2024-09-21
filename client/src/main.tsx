import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import "./index.css";

import { UserProvider } from "./context/user.context.tsx";


const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <UserProvider>
    <AgoraRTCProvider client={client}>

          <App />
    </AgoraRTCProvider>

   </UserProvider>
         
        
  </React.StrictMode>
);



