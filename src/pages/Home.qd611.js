const images = [
    "wix:image://v1/e8d110_79d9a57142834045a90b77bcee72ea31~mv2.png",
    "wix:image://v1/e8d110_38426fbb89f1491d91fdc8b4bef9b35e~mv2.png",
    "wix:image://v1/e8d110_4077d6f1038d4279a1d0c813296057fa~mv2.png",
    "wix:image://v1/e8d110_0e7c7218acea46dcbcfa446e3472549e~mv2.png"
];

// Initial index
let currentIndex = 0;

// Slideshow interval (in milliseconds)
const intervalTime = 3000; // 3 seconds per slide

// Function to display the current image
function showImage(index) {
    console.log("Showing image at index:", index, "URL:", images[index]);
    $w("#imageX").src = images[index]; // Make sure imgX10 is an image element
}

// Auto-slide functionality
function startSlideshow() {
    console.log("Starting slideshow...");
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        console.log("Current index updated to:", currentIndex);
        showImage(currentIndex);
    }, intervalTime);
}

// Initialize the slideshow when the page is ready
$w.onReady(function () {
    
    var el = $w("#text11"); // Replace "myParagraph" with your actual paragraph ID
var str = el.text.split(""); // Get the text content of the paragraph and split it into an array

(function animate() {
  str.length > 0 ? el.text += str.shift() : clearTimeout(running);
  var running = setTimeout(animate, 100);
})();
});

