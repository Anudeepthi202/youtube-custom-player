document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video-player"); // ✅ Match HTML ID

    if (!video) {
        console.error("Video element not found! Check the HTML id.");
        return;
    }

    let tapCount = 0;
    let tapTimeout;
    const screenWidth = window.innerWidth;

    function handleTap(event) {
        event.preventDefault();
        tapCount++;

        clearTimeout(tapTimeout);
        tapTimeout = setTimeout(() => {
            const touchX = event.clientX || (event.touches ? event.touches[0].clientX : 0);

            if (tapCount === 1) {
                // ✅ Single Tap → Pause/Play
                video.paused ? video.play() : video.pause();
            } 
            else if (tapCount === 2) {
                // ✅ Double Tap → Forward or Rewind
                if (touchX < screenWidth / 2) {
                    video.currentTime = Math.max(0, video.currentTime - 10);
                    console.log("⏪ Rewinding 10s");
                } else {
                    video.currentTime = Math.min(video.duration, video.currentTime + 10);
                    console.log("⏩ Forwarding 10s");
                }
            } 
            else if (tapCount === 3) {
                // ✅ Triple Tap → Next video, Comments, or Close site
                if (touchX < screenWidth / 3) {
                    console.log("💬 Showing comment section...");
                    alert("Showing Comments");
                } 
                else if (touchX > (2 * screenWidth) / 3) {
                    console.log("❌ Closing website...");
                    alert("Closing Website"); 
                    window.location.href = "about:blank"; // Alternative to `window.close()`
                } 
                else {
                    console.log("⏭ Moving to next video...");
                    alert("Next Video"); 
                    video.src = "videos/next-video.mp4"; // Replace with actual next video
                    video.play();
                }
            }

            tapCount = 0; // Reset tap count after execution
        }, 250); // Tap timeout for detection
    }

    video.addEventListener("click", handleTap);
    video.addEventListener("touchend", handleTap);
});
