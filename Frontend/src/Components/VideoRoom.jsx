import AgoraRTC from 'agora-rtc-sdk-ng';
import { useEffect, useState } from 'react';
import { VideoPlayer } from './VideoPlayer';

const App_id = '573cc64af431484d960a26cb442da042';
const token = '007eJxTYDCfJ/Fz7Wd9hjvPZxw+bf9jB+s19+1c+uftnj5eWWch/meiAoOpuXFysplJYpqJsaGJhUmKpZlBopFZcpKJiVFKooGJkalRVWpDICODuE4fEyMDBIL4LAxF+YmJDAwArOkfdA==/007eJxTYDCfJ/Fz7Wd9hjvPZxw+bf9jB+s19+1c+uftnj5eWWch/meiAoOpuXFysplJYpqJsaGJhUmKpZlBopFZcpKJiVFKooGJkalRVWpDICODuE4fEyMDBIL4LAxF+YmJDAwArOkfdA==/EICo=';
const channel = 'roaa';

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});

function VideoRoom() {
    const [UsersIcon, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);

    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
            setUsers((previousUsers) => [...previousUsers, user]);
        }
        if (mediaType === 'audio') {
            user.audioTrack.play();
        }
    };

    const handleUserLeft = (user) => {
        setUsers((previousUsers) =>
            previousUsers.filter((u) => u.uid !== user.uid)
        );
    };

    useEffect(() => {
        let tracks;

        client.on('user-published', handleUserJoined);
        client.on('user-left', handleUserLeft);

        client
            .join(App_id, channel, token, null)
            .then((uid) => Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]))
            .then(([createdTracks, uid]) => {
                tracks = createdTracks;
                const [audioTrack, videoTrack] = createdTracks;
                setLocalTracks(createdTracks);
                setUsers((previousUsers) => [
                    ...previousUsers,
                    {
                        uid,
                        audioTrack,
                        videoTrack,
                    },
                ]);
                client.publish(createdTracks);
            });

        return () => {
            if (tracks) {
                for (let localTrack of tracks) {
                    localTrack.stop();
                    localTrack.close();
                }
            }
            client.off('user-published', handleUserJoined);
            client.off('user-left', handleUserLeft);
            client.unpublish(tracks).then(() => client.leave());
        };
    }, []);

    return (
        <div className='flex justify-center'>
            VideoRoom
            {UsersIcon.map((user) => (
                <div className='grid' key={user.uid}>
                    <VideoPlayer user={user} />
                </div>
            ))}
        </div>
    );
}

export default VideoRoom;
