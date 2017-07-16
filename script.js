var code = document.getElementById("code");

var parBlock = new CodeBlock();
code.appendChild(parBlock.getDOM());
parBlock.setType("IF");

var trueBlock = new CodeBlock(parBlock.getDOM());
var falseBlock = new CodeBlock(parBlock.getDOM());
var outBlock = new CodeBlock(parBlock.getDOM());

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