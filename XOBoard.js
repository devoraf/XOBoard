'use strict';

var player = 1;
var lineColor = "#ddd"; //gray
var areaColor = "#fff"; //white
var xColor = "#f1be32"; //mustard
var oColor = "#01bBC2"; //turquoise
var dimention = 3;

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 500;
var sectionSize = canvasSize / dimention;
canvas.width = canvasSize;
canvas.height = canvasSize;
//context.translate(0.5, 0.5);

/** Set board dimentions according to user input **/
function setDimentions() {

  var newDimention = document.getElementById("dimention").value;
  if (newDimention == 0) {
    //alert("Please enter dimentions")
    document.getElementById('alert').style.display="inline";
    document.getElementById('msgDimentions').style.display="inline";
    document.getElementById('msgDrawn').style.display="none";
  } else {
    dimention = newDimention;
    //getInitialBoard("");
    context.clearRect(0, 0, canvas.width, canvas.height);
    sectionSize = canvasSize / dimention;
    drawLines(10, lineColor);
    player = 1;
  }
}

/*
function getInitialBoard (defaultValue) {
  var board = [];

  for (var x = 0;x < dimention;x++) {
    board.push([]);

    for (var y = 0;y < dimention;y++) {
      board[x].push(defaultValue);
    }
  }

  return board;
}

var board = getInitialBoard("");
*/

/** Draw X or O on selected cell according to mouse position **/ 
function addPlayingPiece (mouse) {
  var xCordinate;
  var yCordinate;

  for (var x = 0;x < dimention;x++) {
    for (var y = 0;y < dimention;y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
          mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
          mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
        ) {
        
          //check if cell is already drawn
          if (isDrawnOn(xCordinate + 15, yCordinate + 15)) {
            //alert ("This cell is already drawn. Choose another one.");
            document.getElementById('alert').style.display="inline";
            document.getElementById('msgDrawn').style.display="inline";
            document.getElementById('msgDimentions').style.display="none";
            return false;
            
          } else {
            clearPlayingArea(xCordinate, yCordinate);
            if (player === 1) 
              drawX(xCordinate, yCordinate);
            else
              drawO(xCordinate, yCordinate);
            return true;
          }
      }
    }
  }
}

/** Check if cell is already drawn with X or O **/
function isDrawnOn(x, y) {
  var imageData = context.getImageData(x, y, sectionSize - 20, sectionSize - 20);
  var data = imageData.data;
  var result = null;
  var counter = 0;
  var last = data.length - 1;
  for (var i = 0; i < data.length; i++) {
      if (i === last && counter !== 0 && counter === last) {
          result = false;
          break;
      } else if (data[i] !== 0 && data[i] > 0) {
          result = true;
          break;
      } else {
          counter++;
          continue;
      }
  }
  return result;
}

/** Clear selected cell **/
function clearPlayingArea (xCordinate, yCordinate) {
  context.fillStyle = areaColor;
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  ); 
}

/** Draw O **/
function drawO (xCordinate, yCordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  //var radius = (sectionSize - 100) / 2;
  var radius = sectionSize / dimention;  
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = oColor;
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

/** Draw X **/
function drawX (xCordinate, yCordinate) {
  context.strokeStyle = xColor;

  context.beginPath();
  
  var offset = (dimention == 6 ? 30 : 35);
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
}

/** Draw board grid lines **/
function drawLines (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  // Horizontal lines 
  for (var y = 1;y <= dimention - 1;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }
   
  // Vertical lines 
  for (var x = 1;x <= dimention - 1;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

drawLines(10, lineColor);

/** Get mouse position **/
function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mouseup', function (event) {
  var canvasMousePosition = getCanvasMousePosition(event);
  if (addPlayingPiece(canvasMousePosition)) {
    if (player === 1) {
      player = 2;
    } else {
      player = 1;
    }
    drawLines(10, lineColor);
  }
});