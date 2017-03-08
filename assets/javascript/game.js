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

        "question": "What's my name?",
        "correct_answer": "Mai",
        "answers": [
            "Mai",
            "Luda",
            "Michelle",
            "S-N-double-O-P"
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

    var currentRound;
    var arrEmpty = false;

    // create intro page with title and start btn -  btn btn-default btn-lg btn-block
    function createIntro() {

        $("#main-display").empty();

        var intro = $("<div>").addClass("intro");
        var introTitle = $("<h1 id='name'>TRIVIA TIME</h1>").addClass("gradient");
        var startBtn = $("<button>").addClass("start").html("Start");

        $("#main-display").append(intro);
        intro.append(introTitle);
        intro.append(startBtn);

        $(".start").on("click", function() {

            $("#main-display").empty();
            setStage();

        })

    }

    // wait to clear timeout & begin next round
    function wait() {

        clearTimeout(waiter);
        setStage();
        console.log("wait");

    }

    function restartTimer() {

        clearInterval(clock);
        num = 30;

    }

    // create message when timer runs out 
    function showTimeOutMessage(corrAns) {

        restartTimer();
        // clearInterval(clock);

        var timeOutDiv = $("<div>").addClass("message");

        $("#main-display").empty();
        var timeOutMessage = $("<h2>").html("Time's Up!");
        var announceAnswer = $("<p>").html("The correct answer is: ");;
        var answer = $("<button>").html(corrAns);

        $("#main-display").empty();
        $("#main-display").append(timeOutDiv);
        timeOutDiv.append(timeOutMessage);
        timeOutDiv.append(announceAnswer);
        timeOutDiv.append(answer);

        waiter = setTimeout(wait, 2000);

    }

    // if wrong answer
    function showWrongMessage(corrAns) {

        restartTimer();

        var wrongDiv = $("<div>").addClass("message");
        var wrongMessage = $("<h2>").html("Nope!");
        var announceAnswer = $("<p>").html("The correct answer is: ");;
        var answer = $("<button>").html(corrAns);

        $("#main-display").empty();
        $("#main-display").append(wrongDiv);
        wrongDiv.append(wrongMessage);
        wrongDiv.append(announceAnswer);
        wrongDiv.append(answer);

        waiter = setTimeout(wait, 2000);

    }

    // if correct answer is chosen
    function showRightMessage() {

        restartTimer();

        var rightDiv = $("<div>").addClass("message");

        $("#main-display").empty();
        $("#main-display").append(rightDiv);
        rightDiv.html("<h2>You are correct!</h2>");

        waiter = setTimeout(wait, 2000);

    }

    // create final page with stats & restart btn
    function showFinalPage() {

        var finalDiv = $("<div>").addClass("game-over");
        var finalMessage = $("<h2>").html("Game Over");
        var stats = $("<p>").html("Correct Answers: " + rights + "<br/>Incorrect Answers: " + wrongs + "<br/>Not Answered: " + unanswered);
        var restartGameBtn = $("<button>").addClass("restartGame").html("Play Again");

        $("#main-display").empty();
        $("#main-display").append(finalDiv);
        finalDiv.append(finalMessage);
        finalDiv.append(stats);
        finalDiv.append(restartGameBtn);

        restartGameBtn.on("click", function() {

            for (var i = 0; i < alreadyAnswered.length; i++) {

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
    function countDown() {

        clock = setInterval(decrement, 1000);

        function decrement() {
            if(num === 0){

                unanswered++;
                showTimeOutMessage(currentRound.correct_answer);
            }else{
                num--;
                $(".timer").html(num);
            }

            

        }

    }

    function shuffle(answers) {

        var i = 0;
        var j = 0;
        var temp = null;

        for (i = answers.length - 1; i > 0; i -= 1) {

            j = Math.floor(Math.random() * (i + 1));
            temp = answers[i];
            answers[i] = answers[j];
            answers[j] = temp;
        }

    }

    // onclick start btn - create jumbotron with questions, answers, timer
    function setStage() {

        if (rounds.length === 0) {

            arrEmpty = true;
            showFinalPage();

        } else {

            $("#main-display").empty();

            currentRound = rounds[Math.floor(Math.random() * rounds.length)];
            var stage = $("<div></div>").addClass("stage");
            var timerText = $("<h4>Remaining time: </h4>");
            var timerDiv = $("<span>" + num + "</span>").addClass("timer");
            var questionDiv = $("<div>").addClass("question-wrapper");
            var question = $("<h3>" + currentRound.question + "</h3>").addClass("questions");
            var btnWrapper = $("<div>").addClass("button-wrapper");


            $("#main-display").append(stage);
            stage.append(timerText);
            timerText.append(timerDiv);
            countDown();
            stage.append(questionDiv);
            questionDiv.append(question);
            stage.append(btnWrapper);


            shuffle(currentRound.answers);

            for (var i = 0; i < currentRound.answers.length; i++) {

                var answerBtns = $("<button></button>").addClass("answer btn-block").html(currentRound.answers[i]);
                btnWrapper.append(answerBtns);

            }
            
            

            $("button").on("click", function() {

                console.log($(this).html());

                if ($(this).html() === currentRound.correct_answer && num > 0) {

                    rights++;
                    showRightMessage();

                } else {

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
