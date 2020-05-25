var canvas = document.getElementById('board');
var ctx = canvas.getContext("2d");
var linecount = document.getElementById('lines');
var difficultyText = document.getElementById('difficulty');
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
    btnMenu1:{x: (canvas.width-btnWidth)/2, y: canvas.height/3-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Jouer";
    }, click: function(){
        activeScreen="game";
        changeScreen();
    }},
    btnMenu2:{x:  (canvas.width-btnWidth)/2, y: canvas.height/3+20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Stats";
    }, click: function(){
        activeScreen="stats";
        changeScreen();
    }},
    btnMenu3:{x:  (canvas.width-btnWidth)/2, y: canvas.height/3*2+20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Résultats";
    }, click: function(){
        activeScreen="results";
        changeScreen();
    }}
}
rectsStats = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: 20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Moyenne";
    }, click: function(){
        activeScreen="statsMoyenne";
        changeScreen();
    }},
    btnStats2:{x: (canvas.width-btnWidth)/2, y: 30+btnHeight, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Uniforme";
    }, click: function(){
        activeScreen="statsUniforme";
        changeScreen();
    }},
    btnStats3:{x: (canvas.width-btnWidth)/2, y: 40+btnHeight*2, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Binomiale";
    }, click: function(){
        activeScreen="statsBinomiale";
        changeScreen();
    }},
    btnStats4:{x: (canvas.width-btnWidth)/2, y: 50+btnHeight*3, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Poisson";
    }, click: function(){
        activeScreen="statsPoisson";
        changeScreen();
    }},
    btnStats5:{x: (canvas.width-btnWidth)/2, y: 60+btnHeight*4, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Bernouilli";
    }, click: function(){
        activeScreen="statsBernouilli";
        changeScreen();
    }},
    btnStats6:{x: (canvas.width-btnWidth)/2, y: 70+btnHeight*5, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Hypergéométrique";
    }, click: function(){
        activeScreen="statsHypergeometrique";
        changeScreen();
    }},
    btnStats7:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="menu";
        changeScreen();
    }}
}
rectsStatsUniforme = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="stats";
        changeScreen();
    }}
}
rectsStatsBinomiale = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="stats";
        changeScreen();
    }}
}
rectsStatsPoisson = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="stats";
        changeScreen();
    }}
}
rectsStatsBernouilli = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="stats";
        changeScreen();
    }}
}
activeHypergeometrique = false;
rectsStatsHypergeometrique = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="stats";
        changeScreen();
    }},
    
    btnStats2:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight*2-40, w: btnWidth, h: btnHeight, hover:false, text:function(){
        if(activeHypergeometrique){
            return "Désactiver";
        }else{
            return "Activer";
        }
    }, click: function(){
        activeHypergeometrique=!activeHypergeometrique;
        //console.log((activeHypergeometrique)?"Désactiver":"Activer");
        changeScreen();
    }}
}
rectsStatsMoyenne = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="stats";
        changeScreen();
    }}
}
rectsResults = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: 20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Binomiale";
    }, click: function(){
        activeScreen="resultsBinomiale";
        changeScreen();
    }},
    btnStats2:{x: (canvas.width-btnWidth)/2, y: 40+btnHeight, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Poisson";
    }, click: function(){
        activeScreen="resultsPoisson";
        changeScreen();
    }},
    btnStats3:{x: (canvas.width-btnWidth)/2, y: 60+btnHeight*2, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Hypergéométrique";
    }, click: function(){
        activeScreen="resultsHypergeometrique";
        changeScreen();
    }},
    btnStats4:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="menu";
        changeScreen();
    }}
}

rectsResultsBinomiale = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="results";
        changeScreen();
    }}
}

rectsResultsPoisson = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="results";
        changeScreen();
    }}
}

rectsResultsHypergeometrique = {
    btnStats1:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight-20, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Retour";
    }, click: function(){
        activeScreen="results";
        changeScreen();
    }},
    btnStats2:{x: (canvas.width-btnWidth)/2, y: canvas.height-btnHeight*2-40, w: btnWidth, h: btnHeight, hover:false, text:function(){
        return "Reset";
    }, click: function(){
        resetHypergeometriqueReel();
        changeScreen();
    }}
}

rects = null;

