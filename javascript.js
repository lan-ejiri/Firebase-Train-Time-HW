$(document).ready(function () {
    // //initializing firebase
    // var config = {
    //     apiKey: "AIzaSyCOSrisKETIrxgYarJC6dGdyZvY-8nAlT8",
    //     authDomain: "train-time-hw-le.firebaseapp.com",
    //     databaseURL: "https://train-time-hw-le.firebaseio.com",
    //     projectId: "train-time-hw-le",
    //     storageBucket: "",
    //     messagingSenderId: "207781423415"
    // };
    // firebase.initializeApp(config);

    // //defining databse
    // var database = firebase.database();

    var initialTrainData = [
        {
            trainName: "Trenton Express",
            destination: "Trenton",
            frequency: 25,
            // nextArrival: HH:mm,
        }

    ];

    //console.log(initialTrainData);

    $("#submit-input").on("click",function() {

        event.preventDefault();
        var trainNameInput = $("#train-name-input").val();
        var destInput = $("#dest-input").val().trim();
        var freqInput = parseInt($("#frequency-input").val().trim());
        var firstTrainInput = $("#first-train-input").val().trim();
        console.log(trainNameInput);
        // var newTrain = {
        //     trainName: trainNameInput,
        //     destination: destInput,
        //     frequency: freqInput,
        //     nextArrival: firstTrainInput
        // };

        // var newTrainData = initialTrainData.push(newTrain);

        // console.log(newTrainData);

        //$("#tbody").


    }); //closing submit button on click function







}); //document ready closing
