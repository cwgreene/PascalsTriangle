(function pascals_triangle () {

	function rgb(r,g,b){
		return "rgb("+[r,g,b].join(",")+")";
	}
	
	function colors(n,mod){
		var value = Math.round(n*255/mod);
		var red = ~~(value*.7);
		var green= ~~(value*.7);
		var blue = ~~(value);

		return rgb(red,green,blue);
	}
	
	function draw_rectangle(row,column,color) {
		
		var scale = canvas.height/rows;
		var middle = canvas.width/2;
		var offset = column - row/2;
		var x = middle+offset;
		var y = row;

		var posx= middle+scale*offset;
		var posy= scale*y;

		context.fillStyle=color;
		context.fillRect(posx,posy,scale,scale);
	}

	function draw_triangle(rows,mod) {
		var n = 1;
		var k = 0;
		//Start things off by drawing the centered 1
		var value = 1 % mod;
		draw_rectangle(n,k,colors(value,mod));

		var prev_row = [0,1,0];
		for(var cur_row = 2; cur_row <= rows; cur_row++) {
			var this_row = [0];
			for(var i =0, len = prev_row.length - 1; i < len;i++) {
				this_row[i+1] = (prev_row[i]+prev_row[i+1] )%mod;
				value = this_row[i+1];
				draw_rectangle(cur_row,i,colors(value,mod));
			}
			this_row[i+1]=0;
			prev_row = this_row;
		}
	}

	function getParams(url) {
		var substring = url.substr(url.lastIndexOf("?")+1,url.length);
		var valuepairs = substring.split("&");
		var result = {};
		console.log(valuepairs);
		for(var i = 0; i < valuepairs.length;i++) {
			var pairarray = valuepairs[i].split("=");
			var key = pairarray[0];
			var value = pairarray[1];
			result[key] = value;
		}
		return result;
	}

	var canvas = document.getElementById("pascalcanvas");
	var context = canvas.getContext("2d");

	var url=document.URL;

	var params = getParams(url);
	var rows = ~~params.rows;
	var mod = ~~params.mod;

	document.getElementById("footer").innerText=(
		"Pascal's Triangle Modulo "+mod);

	draw_triangle(rows,mod);
})();
