"use client";
import React, { useState, useCallback } from 'react';

const Page: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const interpretVarnaka = useCallback((code: string): string => {
    let outputBuffer = '';
    const customConsole = {
      log: (...args: unknown[]) => {
        outputBuffer += args.join(' ') + '\n';
      }
    };

    try {
      const jsCode = code
        .replace(/mudrisu/g, 'customConsole.log')
        .replace(/agoVarigu/g, 'while')
        .replace(/salluvagi/g, 'for')
        .replace(/mattu/g, '&&')
        .replace(/athava/g, '||')
        .replace(/adre/g, 'if')
        .replace(/ildidare/g, 'else if')
        .replace(/allade/g, 'else')
        .replace(/idu\s+(\w+)\s*=\s*([^;\n]+)/g, 'let $1 = $2');

      new Function('customConsole', jsCode)(customConsole);
      return outputBuffer || 'No output';
    } catch (error) {
      console.error(error);
      return 'goobe,naayi, kann thegadhu code madu';
    }
  }, []);

  const handleRunCode = useCallback(() => {
    const result = interpretVarnaka(code);
    setOutput(result);
  }, [code, interpretVarnaka]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-yellow-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-red-600 py-8">
          <h1 className="text-4xl font-extrabold text-center text-yellow-300">Varnaka Interpreter</h1>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <label className="block text-xl font-medium text-gray-800 mb-3" htmlFor="codeInput">
              Enter Varnaka Code:
            </label>
            <textarea
              id="codeInput"
              className="w-full h-56 p-4 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out text-lg"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Type your Varnaka code here..."
              spellCheck="false"
            />
          </div>

          <button
            className="w-full px-6 py-3 bg-red-600 text-yellow-300 text-xl font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
            onClick={handleRunCode}
          >
            Run Code
          </button>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Output:</h2>
            <pre
              className="p-5 bg-gray-100 border-2 border-yellow-400 rounded-lg whitespace-pre-wrap overflow-auto max-h-56 text-lg"
              id="outputBlock"
            >
              {output}
            </pre>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Syntax Examples:</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { keyword: 'mudrisu', description: 'Print to the console', example: 'mudrisu("Hello, world!")' },
                { keyword: 'idu', description: 'Declare a variable', example: 'idu x = 10' },
                { keyword: 'adre', description: 'If statement', example: 'adre (x > 5)' },
                { keyword: 'ildidare', description: 'Else if statement', example: 'ildidare (x < 10)' },
                { keyword: 'allade', description: 'Else statement', example: 'allade' },
                { keyword: 'salluvagi', description: 'For loop', example: 'salluvagi (i = 0; i < 10; i = i + 1)' },
                { keyword: 'agoVarigu', description: 'While loop', example: 'agoVarigu (x < 10)' },
              ].map(({ keyword, description, example }) => (
                <li key={keyword} className="bg-yellow-100 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 ease-in-out">
                  <span className="font-bold text-red-600 text-lg">{keyword}</span>
                  <p className="text-gray-700 mb-2">{description}</p>
                  <code className="bg-white px-2 py-1 rounded text-sm border border-yellow-400">{example}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;