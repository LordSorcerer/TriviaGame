
var triviaGame = {
    htmlDisplayTimer: $("#displayTimer"),
    htmlDisplayQuestion: $("#displayQuestion"),
    htmlDisplayResponses: $("#displayResponses"),
    htmlDisplayQuestion: $("#displayQuestion"),
    htmlStartBtn: $("#startBtn"),
    htmlRespA: $("#respA"),
    htmlRespB: $("#respB"),
    htmlRespC: $("#respC"),
    htmlRespD: $("#respD"),
    timer: 20,
    timerMax: 20,
    handleTimer: 0,
    answerCorrect: 0,
    answerIncorrect: 0,
    gameActive: true,
    questionNum: 0,

    //As a note, it's really hard to find interesting riddles that can be represented via multiple choice.  
    //Many riddles rely on a pun for an answer and seeing the pun there in front of you can give it away.
    questionList: [{
        Q: "Throw away the outside and cook the inside, then eat the outside and throw away the inside. What is it?",
        A: "egg",
        B: "corn",
        C: "nut",
        D: "peach",
        answer: "B",
        text: "Corn on the cob, because you throw away the husk, cook and eat the kernels, and throw away the cob."
    }, {
        Q: "A house has 4 walls. All of the walls are facing south and a bear is circling the house. What color is the bear?",
        A: "black",
        B: "brown",
        C: "gray",
        D: "white",
        answer: "D",
        text: "If all the walls face south, the house must be at the north pole so the bear is white."
    }, {
        Q: "A bird, a monkey and a squirrel are racing to the top of a coconut tree. Who will get the banana first: the bird, the monkey or the squirrel?",
        A: "Bird",
        B: "Monkey",
        C: "Squirrel",
        D: "None",
        answer: "D",
        text: "None of them, because you can’t get a banana from a coconut tree."
    }, {
        Q: "Which eight-letter word still remains a word after removing each letter from it?",
        A: "Question",
        B: "Robotics",
        C: "Starting",
        D: "Trollops",
        answer: "C",
        text: "Starting-Staring-String-Sting-Sing-Sin-In-I"
    }, ],

    /* console.log(respA.children("#respButtonA"));
    console.log(respA.children([0]));
    console.log(respA.children(1));*/

    startTimer: function() {
        this.timer = this.timerMax;
        this.htmlDisplayTimer.text("Time Remaining -> " + this.timer);
        this.handleTimer = setInterval(this.runTimer.bind(this), 1000);
    },

    stopTimer: function() {
        clearInterval(this.handleTimer);
    },

    runTimer: function() {
        this.timer--;
        this.htmlDisplayTimer.text("Time Remaining -> " + this.timer);
        if (this.timer <= 0) {
            console.log("Timer below 0");
            this.stopTimer();
            this.gameRun();
        };

    },

    loadQuestion: function() {
        if (this.questionNum <= this.questionList.length - 1) {
            console.log(this.questionNum);
            this.htmlDisplayQuestion.text(this.questionList[this.questionNum].Q);
            this.htmlRespA.text("A. " + this.questionList[this.questionNum].A);
            this.htmlRespB.text("B. " + this.questionList[this.questionNum].B);
            this.htmlRespC.text("C. " + this.questionList[this.questionNum].C);
            this.htmlRespD.text("D. " + this.questionList[this.questionNum].D);
            this.startTimer();
        } else {
            this.htmlDisplayTimer.text("Time Remaining ->");
            this.htmlDisplayQuestion.text("Well, that's the whole quiz.  Let's see how you did... Amongst your answers, " + this.answerCorrect + " were right and " + this.answerIncorrect + " were wrong.  Click the title button to play again.");
        }
    },
    //Yes, it contains just one function but I had planned to make it do other things.  Placeholder.
    gameRun: function() {
        this.loadQuestion();
    },
    //Resets all the variables in the game and starts it up again
    gameReset: function() {
        this.timer = 20;
        this.timerMax = 20;
        this.handleTimer = 0;
        this.answerCorrect = 0;
        this.answerIncorrect = 0;
        this.questionNum = 0;
        this.htmlStartBtn.text("_.~[Reset the Riddlemaster's Challenge]~._");
        this.stopTimer();
        this.gameRun();
    },

    parseInput: function(val) {
        //This function currently only takes the value of the response button clicked and returns it to the object for processing but it could include other types of input, creating a centralized function to deal with all input from outside the object.  I.E.: "I AM THE GATEKEEPER!!! FEAR ME!!! MWAAAHAHAHAHAHAHAHAAAA!"

        if (val == this.questionList[this.questionNum].answer) {
            this.answerCorrect++;
        } else {
            this.answerIncorrect++;
        };
        this.stopTimer();
        this.htmlDisplayQuestion.text(this.questionList[this.questionNum].text);
        //Sets up for next question
        this.questionNum++;
        this.gameRun();
    }

};

//Event handlers
$("#startBtn").on("click", function() {
    triviaGame.gameRun();
});

$(".respBtn").on("click", function() {
    triviaGame.parseInput(this.value);
});
