var ros = new ROSLIB.Ros({
    url : 'ws://10.129.141.97:9090'
  });

  ros.on('connection', function() {
    console.log("Connected");
  });

  ros.on('error', function(error) {
    console.log("Error");
  });

  ros.on('close', function() {
    console.log("Closed");
  });

  function float2int (value) {
    return value | 0;
}

  var Scout_status = new ROSLIB.Topic({
    ros : ros,
    name : '/scout_status',
    messageType :'scout_msgs/ScoutStatus'
  });

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
  });

  Scout_status.subscribe(function(message) {
    console.log(typeof(message.linear_velocity));
    document.getElementById("linear_v").innerHTML=message.linear_velocity;
    document.getElementById("angular_v").innerHTML=message.angular_velocity;
    var bat_voltage = float2int(message.battery_voltage);
    document.getElementById("battery_voltage").innerHTML= bat_voltage + ' [V]';
  });

  //function: execute when elements on page are loaded
  window.onload = function() {
    var Joy = new JoyStick("JoyContainer", {},function(stickData) {
      let y = stickData.x/100;
      let x = stickData.y/100;

      Move(x,y,0,0,0,0);
    });
  }

  var leftbtn;
  var rightbtn;

  function StartLeft(){
    leftbtn=setInterval(function() {
      Move(0,0,0,0,0,0.25);
    }, 100);
  }
  function EndLeft(){
    clearInterval(leftbtn);
  }

  function StartRight(){
    rightbtn=setInterval(function() {
      Move(0,0,0,0,0,-0.25);
    }, 100);
  }
  function EndRight(){
    clearInterval(rightbtn);
  }

  function Move(lx,ly,lz,ax,ay,az){
    console.log(lx+" "+ly+" "+lz+" "+ax+" "+ay+" "+az);
    var twist = new ROSLIB.Message({
        linear : {
          x : lx,
          y : ly,
          z : lz
        },
        angular : {
          x : ax,
          y : ay,
          z : az
        }
      });

      cmdVel.publish(twist);
  }
