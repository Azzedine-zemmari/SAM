var cursor = document.querySelector(".cursor"),
    section = document.querySelector("section"), // Target the first section
    mouseX = 0,
    mouseY = 0;

window.addEventListener("mousemove", function(e) {
    // Check if the mouse is within the first section
    var rect = section.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
        
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Show and move the cursor to follow the mouse
        gsap.to(cursor, {
            x: mouseX - cursor.offsetWidth / 2, // Center the cursor on the mouse
            y: mouseY - cursor.offsetHeight / 2,
            scale: 1.5, // Circle grows larger when moving
            duration: 0.2,
            ease: "power2.out",
            autoAlpha: 1 // Make the cursor visible
        });

        // After movement stops, shrink back to original size
        clearTimeout(cursor.timeout); // Clear any existing timeout
        cursor.timeout = setTimeout(function() {
            gsap.to(cursor, {
                scale: 0.5, // Shrink back to original size
                duration: 0.5,
                ease: "power2.out"
            });
        }, 100); // Wait 100ms before shrinking
    } else {
        // Hide the cursor if outside the first section
        gsap.to(cursor, {
            autoAlpha: 0,
            duration: 0.2
        });
    }
});