statsReels = {
    I:0,
    J:0,
    L:0,
    O:0,
    S:0,
    T:0,
    Z:0
}

function weightedRand(spec) {
  var i, j, table=[];
  for (i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (j=0; j<spec[i]*10; j++) {
      table.push(i);
    }
  }
  return function() {
    return table[Math.floor(Math.random() * table.length)];
  }
}


function newPiece() {
    res = binomiale(binomialeInput.value/10, pieces.length);
    var p = pieces[res];
    statsReels[Object.getOwnPropertyNames(statsReels)[res]]++;
    randomColor = poisson_distribution(poissonDistributionParameter-1);
    if(randomColor>Object.keys(statsPoisson).length-1){
        randomColor = Object.keys(statsPoisson).length-1;
    }
    if(randomColor<0){
        randomColor = 0;
    }
    statsPoissonReel[Object.keys(statsPoisson)[randomColor]]++;
    return new Piece(p[0], Object.keys(statsPoisson)[randomColor]);
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
    switch(color){
        case "cyan":
            this.color = "#4dffd5";
            break;
        case "blue":
            this.color = "#4dcfff";
            break;
        case "orange":
            this.color = "#ffd54d";
            break;
        case "yellow":
            this.color = "#ffff4d";
            break;
        case "green":
            this.color = "#9aff4d";
            break;
        case "purple":
            this.color = "#d54dff";
            break;
        case "red":
            this.color = "#ff4d76";
            break;
        default:
            this.color = "#ddd";
            break;
    }
	this.x = width/2-parseInt(Math.ceil(this.pattern.length/2), 10);
	this.y = -2;
}

