
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var text = document.getElementsByClassName("text");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
}
for (i = 0; i < text.length; i++) {
  text[i].style.display = "none";
}

  slides[slideIndex-1].style.display = "block";
  text[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}



var bg = new Image();
bg.src = "img/konfetti.png";
function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var cW = ctx.canvas.width, cH = ctx.canvas.height;
	
    function Background(){
        this.x = 0, this.y = 0, this.w = bg.width, this.h = bg.height;
        this.render = function(){
            ctx.drawImage(bg, this.x--, 0);
            if(this.x <= -499){
                this.x = 0;
            }
        }
    }
    var background = new Background();
	
    function animate(){
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        // Start drawing here
        background.render();
        ctx.fillStyle = "orange";
        ctx.fillRect(100,100,50,50);
        // End drawing here
        ctx.restore();
    }
    var animateInterval = setInterval(animate, 30);
}
window.addEventListener('load', function(event) {
    initCanvas();
});