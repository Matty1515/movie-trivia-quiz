/* jshint esversion: 6 */
// TO DO:
// - turn off jshint
// - correctly format or get rid of quote marks in answers
// - split the three different screens into components
// - delete jsonResponse and use fetch in componentDidMount from https://opentdb.com/api_config.php

const jsonResponse = {
  results: [
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "easy",
      question: "Who wrote and directed the 1986 film &#039;Platoon&#039;?",
      correct_answer: "Oliver Stone",
      incorrect_answers: [
        "Francis Ford Coppola",
        "Stanley Kubrick",
        "Michael Cimino"
      ]
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "easy",
      question: "Which actress danced the twist with John Travolta in &#039;Pulp Fiction&#039;?",
      correct_answer: "Uma Thurman",
      incorrect_answers: [
        "Kathy Griffin",
        "Pam Grier",
        "Bridget Fonda"
      ]
    },
  ]
};

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queNum: -1,
      queMax: 2,
      numCorrect: 0,
      numWrong: 0,
      selectedOption: null,
      correctAns: null
    };
    this.handleButton = this.handleButton.bind(this);
    this.beginQuiz = this.beginQuiz.bind(this);
    this.nextQue = this.nextQue.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
  }
  
  // componentDidMount fetch API - add this to the main quiz component when completed
  
  componentDidMount() {
    // MOVE THIS TO BEGIN QUIZ COMPONENT WHEN COMPLETED
    // Note that currently this doesn't work when you restart quiz. That is because the component doesn't unmount so
    // it cannot mount again. It should work properly when the components are split.
    setTimeout(function(){
      const wrapper = document.getElementById('beginContent');
      wrapper.classList.add('wrapper--display');
    }, 2000);
  }
  handleButton(e) {
    this.setState({
      correctAns: e.target.value,
      selectedOption: e.target.id
    });
  }
  beginQuiz() {
    this.setState({
      queNum: this.state.queNum + 1
    });
  }
  // moves on to the next question
  nextQue(e) {
    // prints state values for testing - GET RID UPON DEPLOYMENT
    console.log(this.state.selectedOption);
    console.log(this.state.correctAns);
    
    // stops the page from reloading for no apparent reason
    e.preventDefault();
    
    // if the answer is right (i.e. selectedOption equals correctAns) then +1 to numCorrect otherwise +1 to numWrong
    if (this.state.selectedOption === this.state.correctAns) {
      this.setState({
        numCorrect: this.state.numCorrect + 1,
        queNum: this.state.queNum + 1
      });
    } else {
      this.setState({
        numWrong: this.state.numWrong + 1,
        queNum: this.state.queNum + 1
      });
    }
  }
  // restarts the quiz by resetting all counters
  restartQuiz() {
    this.setState({
      queNum: -1,
      numCorrect: 0,
      numWrong: 0
    });
    // reload page to call API again? https://www.w3schools.com/jsref/met_loc_reload.asp
  }
  render() {
    if (this.state.queNum === -1) {
      return (
        <div className="wrapper">
          <div className="wrapper__begin">
            <h1>Movie Trivia Quiz</h1>
            <div id="beginContent" className="begin__content">
              <p>You will get 10 questions on various blah... Your task is to blah... blah... blah...</p>
              <button onClick={this.beginQuiz}>Let's Begin!<span><i className="fas fa-angle-double-right"></i></span></button>
            </div>
          </div>
        </div>
      )
    } else if (this.state.queNum === this.state.queMax) {
      return (
        <div>
          <h1>Quiz over</h1>
          <h3>You got {this.state.numCorrect} questions right and {this.state.numWrong} wrong</h3>
          <button onClick={this.restartQuiz}>Restart</button>
        </div>
      );
    } else {
      const queNum = this.state.queNum;

      // takes the question number and returns question object
      const getQueObj = function(num) {
        return jsonResponse.results[num];
      }
      const queObj = getQueObj(queNum);

      // saves the question and correct answer
      const que = queObj.question.replace("&#039;", "'").replace("&#039;", "'");
      const correctAns = queObj.correct_answer;

      // creates an array of multiple choice answers
      let ans = [];
      ans.push(correctAns);
      ans.push(...queObj.incorrect_answers);

      // randomise answers using Durstenfeld shuffle algorithm
      function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
      }
      shuffleArray(ans);
      
      return (
        <div>
          <h3>Question #{this.state.queNum + 1}</h3>
          <h1>{que}</h1>
          <form onSubmit={this.nextQue}>
            <button 
              type="submit"
              id={ans[0]}
              className="submit-button button-one"
              value={correctAns}
              onClick={this.handleButton}
            >{ans[0]}</button>
            <button 
              type="submit"
              id={ans[1]}
              className="submit-button button-two"
              value={correctAns}
              onClick={this.handleButton}
            >{ans[1]}</button>
            <button 
              type="submit"
              id={ans[2]}
              className="submit-button button-three"
              value={correctAns}
              onClick={this.handleButton}
            >{ans[2]}</button>
            <button 
              type="submit"
              id={ans[3]}
              className="submit-button button-four"
              value={correctAns}
              onClick={this.handleButton}
            >{ans[3]}</button>
          </form>
        </div>
      );
    }
  }
};

ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
);