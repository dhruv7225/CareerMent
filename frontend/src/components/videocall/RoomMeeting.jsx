import {  useParams } from "react-router-dom"
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useQuery } from "@tanstack/react-query";
import FeedbackForm from "./FeedBackForm";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
const RoomMeeting = () => {

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    
    const {roomId} = useParams()
    const [meetingEnded, setMeetingEnded] = useState(false);

    // const navigate = useNavigate();
    const myMeeting = async (element) => {

        const appID = 820545604;
        const serverSecret = "212159a5052fe2384788981027a74ebe";


        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(), authUser.username );

        const zc = ZegoUIKitPrebuilt.create(kitToken);

        zc.joinRoom({
            container: element,
            sharedLinks: [{
                name: 'Copy Link',
                url: `http://localhost:5173/room/${roomId}`,
            }],
            maxParticipants: 2,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            onLeaveRoom: () => {
                
                    setMeetingEnded(true);
                
              },
            showScreenSharingButton: true,
        })
    };

    return (
   
<div>
      {!meetingEnded ? (
        <div
          ref={myMeeting}
          style={{ width: '100%', height: '100vh' }}
        ></div>
      ) : (
        <FeedbackForm />
      )}
    </div>
  )
}

export default RoomMeeting