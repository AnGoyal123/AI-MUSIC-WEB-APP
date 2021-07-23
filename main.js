peterPan_song="";
harryPoter_song="";

scoreRightWrist = "";
scoreLeftWrist = "" ;

rightWristX = "";
rightWristY = "";

leftWristX = "";
leftWristY = "";

function preload(){
    peterPan_song= loadSound("music.mp3");
    harryPoter_song= loadSound("music2.mp3")
}

function setup(){
    canvas = createCanvas(500 , 450);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose' , gotPoses)
}

function modelLoaded(){
    console.log("PoseNet is Initialized!")
}

function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + " scoreRightWrist = " + scoreRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X= "+ rightWristX +" Right Wrist Y = "+ rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X= "+ leftWristX +" Left Wrist Y = "+ leftWristY);
    }
}

function draw(){
    image(video , 0, 0, 500, 450)

    peterPan_song_status= peterPan_song.isPlaying()

    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        harryPoter_song.stop();
        if(peterPan_song_status == "false"){
            peterPan_song.play();
            document.getElementById("song_name").innerHTML = "Song Name = Peter Pan Song"
        }
    }


    harryPoter_song_status= harryPoter_song.isPlaying()

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX , rightWristY , 20);
        peterPan_song.stop();
        if(harryPoter_song_status == "false"){
            harryPoter_song.play();
            document.getElementById("song_name").innerHTML = "Song Name = Harry Poter Theme Song"
        }
    }
}