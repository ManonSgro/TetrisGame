var canvas = document.getElementById('board');
var ctx = canvas.getContext("2d");
var linecount = document.getElementById('lines');
var clear = window.getComputedStyle(canvas).getPropertyValue('background-color');
var width = 10;
var height = 20;
var tilesz = 24;
canvas.width = width * tilesz;
canvas.height = height * tilesz;

var board = [];
function fillBlankBoard(){
    for (var r = 0; r < height; r++) {
	   board[r] = [];
        for (var c = 0; c < width; c++) {
            board[r][c] = "";
        }
    }
}
fillBlankBoard();


var bgColor = "#FFF";
var bgDarkColor = "#aaa";
btnWidth=canvas.width/3*2;
btnHeight=50;
activeScreen = "menu";
rectsGame = null;
rectsMenu = {
    btnMenu1:{x: (canvas.width-btnWidth)/2, y: canvas.height/2-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, click: function(){
        activeScreen="game";
        changeScreen();
    }},
    btnMenu2:{x:  (canvas.width-btnWidth)/2, y: canvas.height/2+20, w: btnWidth, h: btnHeight, hover:false, click: function(){
        activeScreen="menu";
        changeScreen();
    }}
}
rects = null;

function newPiece() {
	//var p = pieces[parseInt(Math.random() * pieces.length, 10)];
    //var p = pieces[binomiale(0.5, pieces.length)];
    var p = pieces[binomiale(binomialeInput.value/10, pieces.length)];
	return new Piece(p[0], p[1]);
}

function drawSquare(x, y) {
	ctx.fillRect(x * tilesz, y * tilesz, tilesz, tilesz);
	var ss = ctx.strokeStyle;
	ctx.strokeStyle = "#555";
	ctx.strokeRect(x * tilesz, y * tilesz, tilesz, tilesz);
	ctx.strokeStyle = "#888";
	ctx.strokeRect(x * tilesz + 3*tilesz/8, y * tilesz + 3*tilesz/8, tilesz/4, tilesz/4);
	ctx.strokeStyle = ss;
}

function Piece(patterns, color) {
	this.pattern = patterns[0];
	this.patterns = patterns;
	this.patterni = 0;

	this.color = color;

	this.x = width/2-parseInt(Math.ceil(this.pattern.length/2), 10);
	this.y = -2;
}

Piece.prototype.rotate = function() {
	var nudge = 0;
	var nextpat = this.patterns[(this.patterni + 1) % this.patterns.length];

	if (this._collides(0, 0, nextpat)) {
		// Check kickback
		nudge = this.x > width / 2 ? -1 : 1;
	}

	if (!this._collides(nudge, 0, nextpat)) {
		this.undraw();
		this.x += nudge;
		this.patterni = (this.patterni + 1) % this.patterns.length;
		this.pattern = this.patterns[this.patterni];
		this.draw();
	}
};

var WALL = 1;
var BLOCK = 2;
Piece.prototype._collides = function(dx, dy, pat) {
	for (var ix = 0; ix < pat.length; ix++) {
		for (var iy = 0; iy < pat.length; iy++) {
			if (!pat[ix][iy]) {
				continue;
			}

			var x = this.x + ix + dx;
			var y = this.y + iy + dy;
			if (y >= height || x < 0 || x >= width) {
				return WALL;
			}
			if (y < 0) {
				// Ignore negative space rows
				continue;
			}
			if (board[y][x] !== "") {
				return BLOCK;
			}
		}
	}

	return 0;
};

Piece.prototype.down = function() {
	if (this._collides(0, 1, this.pattern)) {
		this.lock();
		piece = newPiece();
	} else {
		this.undraw();
		this.y++;
		this.draw();
	}
};

Piece.prototype.moveRight = function() {
	if (!this._collides(1, 0, this.pattern)) {
		this.undraw();
		this.x++;
		this.draw();
	}
};

