/*
TODO:
Add interpreter
Moar block types
Add desktop test
Add converter BlockCode > JS & C++ (? more languages)
Add compiler
Clean code

*/

cout = console.log;

var nextBlockId = 0;
var blocks = [];

class CodeBlock {
    /**
     * 
     * @param {string} type 
     * @param {HTMLElement} parent 
     */
    constructor(type,parent) {
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
        this.props.size = {width:200,height:45};
        this.props.joints = [{x:0,y:0}];//Normal blocks have 1 joint, but IF, while, do-while, for have more than one
        this.props.position = undefined;//If it's undefined, then it doesn't need correction
        this.props.children = [];//Here we'll save references to its children.
        /*
        IF:
            children[0] is True
            children[1] is False
            children[2] is OUT
        */
        this.props.parent = parent;
        //Event handlers
        this.value.onmouseup = function() {
            var id = Number(event.srcElement.parentElement.getAttribute("id"));
            blocks[id].props.size.height = event.srcElement.parentElement.getBoundingClientRect().height;
            blocks[id].props.joints[blocks[id].props.joints.length-1].y = event.srcElement.parentElement.getBoundingClientRect().height;
            console.log("Block %i",id);
        }
        //Position correction
        if(nextBlockId!=1&&parent!=undefined) {//Fortunatly we could do this with CSS... I can't believe it worked
            /*var prev = blocks[Number(parent.id)];
            if(prev.props.type=="IF") {
                cout("It seems like we are inside an IF");
                this.block.style.display = "table-cell";
                this.block.style.width = "100px";
            }*/
        }
        //Save on arr
        blocks.push(this);
    }
    /**
     * 
     * @param {string} t - Type of block
     */
    setType(t) {//E;S;... TODO: Add more types
        var type = t.toLowerCase();
        this.props.type = type;
        this.block.setAttribute("class","block "+type);
        switch(t) {
            case 'E':
            case 'S':
                this.type.innerText = t;
                break;
            case 'IF':
                this.type.remove();
                this.props.joints[0] = {x:0,y:0};
                this.props.joints[1] = {x:this.props.size.width/2,y:0};
                break;
        }
    }
    addChild(child,where) {
        if(!(child instanceof HTMLElement)) {
            throw Error("Tried to childate a not childable child XD jaja imsofuny");
        }
        switch(where){case 'T':case'F':case'OUT':break;default:throw Error("Invalid 'where'");}
        var childObj = blocks[Number(child.id)];
        if(this.props.type=="if") {
            let pos = {T:0,F:1,OUT:2}
            this.props.children[pos[where]] = child;
            if(where=='T'||where=='F') {
                child.style.left = this.props.joints[pos[where]];
                child.classList+=" "+where.toLowerCase();
                this.block.appendChild(child);
            } else {
                this.block.parentElement.appendChild(child);
            }
        }
    }
    remove() {

    }

    getDOM() {
        return this.block;
    }
    getCode() {
        return this.value.value;
    }
    setCode(code) {
        this.value.value = code;
    }
}
