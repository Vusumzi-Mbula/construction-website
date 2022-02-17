var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

// ============================================================================================
// card logic
// ============================================================================================

const allCards = document.querySelectorAll('.card');

allCards.forEach(card => {
    card.addEventListener('click', slideToggle)
});

function slideToggle(e) {
    e.preventDefault();
    let slideWrapper = this.firstElementChild;

    if (e.target.classList.contains('btn-right') || e.target.classList.contains('fa-long-arrow-alt-right')) {
        slideWrapper.classList.remove('slideLeft');
        slideWrapper.classList.add('slideRight');
    }

    if (e.target.classList.contains('btn-left') || e.target.classList.contains('fa-long-arrow-alt-left')) {
        slideWrapper.classList.remove('slideRight');
        slideWrapper.classList.add('slideLeft');
    }
}

// =============================================================================================
// button 
// =============================================================================================

// var button = document.getElementsByClassName("first-btn")[0];
// button.addEventListener("click", function mybtn() {
//   window.location.href="/about.html";
// })

// ==============================================================================================
// carousel
// ==============================================================================================

let thumbnail = document.getElementsByClassName("thumbnail");
let slider = document.getElementById("slider");
let buttonRight = document.getElementById("slide-right");
let buttonLeft = document.getElementById("slide-left");

buttonLeft.addEventListener("click", () => {
    slider.scrollLeft -= 125;
})

buttonRight.addEventListener("click", () => {
    slider.scrollLeft += 125;
})

const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

//AUTO PLAY THE SLIDER 
function autoPlay() {
    if (slider.scrollLeft > (maxScrollLeft - 1)) {
        slider.scrollLeft -= maxScrollLeft;
    } else {
        slider.scrollLeft += 1;
    }
}
let play = setInterval(autoPlay, 50);

// PAUSE THE SLIDE ON HOVER
for (var i = 0; i < thumbnail.length; i++) {

    thumbnail[i].addEventListener('mouseover', function() {
        clearInterval(play);
    });

    thumbnail[i].addEventListener('mouseout', function() {
        return play = setInterval(autoPlay, 50);
    });
}

// toggle navbar when toggle button is clicked
document.querySelectorAll('.navbar-toggler').addEventListener('click', () => {
    document.querySelectorAll('.navbar-collapse').classList.toggle('.show-navbar');
});

// toggle message box

function Action() {
    var action = document.querySelector(".main");
    action.classList.toggle("checked");
}

function action(visible, hid) {
    document.getElementById("box").style.visibility = "visible"
}

function hide() {
    document.getElementById("box").style.visibility = "hidden"
}