Piece.prototype.moveLeft = function() {
	if (!this._collides(-1, 0, this.pattern)) {
		this.undraw();
		this.x--;
		this.draw();
	}
};

var lines = 0;
var done = false;
Piece.prototype.lock = function() {
	for (var ix = 0; ix < this.pattern.length; ix++) {
		for (var iy = 0; iy < this.pattern.length; iy++) {
			if (!this.pattern[ix][iy]) {
				continue;
			}

			if (this.y + iy < 0) {
				// Game ends!
				//alert("You're done!");
				done = true;
                activeScreen = "menu";
                changeScreen();
				return;
			}
			board[this.y + iy][this.x + ix] = this.color;
		}
	}

	var nlines = 0;
	for (var y = 0; y < height; y++) {
		var line = true;
		for (var x = 0; x < width; x++) {
			line = line && board[y][x] !== "";
		}
		if (line) {
			for (var y2 = y; y2 > 1; y2--) {
				for (var x = 0; x < width; x++) {
					board[y2][x] = board[y2-1][x];
				}
			}
			for (var x = 0; x < width; x++) {
				board[0][x] = "";
			}
			nlines++;
		}
	}

	if (nlines > 0) {
		lines += nlines;
		drawBoard();
		linecount.textContent = "Lines: " + lines;
	}
};

Piece.prototype._fill = function(color) {
	var fs = ctx.fillStyle;
	ctx.fillStyle = color;
	var x = this.x;
	var y = this.y;
	for (var ix = 0; ix < this.pattern.length; ix++) {
		for (var iy = 0; iy < this.pattern.length; iy++) {
			if (this.pattern[ix][iy]) {
				drawSquare(x + ix, y + iy);
			}
		}
	}
	ctx.fillStyle = fs;
};

Piece.prototype.undraw = function(ctx) {
	//this._fill(clear);
    this._fill("#fff");
};

Piece.prototype.draw = function(ctx) {
	this._fill(this.color);
};

var pieces = [
	[I, "cyan"],
	[J, "blue"],
	[L, "orange"],
	[O, "yellow"],
	[S, "green"],
	[T, "purple"],
	[Z, "red"]
];
var piece = null;

var dropStart = Date.now();
var downI = {};
document.body.addEventListener("keydown", function (e) {
	if (downI[e.keyCode] !== null) {
		clearInterval(downI[e.keyCode]);
	}
	key(e.keyCode);
	downI[e.keyCode] = setInterval(key.bind(this, e.keyCode), 200);
}, false);
document.body.addEventListener("keyup", function (e) {
	if (downI[e.keyCode] !== null) {
		clearInterval(downI[e.keyCode]);
	}
	downI[e.keyCode] = null;
}, false);

function key(k) {
	if (done) {
		return;
	}
	if (k == 38) { // Player pressed up
		piece.rotate();
		dropStart = Date.now();
	}
	if (k == 40) { // Player holding down
		piece.down();
	}
	if (k == 37) { // Player holding left
		piece.moveLeft();
		dropStart = Date.now();
	}
	if (k == 39) { // Player holding right
		piece.moveRight();
		dropStart = Date.now();
	}
}

CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  this.beginPath();
  this.moveTo(x + radius, y);
  this.lineTo(x + width - radius, y);
  this.quadraticCurveTo(x + width, y, x + width, y + radius);
  this.lineTo(x + width, y + height - radius);
  this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  this.lineTo(x + radius, y + height);
  this.quadraticCurveTo(x, y + height, x, y + height - radius);
  this.lineTo(x, y + radius);
  this.quadraticCurveTo(x, y, x + radius, y);
  this.closePath();
  if (stroke) {
    this.stroke();
  }
  if (fill) {
    this.fill();
  }        
}

