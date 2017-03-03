$(document).ready(function() {

    var clock = "";
    var num = 10;
    var waiter;

    var wrongs = 0;
    var rights = 0;
    var roundCount = 0;


    var intro = $("<div></div>").addClass("intro");
    var stage = $("<div></div>").addClass("stage");
    var message = $("<div></div>").addClass("message");

    var rounds = [{
        "question": "What is the airspeed velocity of an unladen swallow?",
        "correct_answer": "24 MPH",
        "answers": [
            "15 MPH",
            "20 MPH",
            "24 MPH",
            "200 MPH"
        ]
    }, {
        "question": "Which sign of the zodiac is represented by the Crab?",
        "correct_answer": "Cancer",
        "answers": [
            "Libra",
            "Virgo",
            "Sagittarius",
            "Cancer"
        ]
    }, {
        "question": "What alcoholic drink is mainly made from juniper berries?",
        "correct_answer": "Gin",
        "answers": [
            "Vodka",
            "Gin",
            "Rum",
            "Tequila"
        ]
    }, {
        "question": "What did the Spanish autonomous community of Catalonia ban in 2010, that took effect in 2012?",
        "correct_answer": "Bullfighting",
        "answers": [
            "Bullfighting",
            "Fiestas",
            "Flamenco",
            "Mariachi"
        ]
    }, {
        "question": "What is the name given to Indian food cooked over charcoal in a clay oven?",
        "correct_answer": "Tandoori",
        "answers": [
            "Biryani",
            "Pani puri",
            "Tiki masala",
            "Tandoori"
        ]
    }, {
        "question": "What is the romanized Chinese word for &quot;airplane&quot;?",
        "correct_answer": "Feiji",
        "answers": [
            "Qiche",
            "Zongxian",
            "Feiji",
            "Huojian"
        ]
    }, {

        "question": "Five dollars is worth how many nickles?",
        "correct_answer": "100",
        "answers": [
            "50",
            "25",
            "69",
            "100"
        ]
    }, {

        "question": "When was Nintendo founded?",
        "correct_answer": "September 23rd, 1889",
        "answers": [
            "October 19th, 1891",
            "March 4th, 1887",
            "September 23rd, 1889",
            "December 27th, 1894"
        ]
    }, {

        "question": "According to Sherlock Holmes, &quot;If you eliminate the impossible, whatever remains, however improbable, must be the...&quot;",
        "correct_answer": "Truth",
        "answers": [
            "Answer",
            "Cause",
            "Source",
            "Truth"
        ]
    }, {

        "question": "What is the name of Poland in Polish?",
        "correct_answer": "Polska",
        "answers": [
            "Polska",
            "Pupcia",
            "Polszka",
            "P&oacute;land"
        ]
    }];

    // create intro page with title and start btn
    function createIntro() {

        var title = $("<h1></h1>").html("Play");
        var startBtn = $("<button></button>").addClass("start btn btn-default btn-lg").html("Start");

        $(".display").append(intro);
        intro.append(title);
        intro.append(startBtn);
        console.log("CREATE INTRO");

    }

    createIntro();

    // create message when timer runs out 
    function timeOutMessage() {

        wrongs++;

        $(".display").empty();
        console.log("timeOutMessage");
        $(".display").append(message);
        $(".message").html("Out of Time");

        waiter = setTimeout(wait, 5000);

    }

    function wait(){

        clearTimeout(waiter);
        setStage();
        console.log("wait");

    }

    // if wrong answer
    function wrongMessage() {

        wrongs++;

        $(".display").empty();
        $(".display").append(message);
        $(".message").html("Nope!");

    }

    // if correct answer is chosen
    function rightMessage() {

        rights++;

        $(".display").empty();
        $(".display").append(message);
        $(".message").html("You are correct!");

    }

    // create timer that counts down from 30
    function countDown() {

        clock = setInterval(decrement, 1000);

        function decrement() {

            if (num === 0) {

                clearInterval(clock);
                num = 10;   
                timeOutMessage();

            } else {

                num--;
                $(".timer").html(num);

            }

        }

    }

    // onclick start btn - create jumbotron with questions, answers, timer
    function setStage() {

        roundCount++;
        $("h3").empty();
        $("h1").empty();
        $("button").empty();

        var currentRound = rounds[Math.floor(Math.random() * rounds.length)];

        var timerText = $("<h3>Remaining time: </h3>");
        var timerDiv = $("<span>" + num + "</span>").addClass("timer");
        var question = $("<h1>" + currentRound.question + "</h1>");

        $(".display").append(stage);

        stage.append(timerText);
        timerText.append(timerDiv);
        countDown();

        stage.append(question);

        for (var i = 0; i < currentRound.answers.length; i++) {

            var answers = $("<button></button>").addClass("answer btn btn-default btn-lg btn-block").html(currentRound.answers[i]);

            stage.append(answers);

        }

        console.log("SET STAGE", roundCount, currentRound.correct_answer);

    }

    // start btn
    $(document).on("click", ".start", function() {

        $(".display").empty();
        setStage();
        console.log("CLICK");

    })

    







    // create final screen with restart btn w/o reloading page 




})
