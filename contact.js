// JavaScript Document<script>
console.log("mark");
function yScrollHandler(){
    var win = document.getElementById("peekaboo");
    if((window.pageYOffset + window.innerHeight) >= document.body.offsetHeight){
	//win.style.webkitTransition = "right 0.7s ease-in-out 0s";
	win.style.transition = "right 0.7s ease-in-out 0s";
	win.style.right = "0px";
    } else {
	win.style.transition = "right 0.7s ease-in-out 0s";
	win.style.right = "-452px";
    }
}
window.onscroll = yScrollHandler;
