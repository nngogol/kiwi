// html stuff
let off_slider;
let off_slider_paragraph;
let roff_slider;
let roff_slider_paragraph;
let color_slider
let color_slider_paragraph;

// function makeSlider(min,max,curr,step,text,parent){
	
// 	// label
// 	my_slider_paragraph = createP(text)
// 	my_slider_paragraph.parent(parent)
	
// 	// slider
// 	my_slider = createSlider(min,max,curr,step)
// 	my_slider.parent(parent)
	
// 	// on change EVENT
// 	let my_changed = () => {
// 		my_slider_paragraph.html(`${text} = ` + my_slider.value())
// 	}
// 	my_slider.input(my_changed)
// 	my_changed()
// }

function setupHTML_sliders(){
	// first slider
	// min = 0
	// max = 6.28
	// current = 6.2
	// step = 0.01
	off_slider_paragraph = createP('off')
	off_slider = createSlider(0, 2*Math.PI, 6.2, .01)
	let off_changed = () => {

		off = off_slider.value()
		off_slider_paragraph.html('off = ' + off_slider.value())
		history_trail.length=0
	}
	off_slider.input(off_changed)
	off_changed()

	// second slider:
	// min = 0
	// max = 3.1415
	// current = 2.5
	// step = 0.01
	createP('roff')
	roff_slider_paragraph = createP('r_off')
	roff_slider = createSlider(0, Math.PI, 2.5, .01)
	let roff_changed = () => {

		roff = roff_slider.value()
		roff_slider_paragraph.html('roff = ' + roff_slider.value())
		history_trail.length=0
	}
	roff_slider.input(roff_changed)
	roff_changed()

	// third slider:
	// min = 1
	// max = 100
	// current = 10
	// step = 1
	createP('color')
	color_slider_paragraph = createP('color')
	color_slider = createSlider(1, 100,8,1)
	let color_changed = () => {

		color = color_slider.value()
		color_slider_paragraph.html('color = ' + color_slider.value())
	}
	color_slider.input(color_changed)
	color_changed()

	// a.k.a. <br>, but blank <p>
	createP('')
	
}
function setup(){
	setupHTML_sliders()
	createCanvas(500, 500);
}


// 
// important thing 1
let r = 5
let roff = .1

// important thing 2
let x_changer = 0
let y_changer = 0
// and these guys
let off = Math.PI/13
let xoff = off
let yoff = off

// all poits
let history_trail = []


function draw(){
	colorMode(RGB)
	background(55)
	translate(width/2,height/2) // place at center
	scale(3) 					// make it bigger
	pretty()


	// for memory and beauty of flower 
	if (history_trail.length > 800) {
		// history_trail.splice(0,history_trail.length) // redraw
		history_trail.splice(0,1) 				// delete last
	}

	// important event
	r += roff
	if (r > 55 || r < 0) {
		roff*=-1
		if (r > 55) r = 55
		if (r < 0 ) r = 0
		// delete half of history_trail
		history_trail.splice(history_trail.length,1000)
	}

	x_changer += off
	y_changer += off

	let my_point = {
		"x":r * sin(x_changer),
		"y":r * cos(y_changer)
	}
	
	colorMode(HSL)
	history_trail.push(my_point)
	history_trail.map(p => {
		
		let col = abs(dist(p.x,p.y, 0,0))*color_slider.value()
		stroke(col%300, 100,50)
		ellipse(p.x,p.y,2,2)
	})
	colorMode(RGB)

	// draw little circle
	draw_Cirle_At_Center()
	
}

function pretty() {
	fill(0,255,250)             // fill
	strokeWeight(1)             // small black storke
	stroke(0)
}
function draw_Cirle_At_Center() {
	noFill()
	stroke(255)
	strokeWeight(.1)
	ellipse(0,0,8,8)
}