import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from './categories.js';
import CategoriesList from './components/categories/CategoriesList';
import Controls from './components/controls/Controls';
import Video from './components/video/Video';
import './App.css';

function App() {

  const [categories, setCategories] = useState(CATEGORIES);
  const [current, setCurrent] = useState(CATEGORIES[0]);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [optionsVisible, setOptionsVisible] = useState(true);
  const [time, setTime] = useState(false);

  const allRef = useRef();

  function pause() {
    setPlaying(false);
  }

  function resume() {
    setPlaying(true);
  }

  function changeVolume(newVolume) {
    setVolume(newVolume);
  }

  function changeCurrent(newCurrent) {
    setCurrent(newCurrent);
  }

  function showOptions() {
    if (!optionsVisible) setOptionsVisible(true);
  }

  function hideOptions() {
    if (optionsVisible) setOptionsVisible(false);
  }

  function openFullscreen() {

    if (allRef.current.requestFullscreen) {
      allRef.current.requestFullscreen();
    }
    else if (allRef.current.webkitRequestFullscreen) {
      allRef.current.webkitRequestFullscreen();
    }
    else if (allRef.current.msRequestFullscreen) {
      allRef.current.msRequestFullscreen();
    }
  }

  function closeFullscreen() {

    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }


  function handleMousemove() {
    setTime(p => !p);
    showOptions()
  }

  useEffect(() => {

    const timeoutID = window.setTimeout(() => {
      hideOptions();
      clearTimeout(timeoutID)
    }, 6000);

    return () => window.clearTimeout(timeoutID);
  }, [time]);


  return (
    <div
      ref={allRef}
      onMouseMove={handleMousemove}
      onMouseLeave={hideOptions}
      className={optionsVisible ? 'cursorVisible ' : 'cursorHidden'}>
      <CategoriesList
        optionsVisible={optionsVisible}
        changeCurrent={changeCurrent}
        current={current}
        categories={categories} />
      <Video
        optionsVisible={optionsVisible}
        showOptions={showOptions}
        hideOptions={hideOptions}
        playing={playing}
        volume={volume}
        category={current} />
      <Controls
        closeFullscreen={closeFullscreen}
        openFullscreen={openFullscreen}
        optionsVisible={optionsVisible}
        pause={pause}
        resume={resume}
        changeVolume={changeVolume} />
    </div>
  );
}

export default App;
