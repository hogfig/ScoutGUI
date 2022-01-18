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
    console.log('Received message on ' + Scout_status.name + ': ' + message.data);
    Scout_status.unsubscribe();
  });