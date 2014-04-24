/**
 * Created by jeastburn on 4/23/14.
 */
var howOften = 50;
var slowDown = 100;
var current = 1;
var speedRightRotation = 0;
var speedLeftRotation = 0;
var rightRotationSpeedConst = "Right rotation speed = ";
var leftRotationSpeedConst = "Left rotation speed = ";
var mouseStartXConst = "mouse start X: ";
var mouseStartYConst = "mouse start Y: ";
var mouseEndXConst = "mouse end X: ";
var mouseEndYConst = "mouse end Y: ";

var items = new Array();
var rotateRightQueue = new Array();
var rotateLeftQueue = new Array();
var rotateRightSlowQueue = new Array();
var rotateLeftSlowQueue = new Array();

var showSlowDownPictures = 0;

var mouseStartX = 0;
var mouseStartY = 0;

var drill = '';



for (var i = 1; i < 10; i++){
    items[i]="<img src='http://www.thinkgeekspeak.com/images/drill_400-01-0" + i + ".jpg' height='300' width='300'/>";
}
for (var j = 10; j < 37; j++){
    items[j]="<img src='http://www.thinkgeekspeak.com/images/drill_400-01-" + j + ".jpg' height='300' width='300'/>";
}



function increaseLeftRotationSpeedByOne (){
    this.rotateLeft();
    speedLeftRotation++;
    this.showLeftRotationSpeed();
}

function increaseRightRotationSpeedByOne (){
    this.rotateRight();
    speedRightRotation++;
    this.showRightRotationSpeed();
}

function decreaseRightRotationSpeedByOne (){
    for(var i = 0; i < rotateRightQueue.length; i++){
        clearTimeout(rotateRightQueue[i]);
    }
    rotateRightQueue = new Array();

    for (var i = 0; i < speedRightRotation-1; i++){
        this.rotateRight();
    }

    if (speedRightRotation > 0){
        speedRightRotation--;
    }
    showRightRotationSpeed();

}

function decreaseLeftRotationSpeedByOne (){

    for(var i = 0; i < rotateLeftQueue.length; i++){
        clearTimeout(rotateLeftQueue[i]);
    }
    rotateLeftQueue = new Array();

    for (var i = 0; i < speedLeftRotation-1; i++){
        this.rotateLeft();
    }

    if (speedLeftRotation > 0){
        speedLeftRotation--;
    }
    this.showLeftRotationSpeed();
}

function stopAutoRotationLeft (){

    for(var i = 0; i < rotateLeftQueue.length; i++){
        clearTimeout(rotateLeftQueue[i]);
    }
    rotateLeftQueue = new Array();
    speedLeftRotation = 0;
    this.showLeftRotationSpeed();

}

function stopAutoRotationRight (){

    for(var j = 0; j < rotateRightQueue.length; j++){
        clearTimeout(rotateRightQueue[j]);
    }
    rotateRightQueue = new Array();
    speedRightRotation = 0;
    showRightRotationSpeed();

}

function stopAutoRotationEaseRight (){
    var	easeConstants = [];

    if(speedRightRotation === 1){
        easeConstants = [500];
    }
    if(speedRightRotation === 2){
        easeConstants = [500,1000];
    }
    if(speedRightRotation === 3){
        easeConstants = [500,1000,1500];
    }
    if(speedRightRotation === 4){
        easeConstants = [500,1000,1500,2000];
    }
    if(speedRightRotation === 5){
        easeConstants = [500,1000,1500,2000,2200];
    }
    if(speedRightRotation === 6){
        easeConstants = [500,1000,1500,2000,2200, 2600];
    }
    if(speedRightRotation === 7){
        easeConstants = [500,1000,1500,2000,2200,2600,3000];
    }
    for (var i = 0; i< easeConstants.length; i++){
        setTimeout("decreaseRightRotationSpeedByOne()",easeConstants[i]);

        if (i === easeConstants.length-1){
            setTimeout(function(){
                this.rotateRightSlow();
            },easeConstants[i]);
        }
    }

}

function stopAutoRotationEaseLeft (){
    // for (var i = 0; i< speedLeftRotation; i++){
    // 	setTimeout("decreaseLeftRotationSpeedByOne()",1000*i);
    // }
}


function stopAutoRotationLeftAndRight (){
    stopAutoRotationLeft();
    stopAutoRotationRight();
}

