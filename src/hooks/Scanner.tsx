import React from "react";

export function useScanner() {

    const [data, setData] = React.useState('')
    const [scanned, setScanned] = React.useState('');
    const [paused, setPaused] = React.useState(false);
    const scannedRef = React.useRef(scanned);
    const pausedRef = React.useRef(paused);

    React.useEffect(() => {
        scannedRef.current = scanned;
    }, [scanned]);

    React.useEffect(() => {
        pausedRef.current = paused;
    }, [paused]);

    React.useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {

            if (e.target instanceof HTMLInputElement || pausedRef.current) return;

            if (e.key === 'Enter') {

                setData(scannedRef.current);
                setScanned('');

            } else {

                if (scanned === '') setData('');
                if (e.key.length === 1) setScanned(`${scannedRef.current}${e.key}`);

            }
        }

        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }

    }, [paused, scanned]);

    function clearData() {
        setData('');
    }

    function pause() {
        setPaused(true);
    }

    function resume() {
        setPaused(false);
    }

    return {
        data,
        clearData,
        pause,
        resume
    }
     
}