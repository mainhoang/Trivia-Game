$(document).ready(function() {

    var clock = "";
    var num = 30;
    var waiter;

    var wrongs = 0;
    var rights = 0;
    var unanswered = 0;

    var alreadyAnswered = [];
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

    var arrEmpty = false;

    // create intro page with title and start btn
    function createIntro(){

        $("#main-display").empty();

        var intro = $("<div>").addClass("intro");
        var introTitle = $("<h1>").html("Play");
        var startBtn = $("<button>").addClass("start btn btn-default btn-lg btn-block").html("Start");

        $("#main-display").append(intro);
        intro.append(introTitle);
        intro.append(startBtn);

        $(".start").on("click", function(){

            $("#main-display").empty();
            setStage();

        })

    }

    // wait to clear timeout & begin next round
    function wait(){

        clearTimeout(waiter);
        setStage();
        console.log("wait");

    }

    function restartTimer(){

        clearInterval(clock);
        num = 30;

    }

    // create message when timer runs out 
    function showTimeOutMessage(){

        restartTimer();
        // clearInterval(clock);

        var timeOutMessage = $("<div>").addClass("message");

        $("#main-display").empty();
        console.log("timeOutMessage");
        $("#main-display").append(timeOutMessage);
        timeOutMessage.html("<h1>Time's Up!</h1>");

        waiter = setTimeout(wait, 2000);

    }

    // if wrong answer
    function showWrongMessage(corrAns) {

        restartTimer();

        var wrongMessage = $("<div>").addClass("message");
        var wrongTitle = $("<h1>");
        var answerDisplay = $("<p>");

        $("#main-display").empty();
        $("#main-display").append(wrongMessage);
        wrongMessage.append(wrongTitle);
        wrongTitle.html("Nope!")
        answerDisplay.html("The correct answer is:<br/><h3>" + corrAns + "</h3>");
        $("#main-display").append(answerDisplay);

        waiter = setTimeout(wait, 2000);

    }

    // if correct answer is chosen
    function showRightMessage(){

        restartTimer();

        var rightMessage = $("<div>").addClass("message");

        $("#main-display").empty();
        $("#main-display").append(rightMessage);
        rightMessage.html("<h1>You are correct!</h1>");

        waiter = setTimeout(wait, 2000);

    }

    // create final page with stats & restart btn
    function showFinalPage(){

        var finalMessage = $("<h1>").addClass("message");
        var stats = $("<p>");
        var restartGameBtn = $("<button>").addClass("restartGame btn btn-default btn-lg btn-block");

        $("#main-display").empty();
        $("#main-display").append(finalMessage);
        finalMessage.html("Game Over");
        $("#main-display").append(stats);
        stats.html("Correct Answers: " + rights + "<br/>Incorrect Answers: " + wrongs + "<br/>Not Answered: " + unanswered);
        $("#main-display").append(restartGameBtn);
        restartGameBtn.html("Play Again");

        restartGameBtn.on("click", function(){

            for(var i = 0; i < alreadyAnswered.length; i++){

                rounds.push(alreadyAnswered[i]);

            }

            num = 30;
            wrongs = 0;
            rights = 0;
            unanswered = 0;
            alreadyAnswered = [];

            setStage();

        });

    }

    // create timer that counts down from 30
    function countDown(){

        clock = setInterval(decrement, 1000);

        function decrement(){

            if (num === 0){

                unanswered++;
                showTimeOutMessage();

            }else{

                num--;
                $(".timer").html(num);

            }

        }

    }

    // onclick start btn - create jumbotron with questions, answers, timer
    function setStage(){

        if(rounds.length === 0){

            arrEmpty = true;
            showFinalPage();

        }else{

            $("#main-display").empty();

            var currentRound = rounds[Math.floor(Math.random() * rounds.length)];
            var stage = $("<div></div>").addClass("stage");
            var timerText = $("<h3>Remaining time: </h3>");
            var timerDiv = $("<span>" + num + "</span>").addClass("timer");
            var question = $("<h2>" + currentRound.question + "</h2>");


            $("#main-display").append(stage);
            $("#main-display").append(timerText);
            timerText.append(timerDiv);
            countDown();
            $("#main-display").append(question);

            for(var i = 0; i < currentRound.answers.length; i++){

                var answerBtns = $("<button></button>").addClass("answer btn btn-default btn-lg btn-block").html(currentRound.answers[i]);
                $("#main-display").append(answerBtns);

            }

            $("button").on("click", function(){

                console.log($(this).html());

                if($(this).html() === currentRound.correct_answer && num > 0) {

                    rights++;
                    showRightMessage();

                }else{

                    wrongs++;
                    showWrongMessage(currentRound.correct_answer);

                }

            });

            rounds.splice(rounds.indexOf(currentRound), 1);
            alreadyAnswered.push(currentRound);

        }

    }

    createIntro();

});
