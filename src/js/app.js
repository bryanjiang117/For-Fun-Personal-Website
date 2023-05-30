var root = document.querySelector(":root");
var styles = getComputedStyle(root);
var darkNavy = styles.getPropertyValue("--d-navy");
var aqua = styles.getPropertyValue("--aqua");
var gray = styles.getPropertyValue("--gray");

// remove scrollbar

var page = document.getElementById("page");
page.style.right = page.clientWidth - page.offsetWidth + "px"; //shift page to the right
page.style.width = 2 * page.offsetWidth - page.clientWidth + "px"; //increase page width to accomodate for the shift

// end of remove scrollbar

// animations upon viewing

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      var cover = entry.target.getElementsByClassName("cover");
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        if (cover != undefined && cover.length != 0) {
          cover[0].classList.add("slide-left");
        }
      } else {
        entry.target.classList.remove("show");
        if (entry.target.classList.contains("card-one")) {
          resetCard(entry.target);
        }
        if (cover != undefined && cover.length != 0) {
          cover[0].classList.remove("slide-left");
        }
      }
    });
  },
  {
    threshold: 0.99,
  }
);
const hiddenElements = document.querySelectorAll(
  ".hidden-left, .hidden-left-sm, .hidden-right, .hidden-right-sm, .hidden-top"
);
hiddenElements.forEach((element) => observer.observe(element));

// end of animations upon viewing

// cards

function moveCard() {
  const cards = document.querySelectorAll(".card-one");
  for (let i = 0; i < 3; i++) {
    const classList = cards[i].classList;
    classList.remove("short-delay");
    classList.remove("long-delay");
    classList.add("no-delay");
    if (classList.contains("front-card")) {
      classList.remove("front-card");
      classList.add("back-card");
      classList.remove("show");
      classList.add("hide-card");
    } else if (classList.contains("middle-card")) {
      classList.remove("middle-card");
      classList.add("front-card");
    } else if (classList.contains("back-card")) {
      classList.remove("back-card");
      classList.add("middle-card");
      classList.remove("show");
      classList.add("hide-card");
    }
  }
  setTimeout(spreadCards, 100);
}

function spreadCards() {
  const cards = document.querySelectorAll(".card-one");
  for (let i = 0; i < 3; i++) {
    const classList = cards[i].classList;
    classList.remove("no-delay");
    if (classList.contains("middle-card")) {
      classList.add("short-delay");
      classList.remove("hide-card");
      classList.add("show");
    } else if (classList.contains("back-card")) {
      classList.add("long-delay");
      classList.remove("hide-card");
      classList.add("show");
    }
  }
}

function resetCard(card) {
  classList = card.classList;
  classList.remove("front-card");
  classList.remove("middle-card");
  classList.remove("back-card");
  classList.remove("short-delay");
  classList.remove("long-delay");
  if (classList.contains("card-1")) {
    classList.add("front-card");
  } else if (classList.contains("card-2")) {
    classList.add("middle-card");
  } else if (classList.contains("card-3")) {
    classList.add("back-card");
  }
}

// end of cards

// TFT

var videoplayers = document.querySelectorAll(".videoplayer");
for (let i = 0; i < videoplayers.length; i++) {
  videoplayers[i].onmouseover = function () {
    this.play();
  };
  videoplayers[i].onmouseout = function () {
    this.pause();
  };
}

var cols = document.querySelectorAll(".col");
var timeouts = new Array(3);
for (let i = 0; i < cols.length; i++) {
  const colContent = cols[i].getElementsByClassName("col-content")[0];
  const letter = cols[i].getElementsByClassName("letter")[0];
  cols[i].addEventListener("mouseenter", () => {
    clearTimeout(timeouts[i]);
    letter.classList.add("box-close");
    letter.classList.remove("box-open");
    timeouts[i] = setTimeout(openContent, 500, colContent);
  });
  cols[i].addEventListener("mouseleave", () => {
    clearTimeout(timeouts[i]);
    colContent.classList.remove("box-open");
    colContent.classList.add("box-close");
    timeouts[i] = setTimeout(openLetter, 500, letter);
  });
}

function openContent(colContent) {
  colContent.classList.add("box-open");
  colContent.classList.remove("box-close");
}

function openLetter(letter) {
  letter.classList.remove("box-close");
  letter.classList.add("box-open");
}

// end of TFT
