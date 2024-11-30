export function setupMusic() {
    const musicBtn = document.getElementById('playMusic');
    let audioContext;
    let isPlaying = false;
    let interval;

    const notes = [
        { frequency: 392, duration: 300 }, // G4
        { frequency: 392, duration: 300 }, // G4
        { frequency: 440, duration: 300 }, // A4
        { frequency: 392, duration: 300 }, // G4
        { frequency: 523, duration: 300 }, // C5
        { frequency: 494, duration: 500 }, // B4
    ];

    function playNote(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }

    function playMelody() {
        let noteIndex = 0;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        interval = setInterval(() => {
            if (noteIndex >= notes.length) {
                noteIndex = 0;
            }
            playNote(notes[noteIndex].frequency, notes[noteIndex].duration);
            noteIndex++;
        }, 500);
    }

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            clearInterval(interval);
            if (audioContext) {
                audioContext.close();
            }
            musicBtn.textContent = '🎵 Play Music';
        } else {
            playMelody();
            musicBtn.textContent = '🎵 Pause Music';
        }
        isPlaying = !isPlaying;
    });
}