function drawMenu() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = rects.btnMenu1.hover?bgDarkColor:bgColor;
	ctx.roundRect(rects.btnMenu1.x, rects.btnMenu1.y, rects.btnMenu1.w, rects.btnMenu1.h, 5, true, false);
    
    ctx.font = "1.5rem VT323";
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText("Play", (canvas.width-btnWidth)/2+(btnWidth/2),canvas.height/2-btnHeight-20+(btnHeight/2));
    
    ctx.fillStyle = rects.btnMenu2.hover?bgDarkColor:bgColor;
	ctx.roundRect(rects.btnMenu2.x, rects.btnMenu2.y, rects.btnMenu2.w, rects.btnMenu2.h, 5, true, false);
    ctx.fillStyle = "#fff";
    ctx.fillText("Stats", (canvas.width-btnWidth)/2+(btnWidth/2),canvas.height/2+20+(btnHeight/2));
}

function drawBoard() {
	var fs = ctx.fillStyle;
    //ctx.fillStyle = "#fff";
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			//ctx.fillStyle = board[y][x] || clear;
            ctx.fillStyle = board[y][x] || "#fff";
            //ctx.fillStyle = "#fff";
			drawSquare(x, y, tilesz, tilesz);
		}
	}
	ctx.fillStyle = fs;
}

function main() {
	var now = Date.now();
	var delta = now - dropStart;

	if (delta > 1000) {
		piece.down();
		dropStart = now;
	}

	if (!done) {
		requestAnimationFrame(main);
	}
}

var stats = {
    I:0,
    J:0,
    L:0,
    O:0,
    S:0,
    T:0,
    Z:0
}

function binomiale(p, n){
    var c = 0;
    for(var k=1; k<n; k++){
        var t = Math.random();
        if(t<p){
            c++;
        }
    }
    return c;
}

function binomialeChangeStats(binomialeVariable){
    for(i=0;i<100;i++){
        piece = pieces[binomiale(binomialeVariable, pieces.length)];
        switch (piece[0]){
            case I:
                stats.I++;
                break;
            case J:
                stats.J++;
                break;
            case L:
                stats.L++;
                break;
            case O:
                stats.O++;
                break;
            case S:
                stats.S++;
                break;
            case T:
                stats.T++;
                break;
            case Z:
                stats.Z++;
                break;
        }
    }
}

function bernoulli(p) {
	var t = Math.random();
	if (t < p){
		// succes
		return true;
	}
	// echec
	return false;
}

function bernoulliApplication(p){
	if (bernoulli(p) == true){
		document.body.classList = "body--blue";
        bgColor = "#00d2ff";
        bgDarkColor = "#009fc1";
	}
	else {
		document.body.classList = "body--purple";
        bgColor = "#9d50bb";
        bgDarkColor = "#622e76";
	}
}
//console.log("Bernoulli");
//console.log(bernoulli(0.5));

// Nombre de combinaisons de n objets pris k à k
// On ne le fait pas en récursif car c'est moins rapide
function combin(n, k){
	if (k > n/2){
		k = n - k;
	}
	x = 1;
	y = 1;
	i = n-k+1
	while (i <= n) {
	  x = ((x*i)/y);
	  y += 1;
	  i += 1;
	}
	return x;
}

// Probabilité d'avoir k réussites dans un échantillon de taille n, sachant qu'il y en a g dans la population de taille t
function hypergeometrique(k, n, g, t){
	return combin(g,k)*combin((t-g),(n-k))/combin(t,n);
}

function hypergeometriqueApplication(k, n, g, t){
	if (hypergeometrique(k, n, g, t) <= 0.1){
		document.body.style.fontFamily = "\"Comic Sans MS\"";
	}
	else if ((hypergeometrique(k, n, g, t) > 0.1) && (hypergeometrique(k, n, g, t) <= 0.2)){
		document.body.style.fontFamily = "\"Courier New\"";
	}
	else if ((hypergeometrique(k, n, g, t) > 0.2) && (hypergeometrique(k, n, g, t) <= 0.3)){
		document.body.style.fontFamily = "\"Arial Black\"";
	}
	else {
		document.body.style.fontFamily = "\"Lucida Console\"";
	}
}

