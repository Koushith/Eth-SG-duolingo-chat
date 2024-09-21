import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AgoraUIKit from 'agora-react-uikit';
import { ArrowLeft, Video, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ChatScreen = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [videoCall, setVideoCall] = useState(false);
    const [remoteUser, setRemoteUser] = useState(false);
    const [localVideoReady, setLocalVideoReady] = useState(false);

    const rtcProps = {
        appId: 'a5c8633aad4346b3972d3dafe5dc289c',
        channel: `chat_${userId}`,
        // token: null, // Use null for testing, replace with your token in production
    };

    const callbacks = {
        EndCall: () => {
            setVideoCall(false);
            setRemoteUser(false);
            setLocalVideoReady(false);
        },
        UserJoined: () => setRemoteUser(true),
        UserLeft: () => setRemoteUser(false),
        LocalVideoStateChanged: (state) => {
            if (state === 2) { // 2 means the local video is playing
                setLocalVideoReady(true);
            }
        },
    };

    return (
        <div className="flex flex-col h-[90vh]">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/chat-list')}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${userId}`} />
                        <AvatarFallback>{userId?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{userId}</span>
                </div>
                <div className="flex" style={{ visibility: 'hidden' }}>
                    <Button variant="ghost" size="icon" onClick={() => setVideoCall(true)}>
                        <Video className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Phone className="h-6 w-6" />
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow relative">
                {videoCall ? (
                    <div className="flex flex-col h-full relative">
                        <AgoraUIKit
                            rtcProps={rtcProps}
                            callbacks={callbacks}
                            styleProps={{
                                UIKitContainer: { 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%', // Added to ensure full width
                                },
                                gridVideoContainer: { 
                                    display: 'flex', 
                                    flexDirection: 'column', // stack sender and receiver
                                    justifyContent: 'space-between',
                                    width: '100%', 
                                    height: '100%',
                                    backgroundColor: '#000',
                                    position: 'relative',
                                },
                                localVideo: {
                                    width: '100%',
                                    height: '45%', // Adjust size if needed
                                    backgroundColor: '#000',
                                    borderBottom: '2px solid #fff',
                                    objectFit: 'cover', // Added to ensure video fills the container
                                },
                                remoteVideo: {
                                    width: '100%',
                                    height: '45%', // Adjust size if needed
                                    backgroundColor: '#000',
                                    objectFit: 'cover', // Added to ensure video fills the container
                                },
                                localControls: {
                                    backgroundColor: 'rgba(0, 100, 0, 0.5)', // Green tint for local controls
                                },
                                remoteControls: {
                                    backgroundColor: 'rgba(0, 0, 100, 0.5)', // Blue tint for remote controls
                                },
                            }}
                        />
                        {!remoteUser && localVideoReady && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                                Waiting for the other person to join...
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-xl mb-4">Video call with {userId}</p>
                        <Button onClick={() => setVideoCall(true)}>Start Video Call</Button>
                    </div>
                )}
            </main>
        </div>
    );
};