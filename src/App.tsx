import { useEffect, useState } from "react";

function App() {
  const speechMessage = (message: string, rate: number, type = "question") => {
    if (message == "Stop") {
      window.speechSynthesis.cancel();
      return;
    }
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = rate / 100;
    speech.pitch = 1;
    speech.lang = "en-US";
    speech.voice = voice;

    if (type === "question") {
      speech.onboundary = function (event) {
        const fromIndex = event.charIndex;
        const toIndex = event.charIndex + event.charLength;
        const word = message.substring(fromIndex, toIndex);
        console.log(word);
        setCurrentSpeakingWord(word);
      };
      speech.onend = function () {
        setShowModal2(false);
        setCurrentSpeakingWord("");
      };
    }

    window.speechSynthesis.speak(speech);
  };

  const [from, setFrom] = useState<number>(1);
  const [to, setTo] = useState<number>(9);
  const [quantity, setQuantity] = useState<number>(5);

  const [wordsToSay, setWordsToSay] = useState<string[]>([]);
  const [rate, setRate] = useState<number>(75);
  const [answer, setAnswer] = useState<number>(0);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [type, setType] = useState<string>("addition");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [ownProblem, setOwnProblem] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [currentSpeakingWord, setCurrentSpeakingWord] = useState<string>("");
  const [color, setColor] = useState<string>("#ccc");
  useEffect(() => {
    if (wordsToSay.length > 0) {
      setShowModal2(true);
      speechMessage(wordsToSay.join(" "), rate);
    }
  }, [wordsToSay]);
  // const [showModal2, setShowModal2] = useState<boolean>(false);

  useEffect(() => {
    console.log("voice changed");

    window.speechSynthesis.onvoiceschanged = function () {
      const voices = window.speechSynthesis.getVoices();
      console.log(voices);
      setVoices(voices);
      setVoice(voices[0]);
    };
  }, []);

  //   const fadeInStyle = useSpring({
  //     from: { opacity: 0.5 },
  //     to: { opacity: 1 },
  //     config: { duration: 100 },
  //   });

  return (
    <div className="h-screen py-2">
      <h1 className="text-4xl text-center">Problem Asker</h1>

      <div className={" border-b-2 border-gray-300 py-6"}></div>

      <p className="my-2 text-xl font-bold text-center">Options </p>

      <div className="grid grid-cols-2 gap-4 p-4 mt-4">
        <div className="p-4 rounded-lg shadow-lg bg-sky-200">
          <h2 className="mb-2 text-2xl text-center">Rate</h2>
          <input
            type="range"
            className="w-full p-2 rounded-lg outline-none "
            value={rate?.toString()}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <p className="text-center">{rate}</p>
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-sky-200">
          <h2 className="mb-2 text-2xl text-center">Type</h2>
          <select
            className="w-full p-2 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="addition">Addition</option>
            <option value="mixed">Mixed</option>
            <option value="own">Own</option>
          </select>
        </div>

        <div className="p-4 rounded-lg shadow-lg bg-sky-200">
          <h2 className="mb-2 text-2xl text-center">Voice</h2>
          <select
            className="w-full p-2 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={voice?.name}
            onChange={(e) => {
              const voice = voices.find(
                (voice) => voice.name === e.target.value
              );
              setVoice(voice || null);
            }}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-lg shadow-lg bg-sky-200">
          <h2 className="mb-2 text-2xl text-center">Color</h2>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-20 p-2 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <p className="my-2 text-xl font-bold text-center">Random Problem</p>

      <div className="grid grid-cols-2 gap-4 p-4 mt-4">
        <div className="p-4 rounded-lg shadow-lg bg-sky-200">
          <h2 className="mb-2 text-2xl text-center">From</h2>
          <input
            type="number"
            className="w-full p-2 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={from?.toString()}
            onChange={(e) => setFrom(Number(e.target.value))}
          />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-sky-200">
          <h2 className="mb-2 text-2xl text-center">To</h2>
          <input
            type="number"
            className="w-full p-2 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={to?.toString()}
            onChange={(e) => setTo(Number(e.target.value))}
          />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-sky-200">
          <h2 className="mb-2 text-2xl text-center">Quantity</h2>
          <input
            type="number"
            className="w-full p-2 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={quantity?.toString()}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
      </div>

      <p className="my-2 text-xl font-bold text-center">Own Problem</p>

      <div className="grid grid-cols-2 gap-4 p-4 mt-4">
        <div className="col-span-2 p-4 rounded-lg shadow-lg bg-sky-200">
          <h2 className="mb-2 text-2xl text-center">Problem</h2>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={ownProblem}
            onChange={(e) => setOwnProblem(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center p-4 mt-4">
        <button
          className="p-4 text-white bg-blue-400 rounded-lg shadow-lg"
          onClick={() => {
            window.speechSynthesis.cancel();
            if (type === "addition") {
              let temp_wordsToSay: string[] = [];
              let temp_answer: number = 0;
              let temp_numbers: number[] = [];
              for (let i = 0; i < quantity; i++) {
                const randomNumber =
                  Math.round(Math.random() * (to - from)) + from;
                if (i === quantity - 1) {
                  temp_wordsToSay.push(randomNumber.toString());
                } else {
                  temp_wordsToSay.push(randomNumber.toString());
                  temp_wordsToSay.push("plus");
                }
                temp_answer += randomNumber;
                temp_numbers.push(randomNumber);
              }
              setAnswer(temp_answer);
              setNumbers(temp_numbers);
              setWordsToSay(temp_wordsToSay);
            } else if (type === "mixed") {
              const temp_wordsToSay: string[] = [];
              let temp_answer = 0;
              const temp_numbers: number[] = [];
              for (let i = 0; i < quantity; i++) {
                if (i == 0) {
                  // first number should always be addition
                  const randomNumber =
                    Math.round(Math.random() * (to - from)) + from;
                  temp_wordsToSay.push(randomNumber.toString());
                  temp_answer += randomNumber;
                  temp_numbers.push(randomNumber);
                } else {
                  const type = Math.round(Math.random());
                  if (type == 0) {
                    // addition
                    const randomNumber =
                      Math.round(Math.random() * (to - from)) + from;
                    temp_wordsToSay.push("plus");
                    temp_wordsToSay.push(randomNumber.toString());
                    temp_answer += randomNumber;
                    temp_numbers.push(randomNumber);
                  } else {
                    let randomNumber =
                      Math.round(Math.random() * (to - from)) + from;
                    while (
                      randomNumber == 0 ||
                      temp_answer - randomNumber < 0
                    ) {
                      randomNumber =
                        Math.round(Math.random() * (to - from)) + from;
                    }
                    temp_wordsToSay.push("minus");
                    temp_wordsToSay.push(randomNumber.toString());
                    temp_answer -= randomNumber;
                    temp_numbers.push(-randomNumber);
                  }
                }
              }
              setAnswer(temp_answer);
              setNumbers(temp_numbers);
              setWordsToSay(temp_wordsToSay);
            } else if (type == "own") {
              function extractNumbers(expression: any) {
                const numbersAndSymbols = expression.split(/([\+\-])/);
                const numbers = [];

                for (let i = 0; i < numbersAndSymbols.length; i++) {
                  if (
                    numbersAndSymbols[i] !== "+" &&
                    numbersAndSymbols[i] !== "-"
                  ) {
                    numbers.push(Number(numbersAndSymbols[i]));
                  } else if (
                    numbersAndSymbols[i] === "-" &&
                    !isNaN(numbersAndSymbols[i + 1])
                  ) {
                    numbers.push(
                      Number(numbersAndSymbols[i] + numbersAndSymbols[i + 1])
                    );
                    i++;
                  }
                }

                return numbers;
              }

              const numbers = extractNumbers(ownProblem);
              let temp_wordsToSay: string[] = [];
              let temp_answer: number = 0;
              console.log(numbers);

              for (let i = 0; i < numbers.length; i++) {
                temp_wordsToSay.push(
                  numbers[i].toString().replace("-", "").replace("+", "")
                );
                temp_answer += numbers[i];
                if (i !== numbers.length - 1) {
                  if (numbers[i + 1] > 0) {
                    temp_wordsToSay.push("plus");
                  } else {
                    temp_wordsToSay.push("minus");
                  }
                }
              }
              setAnswer(temp_answer);
              setNumbers(numbers);
              setWordsToSay(temp_wordsToSay);
            }
          }}
        >
          Ask Question
        </button>

        <button
          className="p-4 ml-4 text-white bg-green-400 rounded-lg shadow-lg"
          onClick={() => {
            window.speechSynthesis.cancel();
            speechMessage(answer.toString(), rate, "answer");
            setShowModal(true);
          }}
        >
          Answer
        </button>

        <button
          className="p-4 ml-4 text-white bg-red-400 rounded-lg shadow-lg"
          onClick={() => {
            speechMessage("Stop", rate);
          }}
        >
          Stop
        </button>

        <button
          className="p-4 ml-4 text-white bg-yellow-400 rounded-lg shadow-lg"
          onClick={() => {
            setShowModal2(true);
            speechMessage(wordsToSay.join(" "), rate);
          }}
        >
          Repeat
        </button>
      </div>

      {type == "addition" && (
        <div className="flex justify-center p-4 mt-4 text-2xl">
          <span>{numbers.length > 0 && numbers.join(" + ")}</span>
        </div>
      )}

      {type == "subtraction" && (
        <div className="flex justify-center p-4 mt-4 text-2xl">
          <span>{numbers.length > 0 && numbers.join(" - ")}</span>
        </div>
      )}

      {type == "mixed" && (
        <div className="flex justify-center p-4 mt-4 text-2xl">
          <span>
            {numbers.length > 0 &&
              numbers.map((number, index) => {
                console.log(number);
                if (index == 0) {
                  return number;
                } else {
                  return ` ${number > 0 ? "+" : "-"} ${Math.abs(number)}`;
                }
              })}
          </span>
        </div>
      )}

      {type == "own" && (
        <div className="flex justify-center p-4 mt-4 text-2xl">
          <span>{ownProblem}</span>
        </div>
      )}

      <div
        className={
          "modal " +
          (showModal ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      >
        <div className="relative modal-content">
          <p className="text-2xl text-center">Answer: {answer}</p>
          <button
            className="absolute px-4 py-2 text-white bg-red-400 rounded-full shadow-lg -top-4 -right-4"
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
      </div>

      <div
        className={
          "full_screen_modal  " +
          (showModal2 ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      >
        <div className="relative full_screen_modal_content">
          <p
            className={"text-center text-[200px] font-bold  "}
            // style={fadeInStyle}
            style={{
              color: color,
              textShadow: `0 0 10px ${color}`,
            }}
          >
            {currentSpeakingWord.replace("minus", "-").replace("plus", "+")}
          </p>
          <img src="star.png" className="absolute w-40 h-40 top-5 left-5" />
          <img src="star.png" className="absolute w-40 h-40 top-5 right-5" />
          <img src="star.png" className="absolute w-40 h-40 bottom-5 left-5" />
          <img src="star.png" className="absolute w-40 h-40 bottom-5 right-5" />
        </div>
      </div>
    </div>
  );
}

export default App;
