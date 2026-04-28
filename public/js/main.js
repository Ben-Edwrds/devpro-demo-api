// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 50;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

// Navbar shrink effect on scroll
window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.padding = "10px 50px";
        header.style.background = "rgba(11, 15, 25, 0.95)";
    } else {
        header.style.padding = "20px 50px";
        header.style.background = "rgba(11, 15, 25, 0.8)";
    }
});
