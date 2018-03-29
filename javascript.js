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

    var trainData = [
        {
            trainName: "Trenton Express",
            destination: "Trenton",
            frequency: 25,
            nextArrival: "17:35",
        },
        {
            trainName: "Oregon Trail",
            destination: "Salem, Oregon",
            frequency: 3600,
            nextArrival: "13:39",
        },
        {
            trainName: "Midnight Carriage",
            destination: "Philadelphia",
            frequency: 15,
            nextArrival: "17:35",
        },
        {
            trainName: "Sing Sing Caravan",
            destination: "Atlanta",
            frequency: 45,
            nextArrival: "17:53",
        }

    ];

    //console.log(initialTrainData);

    $("#submit-input").on("click", function () {

        event.preventDefault();
        var trainNameInput = $("#train-name-input").val();
        var destInput = $("#dest-input").val().trim();
        var freqInput = parseInt($("#frequency-input").val().trim());
        var firstTrainInput = $("#first-train-input").val().trim();
        console.log(trainNameInput);

        var newTrain = {
            trainName: trainNameInput,
            destination: destInput,
            frequency: freqInput,
            nextArrival: firstTrainInput
        };

        var newTrainData = trainData.push(newTrain);


    }); //closing submit button on click function

    function displayTable() {
        //clear it out first
        $("#tbody").empty();

        for (i = 0; i < trainData.length; i++) {
            var tRow = $("<tr>");

            var trainTd = $("<td>").text(trainData[i].trainName);
            var destTd = $("<td>").text(trainData[i].destination);
            var freqTd = $("<td>").text(trainData[i].frequency);
            var nextTd = $("<td>").text(trainData[i].nextArrival);

            tRow.append(trainTd, destTd, freqTd, nextTd);
            $("#tbody").append(tRow);

        }


    }//closing displaytable


displayTable();


}); //document ready closing
