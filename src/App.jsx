import React, { useState } from "react";
import './App.css';

const letterValues = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  h: 5, n: 5, e: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState(null);

  const calculateWordValue = (word) => {
    let wordSum = 0;
    word.split("").forEach((letter) => {
      const value = letterValues[letter.toLowerCase()] || 0;
      wordSum += value;
    });
   
    while (wordSum > 9) {
      wordSum = String(wordSum).split("").reduce((a, b) => a + parseInt(b), 0);
    }
    return wordSum;
  };

  const calculateNameValue = () => {
    const nameArr = name.split(" ");
    const wordResults = nameArr.map((word) => {
      return {
        word,
        reducedValue: calculateWordValue(word)
      };
    });

    const totalSum = wordResults.reduce((sum, item) => sum + item.reducedValue, 0);
    setResult(wordResults);
    setTotal(totalSum);
  };

  return (
    <div className="container">
      <h1>Name Number Calculator</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={calculateNameValue}>Calculate</button>

      {result.length > 0 && (
        <div className="result-container">
          <h2>Calculation Process:</h2>
          {result.map((item, index) => (
            <div key={index}>
              <h3>{item.word}</h3>
              <ul>
                {item.word.split("").map((letter, letterIndex) => (
                  <li key={letterIndex}>
                    {letter.toUpperCase()} = {letterValues[letter.toLowerCase()] || 0}
                  </li>
                ))}
              </ul>
              <p>Reduced Sum: {item.reducedValue}</p>
            </div>
          ))}
          <h2>Total Sum: {total}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
