var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
draw();

function draw() {
	drawFliegerB();
}

function drawFliegerB() {
	
	//Lume color (later will make this change from white to green/blue) #007755
	let lume = "#ffffff";
	
	//Center the drawing on the canvas
	ctx.translate(canvas.width/2, canvas.height/2);
	
	//Face (black circle)
	ctx.arc(0, 0, canvas.height/4, 0 , 2 * Math.PI);
	ctx.fillStyle = "#222222";
	ctx.fill();
  
	//Chapter ring
	var outerRadius = canvas.height/4;
	var innerRadius = canvas.height/5;
	for (var value = 0; value <= 60; value += 1) {
		// scale the minute marker values (0-60 seconds)
		// to fit into the range of a circle (0-360 degrees)
		var scaledValue = scaleIntoRange(0, 60, 0, 360, value);
		// rotate so guageValue==0 starts at 0 degrees on the circle
		var degrees = scaledValue + 0;

		// draw the radiant line
		// draw thicker/longer line every 5
		if (value % 5 == 0) {
			radiantLine(0, 0, outerRadius, innerRadius, degrees, outerRadius/20, lume); //outerRadius/20 defines the line width
		} else {
			var shorterLine = (innerRadius - outerRadius) / 2;
			radiantLine(0, 0, outerRadius, innerRadius - shorterLine, degrees, outerRadius/40, lume);
		}
	}	
	function radiantLine(centerX, centerY, innerRadius, outerRadius, degrees, linewidth, color) {
		var radians = degrees * Math.PI / 180;
		var innerX = centerX + innerRadius * Math.cos(radians);
		var innerY = centerY + innerRadius * Math.sin(radians);
		var outerX = centerX + outerRadius * Math.cos(radians);
		var outerY = centerY + outerRadius * Math.sin(radians);

		ctx.beginPath();
		ctx.moveTo(innerX, innerY);
		ctx.lineTo(outerX, outerY);
		ctx.strokeStyle = color;
		ctx.lineWidth = linewidth;
		ctx.stroke();
	}
	function scaleIntoRange(minActual, maxActual, minRange, maxRange, value) {
		var scaled = (maxRange - minRange) * (value - minRange) / (maxActual - minActual) + minRange;
		return (scaled);
	}
	
	//Numbers (outer)
	var ang;
	var num;
	ctx.font = canvas.height/22 + "px arial"; //Number size + font
	ctx.fillStyle = lume;
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for(num = 1; num <= 11; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -canvas.height/6);
    ctx.rotate(-ang);
    ctx.fillText(5*num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, canvas.height/6);
    ctx.rotate(-ang);
	}
	
	//Numbers (inner)
	var ang2;
	var num2;
	ctx.font = canvas.height/30 + "px arial"; //Number size + font
	ctx.fillStyle = lume;
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for(num2 = 1; num2 <= 12; num2++){
    ang2 = num2 * Math.PI / 6;
    ctx.rotate(ang2);
    ctx.translate(0, -canvas.height/10);
    ctx.rotate(-ang2);
    ctx.fillText(num2.toString(), 0, 0);
    ctx.rotate(ang2);
    ctx.translate(0, canvas.height/10);
    ctx.rotate(-ang2);
  }
	
	//Inner number ring
	ctx.beginPath();
	ctx.arc(0, 0, canvas.height/8, 0, 360, false);
	ctx.strokeStyle = lume;
	ctx.lineWidth = canvas.height/150;
	ctx.stroke();
	
	//Arrow
	ctx.beginPath();
	//ctx.rotate(-90);
	ctx.moveTo(0, -canvas.height/8);
	ctx.lineTo(0, -canvas.height/6.5);
	ctx.strokeStyle = lume;
	ctx.lineWidth = canvas.height/150;;
	ctx.stroke();
	
	ctx.beginPath();
    ctx.moveTo(0, -canvas.height/5.5);
    ctx.lineTo(canvas.height/60, -canvas.height/6.5);
    ctx.lineTo(-canvas.height/60, -canvas.height/6.5);
    ctx.lineTo(0, -canvas.height/5.5);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = lume;
    ctx.lineWidth = canvas.height/150;;
    ctx.stroke();
}