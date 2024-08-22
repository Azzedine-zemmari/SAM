document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('myVideo');
    const playBtn = document.querySelector('.play-btn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    // Toggle play/pause
    playBtn.addEventListener('change', function () {
        if (playBtn.checked) {
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    // Ensure pause icon is hidden initially
    pauseIcon.style.display = 'none';
});