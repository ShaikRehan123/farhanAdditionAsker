import {useEffect, useState} from "react";

function App() {
   const speechMessage = (message: string,rate:number) => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = message;
        speech.volume = 1;
        speech.rate = rate / 100;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
   }

   const [from, setFrom] = useState<number>(1);
    const [to, setTo] = useState<number>(99);
    const [quantity, setQuantity] = useState<number>(5);

    const [wordsToSay, setWordsToSay] = useState<string[]>([]);
    const [rate, setRate] = useState<number>(75);
    const [answer, setAnswer] = useState<number>(0);


    useEffect(() => {
        if(wordsToSay.length > 0){
            speechMessage(wordsToSay.join(' '), rate);
        }
    }, [wordsToSay])

  return (
    <div className='h-screen bg-gray-200 py-2'>
        <h1 className='text-4xl text-center'>Speech Synthesis</h1>
        <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
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
            <div className='bg-sky-200 rounded-lg shadow-lg p-4'>
                <h2 className='text-2xl text-center mb-2'>Rate</h2>
                <input type="range" className='w-full p-2 rounded-lg  outline-none ' value={rate?.toString()} onChange={(e) => setRate(Number(e.target.value))} />
                <p className='text-center'>{rate}</p>
            </div>



        </div>

        <div className='flex justify-center mt-4 p-4'>
            <button className='bg-blue-400 text-white rounded-lg shadow-lg p-4'  onClick={() => {
                let temp_wordsToSay: string[] = [];
                let temp_answer: number = 0;
                for (let i = 0; i < quantity; i++) {
                    const randomNumber = Math.round(Math.random() * (to - from)) + from;
                    if(i === quantity - 1){
                        temp_wordsToSay.push(randomNumber.toString());
                    }else{
                        temp_wordsToSay.push(randomNumber.toString());
                        temp_wordsToSay.push('plus');
                    }
                    temp_answer += randomNumber;

                }
                setAnswer(temp_answer);
                setWordsToSay(temp_wordsToSay);
            }}>
                Ask Problem
            </button>

            <button className='bg-blue-400 text-white rounded-lg shadow-lg p-4 ml-4'  onClick={() => {
                speechMessage(answer.toString(), rate);
            }}>
                Answer
            </button>

        </div>
    </div>
  )
}

export default App
