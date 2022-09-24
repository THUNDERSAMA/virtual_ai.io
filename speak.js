//speak js start
const startBtn = document.getElementById("btn");
//startBtn.innerHTML = "Start listening";
const result = document.createElement("div");
const processing = document.createElement("p");

//document.body.append(startBtn);
document.body.append(result);
document.body.append(processing);

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	startBtn.remove();
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = event => {
		const last = event.results.length - 1;
		const res = event.results[last];
		const text = res[0].transcript;
		if (res.isFinal) {
			processing.innerHTML = "processing ....";

			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `You said: ${text} </br>jarvis said: ${response}`;
			processing.innerHTML = "";
			result.appendChild(p);

			// text to speech
			speechSynthesis.speak(new SpeechSynthesisUtterance(response));
		} else {
			processing.innerHTML = `listening: ${text}`;
		}
	}
	let listening = false;
	toggleBtn = () => {
		if (listening) {
			recognition.stop();
			startBtn.textContent = "Start listening";
		} else {
			recognition.start();
			startBtn.textContent = "Stop listening";
		}
		listening = !listening;
	};
	startBtn.addEventListener("click", toggleBtn);

}

// processor
function process(rawText) {
	let text = rawText.replace(/\s/g, "");
	text = text.toLowerCase();
	let response = null;
	switch(text) {
		case "hello":
		if(localStorage.getItem("name")!=null)
		{
            response = "hi, how are you doing "+ localStorage.getItem("name")+" ?";
		}
		else
			response = "hi, how are you doing?"; 
		break;
		
		case "what'syourname":
			response = "My name's jarvis. what's your name?";  break;			
		case "howareyou":
			response = "I'm good."; break;
		case "whattimeisit":
			response = new Date().toLocaleTimeString(); break;
			case "singasong":
			response = "The club isn't the best place to find a lover So the bar is where I go Me and my friends at the table doing shots Drinking fast and then we talk slow And you come over and start up a conversation with just me And trust me I will give it a chance now Take my hand, stop, put Van the Man on the jukebox And then we start to dance, and now I am singing like Girl, you know I want your love Your love was handmade for somebody like me Come on now, follow my lead I may be crazy, dont mind me Say, boy, lets not talk too much Grab on my waist and put that body on me Come on now, follow my lead Come, come on now, follow my lead"; break;
			case "iloveyou":
			if (localStorage.getItem("name")!=null)
		{
            response = "I love you too "+ localStorage.getItem("name");
		}
		else
			response = "I love you too";
			break;
			case "willyoubemyfriend" 
		if(localStorage.getItem("name")!=null)
		{
            response = "I will be your friend "+ localStorage.getItem("name");
		}
		else
			response = "I will be your friend"; 
		case "stop":
			response = "Bye!!";
			toggleBtn();
	}
	var ront = text.substring(0, 8);
	if(ront=='mynameis')
		{
var vb=text.substring(8, text.length);
localStorage.setItem("name", vb);
response=localStorage.getItem("name")+" so from now you are my owner";
		}
	if (!response) {
		
		window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `I found some information for ${rawText}`;
	}
	return response;
}
