song = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
ScoreLeftWrist = 0;
ScoreRightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modalloaded);
    poseNet.on('Poses', gotPoses);
}
function draw()
{
    image(video, 0,0,600,500);

    fill("#ff4291");
    stroke("#5dbfcf");

    if(ScoreLeftWrist > 0.2)
    {
    circle(leftWrist_x, leftWrist_y, 25);
    Count = Number(leftWrist_y);
    RemoveDecimals = floor(Count);
    Sound = RemoveDecimals/1000;

    if(ScoreRightWrist > 0.2)
    {
    circle(rightWrist_x, rightWrist_y, 25);

    volume = Sound * 2;
    document.getElementById("volume_h3").innerHTML = "Volume is: "+volume;
    song.setVolume(volume);
    }
    if(rightWrist_y > 0 && rightWrist_y <= 100)
    {
        document.getElementById("speed_h3").innerHTML = "Speed is: 0.5x ";
        song.rate(0.5);
    }else if(rightWrist_y > 100 && rightWrist_y <= 200)
    {
        document.getElementById("speed_h3").innerHTML = "Speed is: 1x ";
        song.rate(1);
    }else if(rightWrist_y > 200 && rightWrist_y <= 300)
    {
        document.getElementById("speed_h3").innerHTML = "Speed is: 1.5x ";
        song.rate(1.5);
    }else if(rightWrist_y > 300 && rightWrist_y <= 400)
    {
        document.getElementById("speed_h3").innerHTML = "Speed is: 2x ";
        song.rate(2);
    }else if(rightWrist_y > 400)
    {
        document.getElementById("speed_h3").innerHTML = "Speed is: 2.5x ";
        song.rate(2.5);
    }
}
}
function play()
{
    song.play();
    song.rate(1);
    song.setVolume(0.7);
}
function modalloaded()
{
    console.log("Modal has been initiated");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(ScoreLeftWrist+ "Score of Left Wrist is: ");

        console.log(results);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist x = "+leftWrist_x + " Left Wrist y =  "+leftWrist_y);
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist x = "+rightWrist_x + " Right Wrist y = "+rightWrist_y);

        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(ScoreRightWrist+ "Score of Right Wrist: ");

    }
}