import {useEffect, useState} from "react";

function App() {
   const speechMessage = (message: string,rate:number) => {
        if(message == 'Stop'){
            window.speechSynthesis.cancel();
            return;
        }
        const speech = new SpeechSynthesisUtterance();
        speech.text = message;
        speech.volume = 1;
        speech.rate = rate / 100;
        speech.pitch = 1;
        speech.lang = 'en-US';
        speech.voice = voice;
        window.speechSynthesis.speak(speech);
   }

   const [from, setFrom] = useState<number>(1);
    const [to, setTo] = useState<number>(99);
    const [quantity, setQuantity] = useState<number>(5);

    const [wordsToSay, setWordsToSay] = useState<string[]>([]);
    const [rate, setRate] = useState<number>(75);
    const [answer, setAnswer] = useState<number>(0);
    const [numbers, setNumbers] = useState<number[]>([]);
    const [type,setType] = useState<string>('addition');
    const [voices , setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [voice , setVoice] = useState<SpeechSynthesisVoice | null >(null);
    const [ownProblem, setOwnProblem] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    useEffect(() => {
        if(wordsToSay.length > 0){
            speechMessage(wordsToSay.join(' '), rate);
        }


    }, [wordsToSay])
    const [showModal2, setShowModal2] = useState<boolean>(false);

    useEffect(() => {
        console.log('voice changed');

        window.speechSynthesis.onvoiceschanged = function() {
            const voices = window.speechSynthesis.getVoices();
            console.log(voices);
            setVoices(voices);
            setVoice(voices[145]); // 145 is the index of the voice I want to use
        };


    }, [])

  return (
    <div className='h-screen  py-2'>
        <h1 className='text-4xl text-center'>Problem Asker</h1>

        <div className={' border-b-2 border-gray-300 py-6'}>
        </div>

        <p className='text-xl my-2  text-center font-bold'>Options </p>


        <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
            <div className='bg-sky-200 rounded-lg shadow-lg p-4'>
                <h2 className='text-2xl text-center mb-2'>Rate</h2>
                <input type="range" className='w-full p-2 rounded-lg  outline-none ' value={rate?.toString()} onChange={(e) => setRate(Number(e.target.value))} />
                <p className='text-center'>{rate}</p>
            </div>
            <div className='bg-sky-200 rounded-lg shadow-lg p-4'>
                <h2 className='text-2xl text-center mb-2'>Type</h2>
                <select className='w-full p-2 rounded-lg shadow-lg outline-none  focus:ring-2 focus:ring-blue-400' value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="addition">Addition</option>
                    <option value="mixed">Mixed</option>
                    <option value="own">Own</option>
                </select>
            </div>

            <div className='bg-sky-200 rounded-lg shadow-lg p-4'>
                <h2 className='text-2xl text-center mb-2'>Voice</h2>
                <select className='w-full p-2 rounded-lg shadow-lg outline-none  focus:ring-2 focus:ring-blue-400' value={voice?.name} onChange={(e) => {
                    const voice = voices.find((voice) => voice.name === e.target.value);
                    setVoice(voice || null);
                }
                }>
                    {voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>{voice.name}</option>
                    ))}
                </select>
            </div>

        </div>

        <p className='text-xl my-2  text-center font-bold'>Random Problem</p>


        <div className='grid grid-cols-2 gap-4 mt-4 p-4' >
            <div className='bg-sky-200 rounded-lg shadow-lg p-4'>
                <h2 className='text-2xl text-center mb-2'>From</h2>
                <input type="number" className='w-full p-2 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-blue-400' value={from?.toString()} onChange={(e) => setFrom(Number(e.target.value))} />
            </div>
            <div className='bg-sky-200 rounded-lg shadow-lg p-4'>
                <h2 className='text-2xl text-center mb-2'>To</h2>
                <input type="number" className='w-full p-2 rounded-lg shadow-lg outline-none  focus:ring-2 focus:ring-blue-400' value={to?.toString()} onChange={(e) => setTo(Number(e.target.value))} />
            </div>
            <div className='bg-sky-200 rounded-lg shadow-lg p-4'>
                <h2 className='text-2xl text-center mb-2'>Quantity</h2>
                <input type="number" className='w-full p-2 rounded-lg shadow-lg outline-none  focus:ring-2 focus:ring-blue-400' value={quantity?.toString()} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>

        </div>




        <p className='text-xl my-2  text-center font-bold'>Own Problem</p>

        <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
            <div className='bg-sky-200 rounded-lg shadow-lg p-4 col-span-2'>
                <h2 className='text-2xl text-center mb-2'>Problem</h2>
                <input type="text" className='w-full p-2 rounded-lg shadow-lg outline-none  focus:ring-2 focus:ring-blue-400' value={ownProblem} onChange={(e) => setOwnProblem(e.target.value)} />
            </div>
        </div>




        <div className='flex justify-center mt-4 p-4'>
            <button className='bg-blue-400 text-white rounded-lg shadow-lg p-4'  onClick={() => {
                window.speechSynthesis.cancel();
                if(type === 'addition'){
                    let temp_wordsToSay: string[] = [];
                    let temp_answer: number = 0;
                    let temp_numbers: number[] = [];
                    for (let i = 0; i < quantity; i++) {
                        const randomNumber = Math.round(Math.random() * (to - from)) + from;
                        if(i === quantity - 1){
                            temp_wordsToSay.push(randomNumber.toString());
                        }else{
                            temp_wordsToSay.push(randomNumber.toString());
                            temp_wordsToSay.push('plus');
                        }
                        temp_answer += randomNumber;
                        temp_numbers.push(randomNumber);
                    }
                    setAnswer(temp_answer);
                    setNumbers(temp_numbers);
                    setWordsToSay(temp_wordsToSay);
                }else if(type === 'mixed'){
                    const temp_wordsToSay: string[] = [];
                    let temp_answer = 0;
                    const temp_numbers: number[] = [];
                    for (let i = 0; i < quantity; i++) {
                        if(i == 0) {
                            // first number should always be addition
                            const randomNumber = Math.round(Math.random() * (to - from)) + from;
                            temp_wordsToSay.push(randomNumber.toString());
                            temp_answer += randomNumber;
                            temp_numbers.push(randomNumber);
                        }else {
                            const type = Math.round(Math.random());
                            if(type == 0){
                                // addition
                                const randomNumber = Math.round(Math.random() * (to - from)) + from;
                                temp_wordsToSay.push('plus');
                                temp_wordsToSay.push(randomNumber.toString());
                                temp_answer += randomNumber;
                                temp_numbers.push(randomNumber);
                            }else{
                                let randomNumber = Math.round(Math.random() * (to - from)) + from;
                                while (randomNumber == 0 || (temp_answer - randomNumber) < 0) {
                                    randomNumber = Math.round(Math.random() * (to - from)) + from;
                                }
                                temp_wordsToSay.push('minus');
                                temp_wordsToSay.push(randomNumber.toString());
                                temp_answer -= randomNumber;
                                temp_numbers.push(-randomNumber);
                            }
                        }
                    }
                    setAnswer(temp_answer);
                    setNumbers(temp_numbers);
                    setWordsToSay(temp_wordsToSay);
                }





                else if (type == 'own') {

                    function extractNumbers(expression:any) {
                        const numbersAndSymbols = expression.split(/([\+\-])/);
                        const numbers = [];

                        for (let i = 0; i < numbersAndSymbols.length; i++) {
                            if (numbersAndSymbols[i] !== "+" && numbersAndSymbols[i] !== "-") {
                                numbers.push(Number(numbersAndSymbols[i]));
                            } else if (numbersAndSymbols[i] === "-" && !isNaN(numbersAndSymbols[i + 1])) {
                                numbers.push(Number(numbersAndSymbols[i] + numbersAndSymbols[i + 1]));
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
                          temp_wordsToSay.push(numbers[i].toString().replace('-', '').replace('+', ''));
                          temp_answer += numbers[i];
                          if (i !== numbers.length - 1) {
                              if (numbers[i+1] > 0) {
                                  temp_wordsToSay.push('plus');
                              } else {
                                  temp_wordsToSay.push('minus');
                              }
                          }
                      }
                        setAnswer(temp_answer);
                        setNumbers(numbers);
                        setWordsToSay(temp_wordsToSay);


                }
            }}

            >
                Ask  Question
            </button>

            <button className='bg-green-400 text-white rounded-lg shadow-lg p-4 ml-4'  onClick={() => {
                window.speechSynthesis.cancel();
                speechMessage(answer.toString(), rate);
                setShowModal(true);
            }}>
                Answer
            </button>

            <button className='bg-red-400 text-white rounded-lg shadow-lg p-4 ml-4'  onClick={() => {
                speechMessage('Stop', rate);
            }
            }>
                Stop
            </button>

            <button className='bg-yellow-400 text-white rounded-lg shadow-lg p-4 ml-4'  onClick={() => {
                speechMessage(wordsToSay.join(' '), rate);
            }
            }>
                Repeat
            </button>





        </div>

        {
            type == 'addition' && (
                <div className='flex justify-center mt-4 p-4 text-2xl'>
                    <span>{numbers.length > 0 && numbers.join(' + ')}</span>
                </div>
            )
        }

        {
            type == 'subtraction' && (
                <div className='flex justify-center mt-4 p-4 text-2xl'>
                    <span>{numbers.length > 0 && numbers.join(' - ')}</span>
                </div>
            )
        }

        {
            type == 'mixed' && (
                <div className='flex justify-center mt-4 p-4 text-2xl'>
                    <span>{numbers.length > 0 && numbers.map((number, index) => {
                        console.log(number)
                        if(index == 0){
                            return number;
                        }else{
                            return ` ${number > 0 ? '+' : '-'} ${Math.abs(number)}`;
                        }
                    })}</span>
                </div>
            )
        }

        {
            type == 'own' && (
                <div className='flex justify-center mt-4 p-4 text-2xl'>
                    <span>{ownProblem}</span>
                </div>
            )
        }


        <div className={'modal ' + (showModal ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="modal-content relative">
                <p className='text-2xl text-center'>Answer: {answer}</p>
                <button className='bg-red-400 text-white rounded-full shadow-lg px-4 py-2 absolute -top-4 -right-4'  onClick={() => {
                    setShowModal(false);
                }}>
                    X
                </button>
            </div>

        </div>

    {/*    modal for showing num bers*/}



        <div className={'modal ' + (showModal2 ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="modal-content relative">

            </div>
        </div>


    </div>
  )
}

export default App
