import { useEffect, useRef, useState } from "react";
import classes from './Video.module.css';

function Video({ category, playing, volume }) {

    const [video, setVideo] = useState(null);
    const [sound, setSound] = useState(null);

    const videoRef = useRef();
    const audioRef = useRef();

    useEffect(() => {
        setVideo(require(`../../../assets/${category.name}/video.mp4`));
        setSound(require(`../../../assets/${category.name}/sound.mp3`));
    }, [category]);

    useEffect(() => {
        if (videoRef.current && audioRef.current) {
            videoRef.current.load();
            audioRef.current.load();
        }
    }, [video, sound])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0;
            if (playing) {
                videoRef.current.play()
                audioRef.current.play()
            } else {
                videoRef.current.pause();
                audioRef.current.pause();
            }
        }
    }, [playing])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);


    if (!video || !sound) return <p>loading...</p>

    return (
        <div className={classes.container} >
            <video autoPlay={playing} loop ref={videoRef} className={classes.video}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <audio autoPlay={playing} loop ref={audioRef} className={classes.audio}>
                <source src={sound} type="audio/mp3" />
                Your browser does not support the audio tag.
            </audio>
        </div>
    )
}

export default Video;