Piece.prototype.rotate = function() {
	var nudge = 0;
	var nextpat = this.patterns[(this.patterni + 1) % this.patterns.length];
	if (this._collides(0, 0, nextpat)) {
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
				// Game ends
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
    drawAllBtn(rectsMenu);
}

function drawBoard() {
	var fs = ctx.fillStyle;
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
            ctx.fillStyle = board[y][x] || "#fff";
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

function binomialCoef(n,k){
    if(k==0 || k==n){
        return 1;
    }else{
        return binomialCoef(n-1, k-1)+binomialCoef(n-1, k);
    }
}

function probaBinomiale(p,n,k){
    nk = binomialCoef(n,k);
    proba = nk*Math.pow(p,k)*Math.pow((1-p), n-k);
    return proba;
}

function binomialeChangeStats(binomialeVariable){
    i=0;
    for(var key in stats){
        stats[key] = probaBinomiale(binomialeVariable, pieces.length, i)*100;
        i++;
    }
    for(var key in statsReels){
        statsReels[key] = 0;
    }
    changeScreen();
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

// Si X suit une loi uniforme sur [a;b]
// La probabilité de P(c≤X≤d)
function uniformeFonctionDeRepartition(a,b,c,d){
	return ((d-c)/(b-a));
}

function uniforme(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniformeApplication(uniformeVariable){
    res = uniformePossibilities[uniforme(bornesUniforme[0], bornesUniforme[1])];
    document.getElementById("subtitle").innerHTML = res;
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

function poisson_distributionProba(k, lambda){
    var numerator = Math.pow(lambda, k);
    var denominator = 1;
    for(j=1;j<k;j++){
        denominator = denominator*j;
    }
    return (numerator/denominator)*(Math.exp(-lambda));
    
}


statsPoisson = {
    "cyan":0,
    "blue":0,
    "orange":0,
    "yellow":0,
    "green":0,
    "purple":0,
    "red":0
};

statsPoissonReel = {
    "cyan":0,
    "blue":0,
    "orange":0,
    "yellow":0,
    "green":0,
    "purple":0,
    "red":0
};

function poissonChangeStats(poissonVariable){
    i=0;
    for(var key in statsPoisson){
        statsPoisson[key] = poisson_distributionProba(i, poissonVariable);
        i++;
    }
    for(var key in statsPoissonReel){
        statsPoissonReel[key] = 0;
    }
    
    poissonDistributionParameter = poissonVariable;
    changeScreen();
}

bornesUniforme = [-1,3];
//poissonPossibilities
poissonDistributionParameter = 6;
let poissonInput = document.querySelector('#poissonInput'),
    poissonParameterValue = document.querySelector('.poissonParameterValue');

poissonParameterValue.innerHTML = poissonInput.value;
poissonChangeStats(poissonInput.value);

poissonInput.addEventListener('input', function () {
  poissonParameterValue.innerHTML = poissonInput.value;
  poissonChangeStats(poissonInput.value);
    
}, false);

bernouilliParameter = 0.5;
bernoulliApplication(bernouilliParameter);

hypergeometriqueParameter = 0.2;
hypergeometriqueParameterA = 100;
hypergeometriqueParameterN = 40;
hypergeometriqueParameterNReel = 0;
hypergeometriquePossibilities = [];

let hypergeometriqueInput = document.querySelector('#hypergeometriqueInput'),
    hypergeometriqueParameterValue = document.querySelector('.hypergeometriqueParameterValue');

let hypergeometriqueAInput = document.querySelector('#hypergeometriqueAInput'),
    hypergeometriqueParameterAValue = document.querySelector('.hypergeometriqueParameterAValue');

let hypergeometriqueNInput = document.querySelector('#hypergeometriqueNInput'),
    hypergeometriqueParameterNValue = document.querySelector('.hypergeometriqueParameterNValue');

hypergeometriqueParameterValue.innerHTML = hypergeometriqueInput.value;

hypergeometriqueParameterAValue.innerHTML = hypergeometriqueAInput.value;
hypergeometriqueParameterNValue.innerHTML = hypergeometriqueNInput.value;

hypergeometriqueChangeStats(hypergeometriqueInput.value, hypergeometriqueAInput.value, hypergeometriqueNInput.value);

hypergeometriqueInput.addEventListener('input', function () {
  hypergeometriqueParameterValue.innerHTML = hypergeometriqueInput.value;
  hypergeometriqueChangeStats(hypergeometriqueInput.value, hypergeometriqueAInput.value, hypergeometriqueNInput.value);
    
}, false);
hypergeometriqueAInput.addEventListener('input', function () {
  hypergeometriqueParameterAValue.innerHTML = hypergeometriqueAInput.value;
  hypergeometriqueChangeStats(hypergeometriqueInput.value, hypergeometriqueAInput.value, hypergeometriqueNInput.value);
    
}, false);
hypergeometriqueNInput.addEventListener('input', function () {
  hypergeometriqueParameterNValue.innerHTML = hypergeometriqueNInput.value;
  hypergeometriqueChangeStats(hypergeometriqueInput.value, hypergeometriqueAInput.value, hypergeometriqueNInput.value);
    
}, false);

function hypergeometriqueChangeStats(hypergeometriqueVariable, hypergeometriqueVariableA, hypergeometriqueVariableN){
    hypergeometriqueParameter = hypergeometriqueVariable;
    hypergeometriqueParameterA = hypergeometriqueVariableA;
    hypergeometriqueParameterN = hypergeometriqueVariableN;
   hypergeometriquePossibilities=[];
    for(i=0;i<hypergeometriqueVariableA;i++){
        if(i<hypergeometriqueVariableA*hypergeometriqueVariable){
            hypergeometriquePossibilities.push("facile");
        }else{
            hypergeometriquePossibilities.push("difficile");
        }

    }
    changeScreen();
}

uniformePossibilities = ["Repousse tes limites !", "Essaie encore une fois !", "Tu n'as pas échoué tant que tu continues d'essayer !", "Cela semble toujours impossible, jusqu'à ce qu'on le fasse !", "Ne pas s'arrêter est encore le meilleur moyen d'avancer !", "De toute façon, tu n'y arriveras jamais...", "Tu ferais mieux d'arrêter tout de suite les dégâts...", "Les probabilités prédisent déjà que tu vas échouer...", "A quoi bon essayer, c'est perdu d'avance...", "Tu ne veux pas plutôt jouer à un jeu à ton niveau ?"]
uniformeApplication(0.5);

let uniformeInput = document.querySelector('#uniformeInput'),
    uniformeParameterValue = document.querySelector('.uniformeParameterValue');

uniformeParameterValue.innerHTML = uniformeInput.value;


let uniformeBorneInfInput = document.querySelector('#uniformeBorneInfInput'),
    uniformeBorneInfParameterValue = document.querySelector('.uniformeBorneInfParameterValue');
let uniformeBorneSupInput = document.querySelector('#uniformeBorneSupInput'),
    uniformeBorneSupParameterValue = document.querySelector('.uniformeBorneSupParameterValue');

uniformeBorneInfParameterValue.innerHTML = uniformeBorneInfInput.value;

uniformeChangeStats(uniformeInput.value, uniformeBorneInfInput.value, uniformeBorneSupInput.value);

uniformeBorneSupParameterValue.innerHTML = uniformeBorneSupInput.value;
uniformeChangeStats(uniformeInput.value, uniformeBorneInfInput.value, uniformeBorneSupInput.value);

uniformeBorneInfInput.addEventListener('change', function(){
    if(parseInt(uniformeBorneInfInput.value) >= parseInt(uniformeBorneSupInput.value)){
        uniformeBorneInfInput.value = uniformeBorneSupInput.value-1;
    }
    uniformeBorneInfParameterValue.innerHTML = uniformeBorneInfInput.value;
    uniformeChangeStats(uniformeInput.value, uniformeBorneInfInput.value, uniformeBorneSupInput.value);
});
uniformeBorneInfInput.addEventListener('input', function () {
    
  uniformeBorneInfParameterValue.innerHTML = uniformeBorneInfInput.value;

uniformeChangeStats(uniformeInput.value, uniformeBorneInfInput.value, uniformeBorneSupInput.value);
    
}, false);


uniformeBorneSupInput.addEventListener('change', function(){
    if(parseInt(uniformeBorneSupInput.value) <= parseInt(uniformeBorneInfInput.value)){
        uniformeBorneSupInput.value = parseInt(uniformeBorneInfInput.value)+1;
    }
    uniformeBorneSupParameterValue.innerHTML = uniformeBorneSupInput.value;
    uniformeChangeStats(uniformeInput.value, uniformeBorneInfInput.value, uniformeBorneSupInput.value);
});
uniformeBorneSupInput.addEventListener('input', function () {
  uniformeBorneSupParameterValue.innerHTML = uniformeBorneSupInput.value;
uniformeChangeStats(uniformeInput.value, uniformeBorneInfInput.value, uniformeBorneSupInput.value);
    
}, false);

uniformeInput.addEventListener('input', function () {
  uniformeParameterValue.innerHTML = uniformeInput.value;

uniformeChangeStats(uniformeInput.value, uniformeBorneInfInput.value, uniformeBorneSupInput.value);
    
}, false);
function uniformeChangeStats(uniformeVariable, uniformeBorneInfVariable, uniformeBorneSupVariable){
    uniformeParameter = uniformeVariable;
    bornesUniforme[0] = uniformeBorneInfVariable;
    bornesUniforme[1] = uniformeBorneSupVariable;
    uniformeApplication(uniformeVariable);
    changeScreen();
}

let bernouilliInput = document.querySelector('#bernouilliInput'),
    bernouilliParameterValue = document.querySelector('.bernouilliParameterValue');

bernouilliParameterValue.innerHTML = bernouilliInput.value;
bernouilliChangeStats(bernouilliInput.value);

bernouilliInput.addEventListener('input', function () {
  bernouilliParameterValue.innerHTML = bernouilliInput.value;
  bernouilliChangeStats(bernouilliInput.value);
}, false);

function bernouilliChangeStats(bernouilliVariable){
    bernouilliParameter = bernouilliVariable;
    bernoulliApplication(bernouilliVariable);
    changeScreen();
}

let binomialeInput = document.querySelector('#binomialeInput'),
    binomialeParameterValue = document.querySelector('.binomialeParameterValue');

binomialeParameterValue.innerHTML = binomialeInput.value/10;
binomialeChangeStats(binomialeInput.value/10);

binomialeInput.addEventListener('input', function () {
  binomialeParameterValue.innerHTML = binomialeInput.value/10;
  binomialeChangeStats(binomialeInput.value/10);
    
}, false);
/*for(const prop in stats){
   console.log("."+prop+"_chance"); 
}*/

function changeScreen(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    switch(activeScreen){
        case "menu":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsMenu;
            drawMenu();
            break;
        case "game":
            for(var key in statsReels){
                statsReels[key] = 0;
            }
            rects = rectsGame;
            fillBlankBoard();
            done = false;
            
            piece = newPiece();
            drawBoard();
            linecount.textContent = "Lines: 0";
            if(activeHypergeometrique){
                difficulty = hypergeometriqueGenerator(hypergeometriqueParameter, hypergeometriqueParameterA);
                difficultyText.textContent = "Plus "+difficulty;
                if(difficulty=="facile"){
                    if(parseInt(binomialeInput.value)-2>=1){
                        binomialeInput.value -= 2;
                    }else{
                        binomialeInput.value = 1;
                    }
                }else{
                    if((parseInt(binomialeInput.value)+2)>9){
                        binomialeInput.value = 9;
                    }else{
                        binomialeInput.value = (parseInt(binomialeInput.value)+2);
                    }
                }
                binomialeParameterValue.innerHTML = binomialeInput.value/10;
            }
            
            
            main();
            break;
        case "stats":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsStats;
            drawStats();
            break;
        case "statsMoyenne":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsStatsMoyenne;
            drawStatsMoyenne();
            break;
        case "statsUniforme":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsStatsUniforme;
            drawStatsUniforme();
            break;
        case "statsBinomiale":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsStatsBinomiale;
            drawStatsBinomiale();
            break;
        case "statsPoisson":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsStatsPoisson;
            drawStatsPoisson();
            break;
        case "statsBernouilli":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsStatsBernouilli;
            drawStatsBernouilli();
            break;
        case "statsHypergeometrique":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsStatsHypergeometrique;
            drawStatsHypergeometrique();
            break;
        case "results":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsResults;
            drawResults();
            break;
        case "resultsBinomiale":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsResultsBinomiale;
            drawResultsBinomiale();
            break;
        case "resultsPoisson":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsResultsPoisson;
            drawResultsPoisson();
            break;
        case "resultsHypergeometrique":
            linecount.textContent = "";
            difficultyText.textContent = "";
            rects = rectsResultsHypergeometrique;
            drawResultsHypergeometrique();
            break;
        default:
            break;
        
    }
}

function drawStat(title, value, y){
    ctx.font = "1.5rem VT323";
    ctx.textAlign="left"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    if(ctx.measureText(title+" "+value).width <= canvas.width-40){
        ctx.fillText(title+" "+value,20,y);
    }else{
        ctx.fillText(title,20,y);
        ctx.fillText(value, 20,y+20);
    }
}

function drawStats(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rectsStats);
   
}

function drawStatsMoyenne(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rectsStatsMoyenne);
    
    // Moyenne
    drawStat("Valeurs :", "[5, 1, 1, 1, 5]", 20);
    
    // Moyenne
    drawStat("Moyenne :", arrondiAuCentième(moyenne([5, 1, 1, 1, 5])), 60);
    
    //Ecart type
    drawStat("Ecart type :", arrondiAuCentième(ecartType([5, 1, 1, 1, 5])), 80);
    
    //Ecart moyen
    drawStat("Ecart moyen :", arrondiAuCentième(ecartMoyen([5, 1, 1, 1, 5])), 100);
}


statsHypergeometriqueReel = {};
resultsHypergeometriqueReel = [];

function resetHypergeometriqueReel(){
    hypergeometriqueParameterNReel = 0;
    statsHypergeometriqueReel = {};
    resultsHypergeometriqueReel = [];
}

function hypergeometriqueGenerator(p, A){
    hypergeometriqueRandom = Math.floor(Math.random() * hypergeometriquePossibilities.length);
    res = hypergeometriquePossibilities[hypergeometriqueRandom];
    if(hypergeometriqueParameterNReel<hypergeometriqueParameterN){
        resultsHypergeometriqueReel.push(res);
        statsHypergeometriqueReel[hypergeometriqueParameterNReel] = resultsHypergeometriqueReel.filter(el => el=="facile").length/(hypergeometriqueParameterNReel+1);
        hypergeometriqueParameterNReel++;
    }  
    return res;
}

function drawStatsHypergeometrique(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rects);
    
    // Paramètre p (succès)
    drawStat("Paramètre p :", arrondiAuCentième(hypergeometriqueParameter), 20);
    
    // Paramètre q (echecs)
    drawStat("Paramètre q :", arrondiAuCentième(1-hypergeometriqueParameter), 40);
    
    // Paramètre A (nb de possibilités total)
    drawStat("Paramètre A :", arrondiAuCentième(hypergeometriqueParameterA), 60);
    
    // Paramètre A (nb de tirages)
    drawStat("Paramètre n :", arrondiAuCentième(hypergeometriqueParameterN), 80);
    
    // Esperance
    drawStat("Esperance :", arrondiAuCentième(hypergeometriqueParameter*hypergeometriqueParameterN), 100);
    
    // Variance
    drawStat("Variance :", arrondiAuCentième(hypergeometriqueParameter*hypergeometriqueParameterN*(1-hypergeometriqueParameter)*((hypergeometriqueParameterA-hypergeometriqueParameterN)/(hypergeometriqueParameterA-1))), 120);
    
    // Ecart-type
    ecartType = Math.sqrt(hypergeometriqueParameterN*hypergeometriqueParameter*hypergeometriqueParameterA)*Math.sqrt((hypergeometriqueParameterA-hypergeometriqueParameterN)/(hypergeometriqueParameterA-1));
    drawStat("Ecart-type :", arrondiAuCentième(ecartType), 140);
    
    // Histogramme
    statsHypergeometrique = {
        "0":0,
    };
    for(j=0; j<hypergeometriqueParameterN; j++){
        statsHypergeometrique[j] = hypergeometrique(j, hypergeometriqueParameterN, hypergeometriqueParameter, hypergeometriqueParameterA);
    }
    barChart("Histogramme :", 160, statsHypergeometrique);
}

function drawStatsBernouilli(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rects);
    
    // Paramètre
    drawStat("Paramètre :", arrondiAuCentième(bernouilliParameter), 20);
    
    // Esperance
    drawStat("Esperance :", arrondiAuCentième(bernouilliParameter), 40);
    
    // Variance
    drawStat("Variance :", arrondiAuCentième(bernouilliParameter*(1-bernouilliParameter)), 60);
}

function drawStatsUniforme(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rects);
    
    // Esperance uniforme
    drawStat("Esperance uniforme :", arrondiAuCentième((bornesUniforme[0]+bornesUniforme[1])/2), 20);
    
    // Variance uniforme
    drawStat("Variance uniforme :", arrondiAuCentième(Math.pow(bornesUniforme[1]-bornesUniforme[0], 2)/12), 60);
    
    // Densité de probabilité
    drawStat("Densité de probabilité :", arrondiAuCentième(1/(bornesUniforme[1]-bornesUniforme[0]))+" sur ["+bornesUniforme[0]+", "+bornesUniforme[1]+"]", 100);
}

