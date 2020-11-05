let bg;

function preload(){
    sound = loadSound('on_and_on.mp3');
    bg = loadImage('img/room.jpg');
  }
  
  function setup(){
    let cnv = createCanvas(1000,1000);
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT();
    sound.amp(0.2);
    
  }
  
  function draw(){
    background(bg);
  
    let spectrum = fft.analyze();
    noStroke();
    fill(0, 255, 60);
    for (let i = 0; i< spectrum.length; i++){
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      rect(x, height, width / spectrum.length, h )
    }
  
    let waveform = fft.waveform();
    fill(0, 255, 255);
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++){
      let x = map(i, 0, waveform.length, 0, width);
      let y = map( waveform[i], -1, 1, 0, height);
      vertex(x,y);
    }
    endShape();
  
    text('tap to play', 20, 20);
  }
  
  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop();
    }
  }