import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [Length, SetLength] = useState(8);
  const [NumberAllowed, SetNumberAllowed] = useState(false);
  const [CharAllowed, SetCharAllowed] = useState(false);
  const [password, Setpassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumberAllowed) str += "1234567890";
    if (CharAllowed) str += "!@#$%^&*{}[~]";

    for (let i = 1; i <= Length; i++) { 
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    Setpassword(pass);
  }, [Length, NumberAllowed, CharAllowed]);

  const copypasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // Corrected 'Ref' to 'ref'
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [Length, NumberAllowed, CharAllowed, passwordGenerator]); // Corrected 'length' to 'Length'

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef} // Corrected 'Ref' to 'ref'
          />
        
          <button onClick={copypasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={Length}
              className="cursor-pointer"
              onChange={(e) => SetLength(e.target.value)}
            />
            <label>Length: {Length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={NumberAllowed}
              id="numberInput"
              onChange={() => {
                SetNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="charInput"
              onChange={() => {
                SetCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}