function drawStatsBinomiale(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rects);
    
    //Histogramme
    barChartHeight = barChart("Histogramme binomiale:", 20, stats);

    // Esperance
    esperance = arrondiAuCentième(pieces.length*binomialeInput.value/10);
    inf = (Math.ceil(esperance)-1>=0 && Math.ceil(esperance)-1<pieces.length)?Object.getOwnPropertyNames(stats)[Math.ceil(esperance)-1]:"";
    sup = (Math.ceil(esperance)>=0 && Math.ceil(esperance)<pieces.length)?Object.getOwnPropertyNames(stats)[Math.ceil(esperance)]:"";
    separator = (inf.length>0 && sup.length>0)?"-":"";
    
    drawStat("Espérance binomiale :", esperance+" ("+inf+separator+sup+")", barChartHeight+20);    
    
    // Variance
    variance = arrondiAuCentième(pieces.length*binomialeInput.value/10*(1-binomialeInput.value/10));
    drawStat("Variance binomiale :", variance, barChartHeight+60);
}

function drawStatsPoisson(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rects);
    
    // Parametre
    drawStat("Paramètre :", poissonDistributionParameter, 20);
    
    // Bar chart
    barChartHeight = barChart("Histogramme poisson:", 40, statsPoisson);
    
    // Esperance
    drawStat("Esperance :", poissonDistributionParameter, barChartHeight+20);
    
    // Variance
    drawStat("Variance :", poissonDistributionParameter, barChartHeight+40);
    
    // Ecart-type
    drawStat("Ecart-type :", arrondiAuCentième(Math.sqrt(poissonDistributionParameter)), barChartHeight+60);
}

