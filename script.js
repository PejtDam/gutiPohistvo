const screenHeight = window.innerHeight;
const aboutLink = document.getElementById('about');
let aboutIsShown = false;

var loader = document.getElementById("preloader")

const loaded = false;

window.addEventListener("load", function(){
  loader.style.display = "none";
  document.getElementById("top").style.display = "block";
})

function About(x1, x2, barva1, barva2) {
  document.getElementById('navbarPlusAbout').animate([
      {
        transform: `translate3d(${x1}vw, 0, 0)`,
        backgroundColor: `rgba(13, 13, 13, ${barva1})`
      },
      {
        transform: `translate3d(${x2}vw, 0, 0)`,
        backgroundColor: `rgba(13, 13, 13, ${barva2})`
      }  
    ], {
      duration: 500,
      fill: 'forwards'
    })
  
}


// Optimize show/hide of the "About" section
function hideAbout() {
  if (aboutIsShown) {
    About(0, 90, 1, 0.8);
  }
  aboutIsShown = false;
}

function showAbout() {
  About(90, 0, 0.8, 1);
  aboutIsShown = true;
}

function toggleAbout() {
  aboutIsShown ? hideAbout() : showAbout();
}

let isScrolling = false;

function onScroll() {
  const scrolled = window.scrollY;
  const procent = (scrolled / screenHeight) * 100;

  // Apply CSS transforms for parallax scrolling effect
  document.getElementById("top").animate([{transform: `translate3d(0, -${procent / 9}%, 0)`}], {duration: 100, fill: "forwards"});
  document.getElementById("2del").animate([{transform: `translate3d(0, -${procent / 8}%, 0)`}], {duration: 100, fill: "forwards"});

  // Apply smooth transforms for images
  for (let i = 1; i <= 4; i++) {
    const direction = (i === 2 || i === 4) ? -1 : 1;
    document.getElementById(`sliki${i}`).animate([{transform: `translate3d(${(procent / 4) * direction}%, 0, 0)`}], {duration: 100, fill: "forwards"})
  }

  // Animate image object positions smoothly
  for (let i = 0; i <= 3; i++) {
    if (procent > i * 50) {
      const driftProcent = (procent / 4 - i * 50) / 1.5;
      for (let j = 0; j <= 2; j++) {
        document.getElementsByClassName(`images${i + 1}`)[j].animate({objectPosition: `${driftProcent}% center`}, {duration: 200, fill: 'forwards'});    
      }
    }
  }
}

// Add scroll listener if the screen width is small
if (window.innerWidth <= 600) {
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(onScroll);
  });
}
