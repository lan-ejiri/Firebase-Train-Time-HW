$(document).ready(function () {

    //initializing firebase
    var config = {
        apiKey: "AIzaSyCOSrisKETIrxgYarJC6dGdyZvY-8nAlT8",
        authDomain: "train-time-hw-le.firebaseapp.com",
        databaseURL: "https://train-time-hw-le.firebaseio.com",
        projectId: "train-time-hw-le",
        storageBucket: "",
        messagingSenderId: "207781423415"
    };
    firebase.initializeApp(config);

    //defining databse
    var database = firebase.database();

    //stores all initial train data
    var trainData = [
        {
            trainName: "Trenton Express",
            destination: "Trenton",
            freq: 25,
            first: "07:00",
        },
        {
            trainName: "Oregon Trail",
            destination: "Salem, Oregon",
            freq: 3600,
            first: "13:00",
        },
        {
            trainName: "Midnight Carriage",
            destination: "Philadelphia",
            freq: 15,
            first: "17:00",
        },
        {
            trainName: "Sing Sing Caravan",
            destination: "Atlanta",
            freq: 45,
            first: "17:00",
        }

    ];

    //shove everything into firebase
    database.ref().push({
        trainshit: trainData,
    });

    //upon clicking submit button, (grabs all input values, stores the data into object, pushes the object into array, and updates firebase)
    $("#submit-input").on("click", function () {

        //prevents page from refreshing every time
        event.preventDefault();

        //grabbing input values
        var trainNameInput = $("#train-name-input").val();
        var destInput = $("#dest-input").val().trim();
        var freqInput = parseInt($("#frequency-input").val().trim());
        var firstTrainInput = $("#first-train-input").val().trim();

        //put all the inputs into a new object
        var newTrain = {
            trainName: trainNameInput,
            destination: destInput,
            freq: freqInput,
            first: firstTrainInput
        };

        //push the new object into the existing array
        trainData.push(newTrain);
        console.log(trainData);
        //update the firebase database
        database.ref().update({
            trainshit: trainData,
        });
        $("#first-train-input").val('');
        $("#train-name-input").val('');
        $("#destn-input").val('');
        $("#frequency-input").val('');



    }); //closing submit button on click function

    // At the initial load and subsequent value changes, get a snapshot of the stored data.
    // This function allows you to update your page in real-time when the firebase database changes.
    database.ref().on("value", function (snapshot) {

        if (snapshot.child("trainshit").exists()) {
            var trainshitvar = snapshot.val().trainshit;
            displayTable(trainshitvar);
        }

        // If any errors are experienced, log them to console. 
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    function displayTable(array) {
        $("#tbody").empty();

        //for every value in the firebase data CHANGE THE VALUE
        for (i = 0; i < array.length; i++) {
            console.log(array);
            //grabbing freq, first train time value from firebase data
            var tFrequency = parseInt(array[i].freq);
            var firstTime = array[i].first;

            //making it one day earlir to make sure the first time comes before 
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "day");

            //reformat current time, find the difference between now and first train
            var currentTime = moment().format("HH:mm");
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

            //take the remainder blahblah to find the next train time and minutes til next train
            var tRemainder = diffTime % tFrequency;
            var tMinutesTillTrain = tFrequency - tRemainder;
            var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

            //filling in the table
            var tRow = $("<tr>");
            var trainTd = $("<td>").text(array[i].trainName);
            var destTd = $("<td>").text(array[i].destination);
            var freqTd = $("<td>").text(tFrequency);
            var nextTd = $("<td>").text(nextTrain);
            var minsTd = $("<td>").text(tMinutesTillTrain);
            tRow.append(trainTd, destTd, freqTd, nextTd, minsTd);
            $("#tbody").append(tRow);
        }
    }

}); //document ready closing
