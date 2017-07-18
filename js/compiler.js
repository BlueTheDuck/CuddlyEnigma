'use strict';

var cout = console.log;

var codeDom;

function createDom() {
    if(document.getElementById("compiled")!=null){console.error("DOM already exists");return 1};
    codeDom = document.createElement("script");
    codeDom.setAttribute("id","compiled");
    document.head.appendChild(codeDom);
    return 0;
}
/**
 * Execute [code]
 * @param {*} code 
 * @param {*} autoremove 
 * @param {codeExecCallback} cb Callback in
 */
function compile(code,autoremove) {/*return 1*/
    if(document.getElementById("compiled")==null){createDom()}
    if(autoremove!=true&&autoremove!=false)
        autoremove = true;
    var endCode = "var r; try{r = (function(){"+code+"})();}catch(e){r=false};";
    if(autoremove) {
        endCode +=";document.getElementById('compiled').remove()";
    }

    codeDom.innerHTML = endCode;
}

/**
 * 
 * @param {string} code Put code here
 * @returns {boolean} Get if valid here
 */
function syntaxCheck(code) {//TODO: Check "'" and """ names in English
    var isvalid = false;
    var pairs = [];
    var trackPairsOpen = "({[";
    var trackPairsClose = ")}]";
    var trackIpairs = "\"\'";
    for(var i=0;i<trackIpairs.length+trackPairsOpen.length;i++) {
        pairs[i] = 0;
    }
    for(var c of code) {
        cout("Tryin' to match '%s'",c);
        var i = trackPairsOpen.search("\\"+c);
        if(i!=-1) {
            cout("Found opening (%s), pairs[%i] is %i",c,i,pairs[i]);
            pairs[i] = pairs[i]+1;
            continue;
        }
        var i = trackPairsClose.search("\\"+c);
        if(i!=-1) {
            cout("Found closing (%s), pairs[%i] is %i",c,i,pairs[i]);
            if(pairs[i]==0) {
                return false,"Can't find opening for "+c;
            }
            pairs[i]--;
            continue;
        }
        var i = trackIpairs.search("\\"+c);
        if(i!=-1) {
            pairs[trackPairsOpen.length+i] = !pairs[trackPairsOpen.length+i];
            continue;
        }
    }
    for(var i=0;i<pairs.length;i++) {
        if(pairs[i]!=0) {
            return false,"Unmatching "+(trackPairsOpen+trackIpairs)[i]+". Missing "+(trackPairsClose+trackIpairs)[i];
        }
    }
    return isvalid;
}
