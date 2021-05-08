import React, { useEffect, useRef, useState } from 'react';
import useDoubleClick from 'use-double-click';

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const [isClicked, setClicked] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isClicked) {
            interval = setInterval(() => {
                setSeconds(sec => sec + 1);
            }, 1000);
        } else if (!isClicked && seconds !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
        
      }, [isClicked, seconds]);


    const Stopwatch = () => {
        var sec, min, hour;

        if(seconds < 10){
            sec = `0${seconds}`;
        } else {
            sec = `${seconds}`;
        }

        if (seconds === 60){
            setMinutes(minutes + 1);
            setSeconds(0);
        }

        if (minutes === 60){
            setHours(hours + 1);
            setMinutes(0);
        }

        if (minutes < 10){
            min = `0${minutes}`;
        } else {
            min = `${minutes}`
        }

        if (hours < 10) {
            hour = `0${hours}`;
        } else {
            hour = `${hours}`
        }

        return `${hour} : ${min} : ${sec}`;
    }

    const resetTimer = () => {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        console.log("Stopwatch reseted")
    }

    const stopTimer = () => {
        setClicked(false);
        console.log("Stopwatch paused")
    }

    const WaitBtn = () => {
        const btnRef = useRef();

        useDoubleClick({
            onDoubleClick: () => {
                console.log("double clicked");
                stopTimer()
            },
            ref: btnRef,
            latency: 300
        });

        return <button ref={btnRef}>WAIT</button>
    }

    return (
        <div className="stopwatch">
            {isClicked ? Stopwatch() : `${hours < 10 ? `0${hours}` : `${hours}`} : ${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`}
            <br />
            {isClicked ? (
                <div className='div-btn'>
                    <button
                        onClick={resetTimer}
                    >
                        RESET
                    </button>
                    <button
                        onClick={stopTimer}
                    >
                        STOP
                    </button>
                    <WaitBtn />
                </div>
            ) : (
                <button
                    onClick={() => setClicked(true)}    
                >
                    {seconds === 0 ? 'START' : 'RESUME'}
                </button>
            )}
        </div>
    )
}
