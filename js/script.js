var code = document.getElementById("code");

var parBlock = new CodeBlock();
parBlock.setType("IF");
parBlock.setCode("true");
code.appendChild(parBlock.getDOM());

var trueBlock = new CodeBlock(parBlock.getDOM());
trueBlock.setType("S");
trueBlock.setCode("\"Compile me senpai\"");
var falseBlock = new CodeBlock(parBlock.getDOM());
falseBlock.setType('E');
falseBlock.setCode("x");
var outBlock = new CodeBlock(parBlock.getDOM());
outBlock.setType("S");
outBlock.setCode("'Sory, I cant'");

parBlock.addChild(trueBlock.getDOM(),'T');
parBlock.addChild(falseBlock.getDOM(),'F');
parBlock.addChild(outBlock.getDOM(),'OUT');
/*

code.appendChild(trueBlock.getDOM());
trueBlock.setType("S");

code.appendChild(falseBlock.getDOM());
falseBlock.setType("E");
*/
//var lasBlock = new CodeBlock(parBlock.getDOM());