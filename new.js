import a from './aaa.js'
console.log(a);
document.write('<h1>HTML</h1>')
const output        = document.currentScript;
const outputTag     = document.createElement('h1');
outputTag.innerHTML = 'HTML';
output.parentNode.appendChild(outputTag);
