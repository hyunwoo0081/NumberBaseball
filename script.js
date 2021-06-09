var numArr = [0,0,0,0];
const inputElement = document.getElementById("number_input");
const table =  document.getElementById("log_table");
const button = document.getElementById("enter");

var isStart = 0;

init();
function init(){
	createRandom();
	
	button.addEventListener("click", e => {
		enterListener();
	});
}

function createRandom(){
	isStart = 1;
	//create new number;
	for(let t = 0; t < 4; t++){
		let i;
		const a = Math.floor(Math.random()*10);
		for(i = 0; i < t && numArr[i] != a; i++);
		if(i == t){
			numArr[t] = a;
		}else{
			t--;
		}
	}
}

function resetTable(){
	while(table.childNodes[2] != null){
		table.removeChild(table.childNodes[2]);
	}
	createRandom();
	button.innerHTML = "Enter";
	inputElement.value = "";
}

function enterListener(){
	if(isStart === 0){
		resetTable();
		return false;
	}
	
	let num = inputElement.value;
	if(num == null || num.length != 4){
		alert("4개의 숫자만 입력하세요");
		return false;
	}
	let flag = false;
	for(let i = 0; i < 4 && !flag; i++){
		for(let j = 0; j < i; j++){
			if(num[i] == num[j]) flag = true;
		}
	}
	
	if(flag){
		alert("숫자가 중복됩니다.");
		return false;
	}
	
	hitNumber(num);
	return true;
}

function hitNumber(arr){
	let strike = 0;
	let ball = 0;
	
	for(let i = 0; i < 4; i++){
		if(numArr[i] == arr[i]) strike++;
		else{
			for(let j = 0; j < 4; j++){
				if(numArr[j] == arr[i]) ball++;
			}
		}
	}
	
	let tr = document.createElement("tr");
	let td0 = document.createElement("td");
	let td1 = document.createElement("td");
	let td2 = document.createElement("td");
	let td3 = document.createElement("td");
	
	td0.innerHTML = arr;
	if(ball > 0){
		td1.innerHTML = ball;
		td1.classList.add("ball");
	}
	if(strike > 0){
		td2.classList.add("strike");
		if(strike === 4){
			td1.classList.add("ball");
			td3.classList.add("out");
			button.innerHTML = "Reset";
			isStart = 0;
		}else{
			td2.innerHTML = strike;
		}
	}
	if(ball === 0 && strike === 0){
		td3.classList.add("out");
	}
	
	tr.appendChild(td0);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	table.appendChild(tr);
}
