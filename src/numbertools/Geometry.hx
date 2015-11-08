package numbertools;

import numbertools.Tools;

#if flash
import flash.geom.Point;
#end

@:expose
class Geometry {

	// Convert a Float representing an angle in Degrees to a Float representing an angle in Radians
	public static function degreesToRadians(deg:Float):Float {
		return deg * (Math.PI / 180);
	}

	// Convert a Float representing an angle in Radians to a Float representing an angle in Degrees
	public static function radiansToDegrees(rad:Float):Float {
		return rad * (180 / Math.PI) + 180;
	}

	// Return the angle of a line in Radians
	public static function getAngleR(x1:Float, y1:Float, x2:Float, y2:Float):Float {
		var dx:Float = x2 - x1;
		var dy:Float = y2 - y1;

		return Math.atan2(dy, dx);
	}

	// Returns the angle of a line in Degrees
	public static function getAngleD(x1:Float, y1:Float, x2:Float, y2:Float):Float {
		var d:Float = radiansToDegrees(getAngleR(x1, y1, x2, y2));
		return d;
	}

	// Returns the Area of a Rectangle
	public static function areaOfRectangle(width:Float, height:Float):Float {
		return width * height;
	}

	// Returns the Area of a perfect Circle, no Ellipses!
	public static function areaOfCircle(radius:Float):Float {
		return Math.PI * (radius * radius);
	}

	// Returns the area of an Elipse
	public static function areaOfElipse(bigRadius:Float, smallRadius:Float):Float {
		return Math.PI * (bigRadius * smallRadius);
	}

	// area of a right angle triangle
	// where a and b are the lengths of two lines at right angles to each other
	public static function areaOfRightTriangle(a:Float, b:Float):Float {
		return (a * b) / 2;
	}

	// Returns the Area of a Triangle
	// base = pick a side
	// perpHaight = length to the top of the triangle, at a right angle to the base
	public static function areaOfTriangle(base:Float, perpHeight:Float):Float {
		return (0.5 * base) * perpHeight;
	}

	/*
		
		Flash Specific Stuff 

	*/

	#if flash
	// Returns the distance between 2 points in the same coordinate space
	public static function distanceBetween(firstPos:Point, secondPos:Point):Float {
		var dx:Float = firstPos.x - secondPos.x;
		var dy:Float = firstPos.y - secondPos.y;

		return Tools.vectorLength(dx, dy);
	}

	// Finds the point along a line segment that is closest to a given point in 2D space 
	// Adapted from code I found on Stack Overflow
	// http://stackoverflow.com/questions/3120357/get-closest-point-to-a-line 
	public static function closestPointOnLine(a:Point, b:Point, p:Point, ?toInfinity:Bool = false):Point {
		var aToP = [p.x - a.x, p.y - a.y]; // store the vector A > P
		var aToB = [b.x - a.x, b.y - a.y]; // store the vector A > B

		var atb2 = (aToB[0] * aToB[0]) + (aToB[1] * aToB[1]); // Find the squared magnitude of A > B
		var atp_dot_atb = Tools.dotProduct(aToP[0], aToP[1], aToB[0], aToB[1]); // the dot product of A > P and A > B
		var t = atp_dot_atb / atb2; // the normalised "distance" from a to the closest point 

		// extend the line out to infinity? 
		if(!toInfinity) {
			t = Tools.clamp(t, 0, 1);
		}

		return new Point(a.x + aToB[0] * t, a.y + aToB[1] * t); // add the distance to A, moving towards B
	}
	#end

}