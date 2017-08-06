/*
TODO:
Add remove() method!
Add interpreter
Moar block types
Add desktop test
Add converter BlockCode > JS & C++ (? more languages)
Add compiler
Clean code

*/


var cout = console.log;

var nextBlockId = 0;
var blocks = [];
var blockOnHand = -1;//ID of block grabbed
var positions = {
    "if": {
        "t": 0,
        "f": 1,
        "out": 2
    },
    "e": {
        "out": 0
    },
    "s": {
        "out": 0
    },
    undefined: {
        "out": 0
    }
}

class CodeBlock {
    
    /**
     * 
     * @param {string} t - Type of block: E,S,IF.
     */
    setType(t) {//E;S;IF... TODO: Add more types
        var type = t.toLowerCase();
        this.props.type = type;
        this.block.setAttribute("class","block "+type);
        if(positions[t]==undefined) {throw Error("Invalid blocktype");}
        switch(type) {
            case 'e':
            case 's':
                this.type.style.display = "";
                this.type.innerText = t;
                break;
            case 'if':
                this.type.style.display = "none";
                /*this.props.joints[0] = {x:0,y:0};
                this.props.joints[1] = {x:this.props.size.width/2,y:0};*/
                break;
        }
    }
    
    /**
     * Append DOM (child) to this element.
     * @param {HTMLElement} child - DOM to be appended
     * @param {string} where - Depending on appending block, can vary values. Where to append
     */
    addChild(child,where) {
        if(!(child instanceof CodeBlock)) {
            throw Error("Tried to childate a not childable child XD haha imsofuny");
        }
        var pos = positions[this.type.value];
        if(where==undefined) {
            console.log("No position defined");
            for(var p in pos) {
                if(this.props.children[pos[p]]==undefined) {
                    this.addChild(child,p);
                    console.log("Found place at "+p);
                    return;
                }
            }
        }
        //switch(where){case 'T':case'F':case'OUT':break;default:throw Error("Invalid 'where'");}
        //var childObj = blocks[Number(child.id)];
        if(this.props.type=="if") {
            if(this.props.children[pos[where]]!=undefined) {
                this.props.children[pos[where]] = child;
            }
            if(where.match(/^(T|F)$/gi)) {
                child.style.left = this.props.joints[pos[where]];
                child.classList+=" "+where.toLowerCase();
                this.block.appendChild(child);
            } else if(where=="OUT") {
                this.block.parentElement.appendChild(child);
            }
        }
        if(this.props.type=="s"||this.props.type=="e") {
            if(this.props.children[pos[where]] instanceof CodeBlock) {
                throw Error("Space "+where+" already occupied. Can't append child");
            }
            this.props.children[pos[where]] = child;
            this.block.parentElement.appendChild(child.block);
        }
    }

    /**
     * @param {Object} type Parent, type
     */
    constructor(options) {
        if(options!=undefined) {
            var parent = options.parent;
            var type = options.type;
        }
        ///DOMs\\\
        this.block = document.createElement("div");
        this.type = document.createElement("sub");
        this.value = document.createElement("textarea");
        //Their classes and props
        this.block.setAttribute("class","block");
        this.block.setAttribute("id",nextBlockId++)
        this.type.setAttribute("class","type");
        this.value.setAttribute("class","value");
        //Append
        this.block.appendChild(this.value);
        this.block.appendChild(this.type);
        //Object stuff
        this.props = {};
        //this.props.type = type||"s";
        this.setType(type||"s");
        //These are not needed. Probably...
        this.props.size = {width:200,height:45};
        this.props.joints = [{x:0,y:0}];//Normal blocks have 1 joint, but IF, while, do-while and for have more than one
        this.props.position = undefined;//If it's undefined, then it doesn't need correction
        this.props.children = [];//Here we'll save references to its children.
        if(parent!=undefined&&parent instanceof CodeBlock) {
            
            //KEEP WORKIN' HERE
            let parType = parent.props.type;
            let childTypes = positions[parType];
            if(parent.props.children.length==childTypes.length) {
                throw Error("Parent has achieved max childrens");
            }
            parent.addChild(this);
            console.log("Addin' child");
            /*for(p in childTypes) {
                if(parent.props.child[p]!=undefined) {
                    parent.props.child[p] = this;
                    break;
                }
            }*/
        }
        this.props.parent = parent;
        //Event handlers
        this.value.onmousedown = function() {//Set the ID of block being modified
            blockOnHand = Number(event.srcElement.parentElement.getAttribute("id"));
        }
        //Position correction
        if(nextBlockId!=1&&parent!=undefined) {//Fortunatly we could do this with CSS... I can't believe it worked
        }
        blocks.push(this);
    }
}

function positionCorrector() {//As mayor browsers don't support resize events, I'll attach this event to window
    if(blockOnHand==-1)return;
    blocks[blockOnHand].props.size.height = event.srcElement.parentElement.getBoundingClientRect().height;
    blocks[blockOnHand].props.joints[blocks[blockOnHand].props.joints.length-1].y = event.srcElement.parentElement.getBoundingClientRect().height;
    console.log("Block %i",blockOnHand);
    var parentId = Number(blocks[blockOnHand].props.parent.id);
    var parentBlock = blocks[parentId];
    console.log("Parent is type '%s'",parentBlock.props.type);
    if(parentBlock.props.type=="if") {
        for(var i=0;i<2;i++) {
            console.log(parentBlock);
            if(parentBlock.props.children[i].id==blockOnHand)continue;
            console.log(parentBlock.props.children[i]);
            var b = Number(parentBlock.props.children[i].id);
            blocks[b].value.style.height = blocks[blockOnHand].value.style.height;
        }
    } else {
        console.log("No position correction needed");
    }
    blockOnHand = -1;
}
window.addEventListener("mouseup",positionCorrector);