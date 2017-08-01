var code = document.getElementById("code");

/*var parBlock = new CodeBlock();
parBlock.setType("IF");
parBlock.setCode("true");
code.appendChild(parBlock.getDOM());

var blockChan = new CodeBlock(parBlock.getDOM());
blockChan.setType("S");
blockChan.setCode("\"Compile me senpai\"");

var falseBlock = new CodeBlock(parBlock.getDOM());
falseBlock.setType('E');
falseBlock.setCode("x");

var blockSenpai = new CodeBlock(parBlock.getDOM());
blockSenpai.setType("S");
blockSenpai.setCode("'Sory, I cant'");

parBlock.addChild(blockChan.getDOM(),'T');
parBlock.addChild(falseBlock.getDOM(),'F');
parBlock.addChild(blockSenpai.getDOM(),'OUT');

var code = {};
//When you are so bored...
function compileBlockChan() {
    console.log("Senpai: I will compile you, blockChan");
    var b = parBlock;
    while(b.props.children!=undefined) {
        console.log(b);
        b = b.props.children[2];
    }
}*/
var parBlock = new CodeBlock();
code.appendChild(parBlock.getDOM());
var sonBlock = new CodeBlock({parent:parBlock});