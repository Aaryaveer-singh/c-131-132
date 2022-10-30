img="";
model_status="";
objects=[];

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    object_detector=ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(img,0,0,640,420);
    if(model_status!=""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: object detected";
            textSize(20);
            fill("red");
            text(objects[i].label,objects[i].x,objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        document.getElementById("number").innerHTML="number of objects:"+ objects.length;
    }
    // textSize(20);
    // fill("red");
    // text("Dog",45,75);
    // noFill();
    // stroke("blue");
    // rect(30,60,450,350);
    // fill("blue");
    // text("cat",400,100);
    // noFill();
    // rect(320,80,200,300);
}

function model_loaded(){
    console.log("model loaded successfully");
    model_status=true;
    object_detector.detect(img,get_results);
}

function get_results(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}