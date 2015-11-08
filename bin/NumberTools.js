(function (console, $hx_exports) { "use strict";
$hx_exports.numbertools = $hx_exports.numbertools || {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var numbertools_Geometry = $hx_exports.numbertools.Geometry = function() { };
numbertools_Geometry.degreesToRadians = function(deg) {
	return deg * (Math.PI / 180);
};
numbertools_Geometry.radiansToDegrees = function(rad) {
	return rad * (180 / Math.PI) + 180;
};
numbertools_Geometry.getAngleR = function(x1,y1,x2,y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return Math.atan2(dy,dx);
};
numbertools_Geometry.getAngleD = function(x1,y1,x2,y2) {
	var d = numbertools_Geometry.radiansToDegrees(numbertools_Geometry.getAngleR(x1,y1,x2,y2));
	return d;
};
numbertools_Geometry.areaOfRectangle = function(width,height) {
	return width * height;
};
numbertools_Geometry.areaOfCircle = function(radius) {
	return Math.PI * (radius * radius);
};
numbertools_Geometry.areaOfElipse = function(bigRadius,smallRadius) {
	return Math.PI * (bigRadius * smallRadius);
};
numbertools_Geometry.areaOfRightTriangle = function(a,b) {
	return a * b / 2;
};
numbertools_Geometry.areaOfTriangle = function(base,perpHeight) {
	return 0.5 * base * perpHeight;
};
var numbertools_Tools = $hx_exports.numbertools.Tools = function() { };
numbertools_Tools.randomFloat = function(max,min,excluding) {
	var num = Math.random() * (max - min) + min;
	if(excluding != null) {
		while(numbertools_Tools.floatInArray(num,excluding)) num = Math.random() * (max - min) + min;
		return num;
	} else return num;
};
numbertools_Tools.randomInt = function(max,min,excluding) {
	var num = Math.round(Math.random() * (max - min) + min);
	if(excluding != null) {
		while(numbertools_Tools.intInArray(num,excluding)) num = Math.round(Math.random() * (max - min) + min);
		return num;
	} else return num;
};
numbertools_Tools.roundTo = function(num,decimal) {
	var precision = Math.pow(10,decimal);
	return Math.round(num * precision) / precision;
};
numbertools_Tools.clamp = function(value,min,max) {
	if(max < min) throw new js__$Boot_HaxeError("Error: max must be more than min!");
	if(value < min) return min; else if(value > max) return max; else return value;
};
numbertools_Tools.randomBool = function() {
	if(Math.round(Math.random()) == 0) return true; else return false;
};
numbertools_Tools.isOdd = function(value) {
	if(value % 2 == 1) return true; else return false;
};
numbertools_Tools.isEven = function(value) {
	if(value % 2 == 1) return false; else return true;
};
numbertools_Tools.isPrime = function(value) {
	if(value > 1) {
		var _g1 = 2;
		var _g = value - 1;
		while(_g1 < _g) {
			var i = _g1++;
			if(value % i == 0) return false;
		}
	} else throw new js__$Boot_HaxeError("Error: value must be greater than 1!");
	return true;
};
numbertools_Tools.listPrimesUnder = function(value) {
	var primes = [];
	if(value > 1) {
		var _g = 2;
		while(_g < value) {
			var i = _g++;
			if(numbertools_Tools.isPrime(i)) primes.push(i);
		}
	}
	return primes;
};
numbertools_Tools.ratio = function(value1,value2) {
	return value1 / value2;
};
numbertools_Tools.lerp = function(min,max,ratio) {
	return min + ratio * (max - min);
};
numbertools_Tools.dotProduct = function(ax,ay,bx,by) {
	return ax * bx + ay * by;
};
numbertools_Tools.factorial = function(value) {
	if(value < 2) return 1;
	return value * numbertools_Tools.factorial(value - 1);
};
numbertools_Tools.vectorLength = function(dx,dy) {
	return Math.sqrt(dx * dx + dy * dy);
};
numbertools_Tools.fibonacci = function(i) {
	if(i == 1 || i == 2) return 1; else if(numbertools_Tools.sequence.length - 1 < i) {
		while(numbertools_Tools.sequence.length < i) numbertools_Tools.sequence.push(numbertools_Tools.sequence[numbertools_Tools.sequence.length - 1] + numbertools_Tools.sequence[numbertools_Tools.sequence.length - 2]);
		return numbertools_Tools.sequence[numbertools_Tools.sequence.length - 1];
	} else return numbertools_Tools.sequence[i - 1];
};
numbertools_Tools.fibonacciSequence = function(toPos) {
	if(numbertools_Tools.sequence.length - 1 < toPos) {
		numbertools_Tools.fibonacci(toPos);
		return numbertools_Tools.sequence;
	} else if(numbertools_Tools.sequence.length - 1 == toPos) return numbertools_Tools.sequence; else return numbertools_Tools.sequence.slice(0,toPos);
};
numbertools_Tools.resetFibSequence = function() {
	numbertools_Tools.sequence = [1,1];
};
numbertools_Tools.floatInArray = function(number,array) {
	return Lambda.has(array,number);
};
numbertools_Tools.intInArray = function(number,array) {
	return Lambda.has(array,number);
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
numbertools_Tools.sequence = [1,1];
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
