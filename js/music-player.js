document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    // Check for saved user preference, if any
    const musicPref = localStorage.getItem('musicPref');
    if (musicPref === 'on') {
        bgMusic.play();
        isPlaying = true;
        updateButtonText();
    }
    
    // Toggle music playback
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            localStorage.setItem('musicPref', 'off');
        } else {
            bgMusic.play();
            localStorage.setItem('musicPref', 'on');
        }
        isPlaying = !isPlaying;
        updateButtonText();
    });
    
    function updateButtonText() {
        const icon = musicToggle.querySelector('i');
        const text = musicToggle.querySelector('span');
        
        if (isPlaying) {
            icon.className = 'fas fa-pause';
            text.textContent = 'Pause Music';
        } else {
            icon.className = 'fas fa-music';
            text.textContent = 'Play Music';
        }
    }
    
    // Ensure music starts only after user interaction (autoplay policy)
    document.body.addEventListener('click', function initMusic() {
        if (!isPlaying && localStorage.getItem('musicPref') === 'on') {
            bgMusic.play();
            isPlaying = true;
            updateButtonText();
        }
        document.body.removeEventListener('click', initMusic);
    });
});