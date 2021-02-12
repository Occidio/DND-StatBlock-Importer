const sections = ["base", "features", "actions"]
const parsedData = {}
const baseKeywords = ["Armor Class", "Hit Points", "Speed", "STR", "DEX", "CON", "INT", "WIS", "CHA", "Damage Immunities", "Condition Immunities", "Senses", "Languages", "Challenge"]

function format() {
    var inputElement = document.getElementById('inputStatBlock');

    var noBaseInput = parseBase(inputElement.value);
    // var featuresResult, noFeaturesInput = parseFeatures(noBaseInput);
    // var actionResult = parseActions(noFeaturesInput);
    console.log(noBaseInput)
}

function parseBase(inputStatBlock) {
    //name
    parsedData.name = parseName(inputStatBlock);

    //AC "Armor Class (\d+)"
    let acRegex = /Armor Class (\d+)/g
    parsedData.ac = acRegex.exec(inputStatBlock)[1];

    //HP "Hit Points (\d+)"
    let hpRegex = /Hit Points (\d+)/g
    parsedData.hp = hpRegex.exec(inputStatBlock)[1];
 
    //Speed "Speed (\d+)"
    let speedRegex = /Speed (\d+)/g
    parsedData.speed = speedRegex.exec(inputStatBlock)[1];

    //Attr "STR\n(\d+)"
    parsedData.attr = {};
    parsedData.attr.str = /STR\n(\d+)/g.exec(inputStatBlock)[1];
    parsedData.attr.dex = /DEX\n(\d+)/g.exec(inputStatBlock)[1];
    parsedData.attr.con = /CON\n(\d+)/g.exec(inputStatBlock)[1];
    parsedData.attr.wis = /WIS\n(\d+)/g.exec(inputStatBlock)[1];
    parsedData.attr.int = /INT\n(\d+)/g.exec(inputStatBlock)[1];
    parsedData.attr.cha = /CHA\n(\d+)/g.exec(inputStatBlock)[1];

    //Saving Throws "Saving Throws\s([a-zA-Z0-9]+.*,\s[a-zA-Z0-9]+.*)""
    // parsedData.savingthrows = {}
    
    // let stRegex = /Saving Throws\s([a-zA-Z0-9]+.*,\s[a-zA-Z0-9]+.*)/g.exec(inputStatBlock)[1];
    // let specificThrowRegex = /(\w{3})\s\+(\d+)/g.exec(stRegex);
    // parsedData.savingthrows.specificThrowRegex[1] = specificThrowRegex[2]

    //Skills "Skills\s(\w* \+\d+)(,\s*\w* \+\d+)*"

    //DR split(',')

    //DI split(',')

    //CI split(',')

    //Senses "Senses\s([a-zA-Z0-9]+.*,\s[a-zA-Z0-9]+.*)" then split(,)

    //Languages split(',')

    //Challenge "Challenge\s(\d+)"

    // var indexOfLastBracketInChallenge = keywordPositions["Challenge"] + inputStatBlock.substring(keywordPositions["Challenge"], inputStatBlock.length).indexOf(')') + 1;

    // return inputStatBlock.substring(indexOfLastBracketInChallenge, inputStatBlock.length);
}

function compare( a, b ) {
    if ( a.index < b.index ){
      return -1;
    }
    if ( a.index > b.index ){
      return 1;
    }
    return 0;
  }
  

function parseName(inputStatBlock){
    var indexOfFirstNewLine = inputStatBlock.indexOf("\n");
    return inputStatBlock.slice(0,indexOfFirstNewLine).trim();
}