function drawBtn(btn, text){
    ctx.fillStyle = btn.hover?bgDarkColor:bgColor;
	ctx.roundRect(btn.x, btn.y, btn.w, btn.h, 5, true, false);
    
    ctx.font = "1.5rem VT323";
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(btn.text(), (canvas.width-btn.w)/2+(btn.w/2),btn.y+btn.h-(btn.h/2));
}

function drawAllBtn(allBtn){
    for(var key in allBtn){
        drawBtn(allBtn[key]);
    }
}

function drawResults(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rectsResults);
}

function drawResultsBinomiale(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rects);
    
    // Lines
    drawStat("Lines :", lines, 20);
    
    //Histogramme prévu
    barChartHeight = barChart("Histogramme prévu:", 60, stats);
    
    //Histogramme réel
    barChart("Histogramme réel:", barChartHeight+20, statsReels);
}

function drawResultsPoisson(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rects);
    
    //Histogramme prévu
    barChartHeight = barChart("Histogramme prévu:", 20, statsPoisson);
    
    //Histogramme réel
    barChart("Histogramme réel:", barChartHeight, statsPoissonReel);
}

function drawResultsHypergeometrique(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255, 0.7)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawAllBtn(rects);
    
    //Histogramme prévu
    statsHypergeometrique = {
        "0":0,
    };
    for(j=0; j<hypergeometriqueParameterN; j++){
        statsHypergeometrique[j] = hypergeometrique(j, hypergeometriqueParameterN, hypergeometriqueParameter, hypergeometriqueParameterA);
    }
    barChartHeight = barChart("Histogramme prévu:", 20, statsHypergeometrique);
    
    //Histogramme réel
    barChart("Histogramme réel:", barChartHeight+20, statsHypergeometriqueReel);
}

