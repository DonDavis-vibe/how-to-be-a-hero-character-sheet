let soundEnabled = true;

const AudioController = {
    sounds: {
        hit: new Audio('assets/sound/hit.mp3'),
        hpup: new Audio('assets/sound/hpup.mp3'),
        crit: new Audio('assets/sound/crit.mp3'),
        fail: new Audio('assets/sound/fail.mp3')
    },
    play: function(soundName) {
        if (!soundEnabled) return;
        const snd = this.sounds[soundName];
        if (snd) {
            // Der Lautstärkeregler gilt für alles, was man hört - auch für die
            // eigenen Würfel- und Treffer-Sounds, nicht nur für das SL-Soundboard.
            snd.volume = typeof getPlayerVolume === 'function' ? getPlayerVolume() : 1;
            snd.currentTime = 0;
            snd.play().catch(e => console.log('Audio blocked:', e));
        }
    }
};

function toggleSound() {
    soundEnabled = !soundEnabled;
    appData.soundEnabled = soundEnabled;
    saveData();
    const btn = document.getElementById('toggle-sound-btn');
    if (btn) {
        btn.style.opacity = soundEnabled ? '1' : '0.5';
        btn.innerHTML = soundEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
    }
}
