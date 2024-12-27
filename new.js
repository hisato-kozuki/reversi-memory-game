import a from './aaa.js'
console.log(a);
const output        = document.currentScript;
const outputTag     = document.createElement('p');
outputTag.innerHTML = 'HTML';
document.currentScript.parentNode.appendChild(outputTag);
