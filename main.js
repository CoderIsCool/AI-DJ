song = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
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
        console.log(results);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist x = "+leftWrist_x + " Left Wrist y =  "+leftWrist_y);
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist x = "+rightWrist_x + " Right Wrist y = "+rightWrist_y);
    }
}