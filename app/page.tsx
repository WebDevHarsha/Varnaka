"use client";
import React, { useState } from 'react';

const page = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const interpretVarnikaType = (code: string): string => {
    let outputBuffer = '';
    const customConsole = {
      log: (...args: unknown[]) => { // Use 'unknown' instead of 'any'
        outputBuffer += args.join(' ') + '\n';
      }
    };

    try {
      const jsCode = code // Use 'const' instead of 'let'
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
    } catch {
      return 'goobe,naayi kann thegadhu code madu';
    }
  };

  const handleRunCode = () => {
    const result = interpretVarnikaType(code);
    setOutput(result);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">VarnikaType Interpreter</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your VarnikaType code here..."
        spellCheck={false} 
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleRunCode}
      >
        Run Code
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Output:</h2>
        <pre className="mt-2 p-2 bg-gray-100 rounded whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default page;
