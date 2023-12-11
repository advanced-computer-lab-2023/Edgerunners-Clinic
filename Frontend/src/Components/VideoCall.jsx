import { useState } from "react";
import VideoRoom from "./VideoRoom";
function VideoCall(){
    const [joined,setJoined] = useState(false);
    return(

        <div>
            <h1>Video Call</h1>
            {!joined && <button onClick={()=>setJoined(true)}>joinRoom</button>}
            {joined&&<VideoRoom/>}
        </div>
    )
}
export default VideoCall;