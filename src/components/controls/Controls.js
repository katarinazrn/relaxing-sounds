import { useEffect, useState } from 'react';
import classes from './Controls.module.css';

function Controls({ changeVolume, resume, pause, openFullscreen, closeFullscreen, optionsVisible }) {

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(30);
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        document.addEventListener('fullscreenchange', (event) => {
            if (document.fullscreenElement) {
                setFullscreen(true);
            } else {
                setFullscreen(false);
            }
        });
    }, [])

    useEffect(() => {
        changeVolume(volume);
    }, [volume]);

    function togglePlay() {
        setPlaying(prev => {
            let newState = !prev;
            if (newState) {
                resume();
            }
            else {
                pause();
            }
            return newState;
        });

    }

    function handleVolumeChange(e) {
        let value = e.target.value;
        setVolume(value);
    }

    function toggleVolume() {
        setVolume(prev => {
            if (prev == 0) return 30;
            else return 0;
        })
    }

    function toggleFullscreen() {
        if (fullscreen) closeFullscreen();
        else openFullscreen();
    }

    return (
        <div className={`${classes.controls} ${optionsVisible ? classes.visible : classes.hidden}`}>
            <button onClick={togglePlay} className={`${classes.button} material-icons`}>
                {!playing && 'play_arrow'}
                {playing && 'pause'}
            </button>
            <div className={`${classes.volume}`}>
                <button onClick={toggleVolume} className={`${classes.button} material-icons`}>
                    {volume > 0 && 'volume_up'}
                    {volume == 0 && 'volume_off'}
                </button>
                <input value={volume} onChange={handleVolumeChange} className={classes.range} type='range' />
            </div>
            <button onClick={toggleFullscreen} className={`${classes.button} material-icons`}>
                {!fullscreen && 'fullscreen'}
                {fullscreen && 'close_fullscreen'}
            </button>
        </div>
    )
}

export default Controls;