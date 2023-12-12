import { useState,useRef,useEffect } from "react";
export const VideoPlayer=({user})=>{
    const ref= useRef();
    useEffect(()=>{
        user.videoTrack.play(ref.current);
    },[]);
    return(
        <div>
            Uid:{user.uid}
            <div ref={ref} className="  w-80  h-80">

            </div>
        </div>


    )
}