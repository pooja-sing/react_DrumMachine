// src/DrumMachine.js
import React, { useState } from 'react';
import './DrumMachine.css';

const sounds = [
  {
    key: 'Q',
    name: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    key: 'W',
    name: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    key: 'E',
    name: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    key: 'A',
    name: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    key: 'S',
    name: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    key: 'D',
    name: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    key: 'Z',
    name: 'Kick-n-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    key: 'X',
    name: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    key: 'C',
    name: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const DrumMachine = () => {
  const [display, setDisplay] = useState('');
  const [volume, setVolume] = useState(0.5);

  const playSound = (key, name) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    setDisplay(name);
  };

  const handleKeyPress = (event) => {
    const sound = sounds.find(s => s.key === event.key.toUpperCase());
    if (sound) {
      playSound(sound.key, sound.name);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="pad-bank">
        {sounds.map((sound) => (
          <div
            key={sound.key}
            className="drum-pad"
            id={sound.name}
            onClick={() => playSound(sound.key, sound.name)}
          >
            {sound.key}
            <audio className="clip" id={sound.key} src={sound.url}></audio>
          </div>
        ))}
      </div>
      <div className="volume-slider">
      <label htmlFor="volume">Volume: </label>
      <input
        id="volume"
        type="range"
        step="0.01"
        min="0"
        max="1"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
    </div>
    </div>
  );
};

export default DrumMachine;
