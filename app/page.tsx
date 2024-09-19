"use client";
import React, { useState, useCallback } from 'react';

const Page: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const interpretVarnika = useCallback((code: string): string => {
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
    const result = interpretVarnika(code);
    setOutput(result);
  }, [code, interpretVarnika]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-blue-600 py-6">
          <h1 className="text-3xl font-extrabold text-center text-white">Varnika Interpreter</h1>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="codeInput">
              Enter Varnika Code:
            </label>
            <textarea
              id="codeInput"
              className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Type your Varnika code here..."
              spellCheck="false"
            />
          </div>

          <button
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            onClick={handleRunCode}
          >
            Run Code
          </button>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Output:</h2>
            <pre
              className="p-4 bg-gray-50 border border-gray-200 rounded-md whitespace-pre-wrap overflow-auto max-h-48"
              id="outputBlock"
            >
              {output}
            </pre>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Syntax Examples:</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                { keyword: 'mudrisu', description: 'Print to the console', example: 'mudrisu("Hello, world!")' },
                { keyword: 'idu', description: 'Declare a variable', example: 'idu x = 10' },
                { keyword: 'adre', description: 'If statement', example: 'adre (x > 5)' },
                { keyword: 'ildidare', description: 'Else if statement', example: 'ildidare (x < 10)' },
                { keyword: 'allade', description: 'Else statement', example: 'allade' },
                { keyword: 'salluvagi', description: 'For loop', example: 'salluvagi (i = 0; i < 10; i = i + 1)' },
                { keyword: 'agoVarigu', description: 'While loop', example: 'agoVarigu (x < 10)' },
              ].map(({ keyword, description, example }) => (
                <li key={keyword} className="bg-gray-50 rounded-md p-3 shadow-sm">
                  <span className="font-bold text-blue-600">{keyword}</span> - {description}<br />
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">{example}</code>
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