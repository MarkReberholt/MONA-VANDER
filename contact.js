// JavaScript Document<script>
function yScrollHandler (){
	var win = document.getElementsByClassName("peekaboo");
	if((window.pageYOffset + window.innerHeight) >= document.body.offsetHeight){
		win.style.transition = "right 0.7s ease-in-out 0s";
		win.style.transition= "0px";
	} 
	else{
		win.style.transition = "right 0.7s ease-in-out 0s";
		win.style.right="-452px";
	}
}
window.onscroll= yScrollHandler;