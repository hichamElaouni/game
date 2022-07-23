import { useState } from "react";
import ListChoices from "../Choice/ListChoices";
import Timer from "../Timer/Timer";


const NextQuestion = (
  setVisible,
  setOccurence,
  setTimer,
  checkAnswer,
  setTurn,
  idPlayer,
  scores,
  setScores,
  point,
  idQuestion
) => {
  setOccurence(idQuestion);
  setTimer(false);
  setTurn(false);
  setVisible(true);

  if (checkAnswer) {
    if (idPlayer == 1) {
      let { xScore } = scores;
      xScore += point;
      setScores({ ...scores, xScore });
    } else if (idPlayer == 2) {
      let { oScore } = scores;
      oScore += point;
      setScores({ ...scores, oScore });
    }
  }
  

};

export default function Question(props) {
  const {
    idPlayer,
    namePlayer,
    questions = {},
    setVisible,
    setOccurence,
    setTimer,
    setTurn,
    scores,
    setScores,
  } = props;


  
  const [checkAnswer, setChaeckAnswer] = useState(false);
  const onclick = (event) => {
    if (questions.answer == event.target.value) {
      setChaeckAnswer(true);
    } else {
      setChaeckAnswer(false);
    }
  };
  const idQuestion = questions.id;
  let Choices = ";";

  if (questions.choices === undefined) {
  } else {
    Choices = questions.choices.toString();
  }

  const point = questions.point;
  return (
    <div className="players ">
      <h1>{namePlayer}</h1>
      <div className="boardquetion">
        <Timer
          setTimer={setTimer}
          setTurn={setTurn}
          setVisible={setVisible}
          checkAnswer={checkAnswer}
          idPlayer={idPlayer}
          scores={scores}
          setScores={setScores}
          point={point}
          setOccurence={setOccurence}
        />
        <h2 className="TitleQuestion">{questions.title}</h2>

        <div className="container">
          <ListChoices choice={Choices.split(";")} onclick={onclick} />
        </div>

        <input
          type="submit"
          className="btnNext"
          value="Next"
          onClick={() =>
            NextQuestion(
              setVisible,
              setOccurence,
              setTimer,
              checkAnswer,
              setTurn,
              idPlayer,
              scores,
              setScores,
              point,
              idQuestion
            )
          }
        ></input>
      </div>
    </div>
  );
}

//===========================
/*

import { useState } from "react";
import ListChoices from "../Choice/ListChoices";
import Timer from "../Timer/Timer";

const NextQuestion = (
  setVisible,
  setOccurence,
  setTimer,
  setTurn,
  checkAnswer
) => {
  setOccurence((prevCheck) => (prevCheck += 1));

  setTimer(false);
  setTurn(false);
  setVisible(true);

if(checkAnswer)
console.log('good');
else
console.log("not good");
  
};


export default function Question(props) {
  const {
    namePlayer,
    questions = {},
    setVisible,
    setOccurence,
    setTimer,
    turn,
    setTurn,
  } = props;
  const [defaultTime, setDefaultTime] = useState(100);
  const [checkAnswer,setChaeckAnswer]=useState(false);
  const [trueAnswer,setTruekAnser]=useState(0);


  let Choices = ";";
  if (questions.choices === undefined) {
  } else {
    Choices = questions.choices.toString();
  }
  
  return (
    <div className="players ">
      <h1>{namePlayer}</h1>
      <div className="boardquetion">
        <Timer
          defaultTimer={defaultTime}
          setTimer={setTimer}
          setTurn={setTurn}
          setVisible={setVisible}
        />
        <h2 className="TitleQuestion">{questions.title}</h2>
       {console.log("answer is ",questions.answer)}
        <div className="container">
          <ListChoices choice={Choices.split(";")} defualtAnswer={questions.answer} setChaeckAnswer={setChaeckAnswer} />
        </div>

        <input
          type="submit"
          className="btnNext"
          value="Next"
          onClick={() =>
            NextQuestion(
              setVisible,
              setOccurence,
              setTimer,
              setDefaultTime,
              turn,
              setTurn,
              checkAnswer
            )
          }
        ></input>
      </div>
    </div>
  );
}



*/