function barChart(title, y, data){
    ctx.textAlign="left";
    ctx.fillStyle = "#fff";
    ctx.fillText(title, 20,y);
    
    if(Object.values(data).reduce((a, b) => a + b) <=0){
        ctx.fillText("Pas de données de jeu", 20,y+20);
        return 40;
    }else{
        higher = 0;
        adjustment = 1;
        tooSmall = 1;
        tooBig = false;
        for(var key in data){
            if(data[key]<1){
                tooSmall++;
            }
            if(data[key]>10){
                tooBig = true;
            }
        }
        if(tooSmall>=Object.keys(data).length){
            adjustment = 10;
        }
        if(tooBig){
            adjustment = 1/10;
        }
        for(var key in data){
            if(data[key]*adjustment>higher){
                higher = data[key]*adjustment;
            }
        }
        ctx.beginPath();
        for(i=0; i<higher; i++){
            ctx.moveTo(20, y+20+i*5);
            ctx.lineTo(canvas.width - 20, y+20+i*5);
            ctx.strokeStyle = "rgb(175,175,175)";
            ctx.stroke();
        }
        j=0;
        widthValue = (canvas.width-40)/Object.keys(data).length;
        
        legendHeight = 0;
        for(var key in data){
            ctx.textAlign="center";
            textWidth = ctx.measureText(key).width;
            ctx.fillStyle = "#fff";
            if(textWidth>widthValue){
                for(k=0; k<key.length; k++){
                    ctx.fillText(key[k], 20+widthValue*j+(widthValue/2),y+20+i*5+20+20*k);
                }
                if(legendHeight<k){
                    legendHeight=k;                    
                }
            }else{
                ctx.fillText(key, 20+widthValue*j+(widthValue/2),y+20+i*5+20);
            }
            

            ctx.fillStyle = "rgb(100,100,100)";
            ctx.fillRect(20+widthValue*j+widthValue/4,y+20+higher*5-data[key]*5*adjustment,widthValue/2,data[key]*5*adjustment);
            j++;
        }
        return y+20+i*5+40+legendHeight*20;
    }
    
}

function arrondiAuCentième(nb){
    arrondi = nb*100;
    arrondi = Math.round(arrondi);
    arrondi = arrondi/100;
    return arrondi;
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
            changeScreen();
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


// calcul de la moyenne d'un tableau
function moyenne(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function ecartType(values){
  var avg = moyenne(values);
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  var avgSquareDiff = moyenne(squareDiffs);
  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}


function ecartMoyen(data){
	var elem = [];
	var b = data.length;
	var final;
	var avg = moyenne(data);
	for (i = 0; i < b; i++){
		elem.push(Math.abs(data[i]-avg));
	}
	final = elem.reduce((f, g) => f + g, 0)
	return final/b;
}