// JavaScript Document<script>
function yScrollHandler (){
	var win = document.getElementsById("peekaboo");
	if((window.pageYOffset + window.innerHeight) >= document.body.offsetHeight){
		win.style.webkitTransition = "right 0.7s ease-in-out 2s";
		win.style.transition= "0px";
	} 
	else{
		win.style.webkitTransition = "right 0.7s ease-in-out 0s";
		win.style.right="-452px";
	}
}
window.onscroll= yScrollHandler;