// Si X suit une loi uniforme sur [a;b]
// La probabilité de P(c≤X≤d)
function uniforme(a,b,c,d){
	return ((d-c)/(b-a));
}


function uniformeApplication(a,b,c,d){
	if (uniforme(a,b,c,d) < 0.5){
		pieces = [
			[I, "#2e4d5c"],
			[J, "#2fb19e"],
			[L, "#4a94c8"],
			[O, "#58628c"],
			[S, "#95ce7b"],
			[T, "#f5c748"],
			[Z, "#ea7a39"]
		];
	}
	else {
		pieces = [
			[I, "#c5516a"],
			[J, "#fa6967"],
			[L, "#ff7065"],
			[O, "#fbca6e"],
			[S, "#ea7a39"],
			[T, "#a383b4"],
			[Z, "#ce7bcb"]
		];
	}
}

function poisson_distribution(lambda){
    var L = Math.exp(-lambda);
    var p = 1.0;
    var k = 0;
    while(p>L){
        k++;
        p *= Math.random();
    }
    return (k-1);
    
}

function poisson_distributionApplication(p){
	if (poisson_distribution(p) < 7){
		document.getElementById("subtitle").innerHTML = "Tu n’as pas échoué tant que tu continues d'essayer !";
	}
	else {
		document.getElementById("subtitle").innerHTML = "Repousse tes limites !";

	}
}



bernoulliApplication(0.5);
hypergeometriqueApplication(2,5,26,52);
uniformeApplication(-2,3,-1,3);
poisson_distributionApplication(6);




let binomialeInput = document.querySelector('#binomialeInput'),
    binomialeParameterValue = document.querySelector('.binomialeParameterValue');

binomialeParameterValue.innerHTML = binomialeInput.value/10;
binomialeChangeStats(binomialeInput.value/10);

binomialeInput.addEventListener('input', function () {
  binomialeParameterValue.innerHTML = binomialeInput.value/10;
    //binomialeChangeStats(binomialeInput.value/10);
    
}, false);
console.log(stats);
for(const prop in stats){
   console.log("."+prop+"_chance"); document.querySelector("."+prop+"_chance").innerHTML = "~"+stats[prop]+"%";
}

function changeScreen(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    switch(activeScreen){
        case "menu":
            rects = rectsMenu;
            drawMenu();
            break;
        case "game":
            rects = rectsGame;
            fillBlankBoard();
            done = false;
            
            piece = newPiece();
            drawBoard();
            linecount.textContent = "Lines: 0";
            main();
            break;
        default:
            break;
        
    }
}

canvas.onmousemove = function(e) {

  // Get the current mouse position
    var r = canvas.getBoundingClientRect(),
        x = e.clientX - r.left, y = e.clientY - r.top;
    if( rects && rects !== "null" && rects !== "undefined" ){
        for(var r in rects){
        
            if(x >= rects[r].x && x <= rects[r].x + rects[r].w &&
               y >= rects[r].y && y <= rects[r].y + rects[r].h) {
                rects[r].hover=true;
            }else{
                rects[r].hover=false;
            }
            drawMenu();
        }
    }

};
canvas.onclick = function(e) {

  // Get the current mouse position
    var r = canvas.getBoundingClientRect(),
        x = e.clientX - r.left, y = e.clientY - r.top;
    
    if( rects && rects !== "null" && rects !== "undefined" ){
        for(var r in rects){
            if( rects && rects !== "null" && rects !== "undefined" ){
                if(x >= rects[r].x && x <= rects[r].x + rects[r].w &&
                   y >= rects[r].y && y <= rects[r].y + rects[r].h) {
                    rects[r].click();
                }
            }
        }
    }
    

};

changeScreen();

