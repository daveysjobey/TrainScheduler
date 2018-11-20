
  var config = {
    apiKey: "AIzaSyDnx0Hv4Dx-l3a3edLrWdbMBhvi38Gr7Tc",
    authDomain: "train-schedule-d.firebaseapp.com",
    databaseURL: "https://train-schedule-d.firebaseio.com",
    projectId: "train-schedule-d",
    storageBucket: "train-schedule-d.appspot.com",
    messagingSenderId: "129162399859"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();  

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#Train-name-input").val().trim();
  var trainDes = $("#Destination-input").val().trim();
  var trainStart =$("#start-input").val().trim();
  var trainRate = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    dest: trainDes,
    start: trainStart,
    rate: trainRate,
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  $("#Train-name-input").val("");
  $("#Destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    
    var trainName = childSnapshot.val().name;
    var trainDes = childSnapshot.val().dest;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
   
    var trainTime = moment(trainStart, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = currentTime.diff(moment(trainTime),"minutes")

    var remainder = diffTime % trainRate;

    var minutesTillTrain = trainRate - remainder;

    var nextTrain = currentTime.add(minutesTillTrain, "minutes");
    
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDes),
      $("<td>").text(trainRate+" min"),
      $("<td>").text(moment(nextTrain).format("HH:mm")),
      $("<td>").text(minutesTillTrain+" min"),
    
    );
  
    
    $("#employee-table > tbody").append(newRow);
  });









