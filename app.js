
  var name = "";
 var destination = "";
 var frequency = "";
 var nextArrival = "";
 var firstTime = "";
 var minAway = "";



  $("#submit").on("click", function() {

    name = $("#trainName").val().trim();
   destination = $("#destination").val().trim();
   frequency = $("#frequency").val().trim();
   firstTime = $("#firstTrainTime").val().trim();


   $('#trainName').val("");
   $('#destination').val("");
   $('#firstTrainTime').val("");
   $('#frequency').val("");

   //firstTime = moment($("#first-time").val().trim(),"HH:mm").format("X");
   //figure out moment.js and have it convert.
   convertedStartTime = moment(firstTrainTime,'HH:mm');
   //Time difference from current time to first train time.
   var timeDiff = moment().diff(moment(convertedStartTime),'minutes');
   //This is the # of total trains that went till the next train after the current time. this is used to find out how many more min till next train from first train.
   var nextTrain = roundUp(timeDiff/parseFloat(frequency),1);
   //This minute is from first train min till the next train.
   var minTillNextTrain = nextTrain*parseFloat(frequency);
   //adding the first train time and the minute till next train will give you the next train time. This is an object.
   nextTrainTime = convertedStartTime.add(minTillNextTrain,'m');
   //This formating will give you actual PM or AM time of the time of next arrival.
   nextArrival = nextTrainTime.format("LT");
   //just subtracted the next arrival time to current time, and return the minute.
   minAway = moment(nextTrainTime).diff(moment(),'minutes');

   //consoling everything so I can track what i'm coding.
   console.log("firstTime",convertedStartTime);
   console.log("timeDiff",timeDiff);
   console.log("nextTrain",nextTrain);
   console.log("minTillNextTrain",minTillNextTrain);
   console.log("nexttraintime",nextTrainTime);
   console.log("nextArrival",nextArrival);
   console.log("minaway",minAway);



   database.ref().push({
     name: name,
     destination: destination,
     frequency: frequency,
     nextArrival: nextArrival,
     minAway : minAway,
   });

   //Don't refresh the page!
   return false;

 });

 database.ref().on("child_added", function(childSnapshot) {
   //log everything that's coming out of snapshot
   console.log(childSnapshot.val().name);
   console.log(childSnapshot.val().destination);
   console.log(childSnapshot.val().frequency);
   console.log(childSnapshot.val().nextArrival);
   console.log(childSnapshot.val().minAway);


   //full list of item to the well

   $("#tbody").append("<tr><td> " + childSnapshot.val().name +
     " </td><td> " + childSnapshot.val().destination +
     " </td><td id=''> " + childSnapshot.val().frequency +
     " </td><td>" + childSnapshot.val().nextArrival + "</td><td id=''> " + childSnapshot.val().minAway + " </td></tr>");

     //this handle the error
 }, function(errorObject){
   console.log("Errors handled: "+errorObject.code);
 });

//round up function from stack overflow.
 function roundUp(num, precision) {
   return Math.ceil(num * precision) / precision
 };
  	