function rotateLeft() {
    document.getElementById("drill").innerHTML = items[current];


    if(current===items.length-1){
        current = 1;
    }
    else{
        current++;
    }
    rotateLeftQueue.push(setTimeout("rotateLeft()",howOften));
}

function rotateLeftOne() {
    document.getElementById("drill").innerHTML = items[current];

    if(current===items.length-1){
        current = 1;
    }
    else{
        current++;
    }
    document.getElementById("currentImageNumber").innerHTML = "current image nubmer = " + current;
}

function rotateRightSlow() {
    document.getElementById("drill").innerHTML = items[current];
    showRightRotationSpeed();

    if(current===1){
        current = 36;
    }
    else{
        current--;
    }
    if(showSlowDownPictures < 13){
        rotateRightSlowQueue.push(setTimeout("rotateRightSlow()",slowDown));
        showSlowDownPictures++;
    }
    else{
        for (var i = 0; i < rotateRightSlowQueue.length; i++){
            clearTimeout(rotateRightSlowQueue[i]);
        }
        showSlowDownPictures = 0;
    }
    document.getElementById("currentImageNumber").innerHTML = "current image nubmer = " + current;
    console.log("rotateRightSlow current image :" + current);

}


function rotateRight() {
    document.getElementById("drill").innerHTML = items[current];
    showRightRotationSpeed();

    if(current===1){
        current = 36;
    }
    else{
        current--;
    }
    rotateRightQueue.push(setTimeout("rotateRight()",howOften));
    document.getElementById("currentImageNumber").innerHTML = "current image nubmer = " + current;
    console.log("rotateRight current image :" + current);
}

function rotateRightOne() {
    document.getElementById("drill").innerHTML = items[current];
    showRightRotationSpeed();

    if(current===1){
        current = 36;
    }
    else{
        current--;
    }
    document.getElementById("currentImageNumber").innerHTML = "current image nubmer = " + current;
}



function showRightRotationSpeed(){
    document.getElementById("rightRotationSpeed").innerHTML = rightRotationSpeedConst + speedRightRotation;
}

function showLeftRotationSpeed(){
    document.getElementById("leftRotationSpeed").innerHTML = leftRotationSpeedConst + speedLeftRotation;
}

function showMouseStartX(){
    document.getElementById("mouseStartX").innerHTML = mouseStartXConst + mouseStartX;
}

function showMouseStartY(){
    document.getElementById("mouseStartY").innerHTML = mouseStartYConst + mouseStartY;
}

function showMouseEndX(){
    document.getElementById("mouseEndX").innerHTML = mouseEndXConst + mouseEndX;
}

function showMouseEndY(){
    document.getElementById("mouseEndY").innerHTML = mouseEndYConst + mouseEndY;
}

function getMouseVelocity  (dragObj, previousDragObj){
    var x = dragObj.clientX, new_x,new_y,new_t,
        x_dist, y_dist, interval,velocity,
        y = dragObj.clientY,
        t;
    if (previousDragObj === false) {return 0;}
    t = previousDragObj.time;
    new_x = previousDragObj.clientX;
    new_y = previousDragObj.clientY;
    new_t = Date.now();
    x_dist = new_x - x;
    y_dist = new_y - y;
    interval = new_t - t;
    velocity = Math.sqrt(x_dist*x_dist+y_dist*y_dist)/interval;
    return velocity;
};

function getElementDrill(){
    drill = document.getElementById("drill");
    drill.ondragstart = function() { return false; };
    var self = this;
    drill.onmousedown = function(e){
        mouseStartX = e.x;
        mouseStartY = e.y;
        showMouseStartX();
        showMouseStartY();
        var previousDragObj = false;
        document.onmousemove = function(e){
            e.time = Date.now();
            var velocity;
            velocity = getMouseVelocity( e, previousDragObj);
            previousDragObj = e;
            document.getElementById("velocity").innerHTML="mouse velocity: "+velocity;
            mouseEndX = e.x;
            mouseEndY = e.y;
            showMouseEndX();
            showMouseEndY();
        }
        document.onmouseup = function(e){
            mouseEndX = e.x;
            mouseEndY = e.y;
            self.showMouseEndX();
            self.showMouseEndY();
            document.onmousemove = function(){
                //log();
            };
        }
    }
}

window.onload = getElementDrill;
//window.onmousedown=mousedown;
//window.onmouseup=mouseup;