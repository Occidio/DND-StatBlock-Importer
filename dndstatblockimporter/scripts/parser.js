const sections = ["base", "features", "actions"]
let parsedData = {}
const baseKeywords = ["Armor Class", "Hit Points", "Speed", "STR", "DEX", "CON", "INT", "WIS", "CHA", "Damage Immunities", "Condition Immunities", "Senses", "Languages", "Challenge"]

function format() {
  var inputElement = document.getElementById('inputStatBlock');
  parsedData = {}

  parseBase(inputElement.value);
  // var featuresResult, noFeaturesInput = parseFeatures(noBaseInput);
  // var actionResult = parseActions(noFeaturesInput);
  // console.log(noBaseInput)
}

function matchFollowingDigits(preceedingString, fullBase) {
  let pattern = preceedingString + "[\\n| ](\\d+)"
  let match = new RegExp(pattern).exec(fullBase)

  if (match) {
    return match[1]
  } else {
    console.log("Could not find " + preceedingString)
  }
}

function matchCommaListOfString(preceedingString, fullBase) {
  let pattern = preceedingString + "\\s([a-zA-Z]+.*(?:,\\s[a-zA-Z]+.*)?|\\n)"
  let match = new RegExp(pattern).exec(fullBase)

  if (match) {
    return match[1].split(',')
  } else {
    console.log("Could not find " + preceedingString)
  }
}

//I hope you like RegExp
function parseBase(inputStatBlock) {
  //name
  parsedData["name"] = /^(.*)/g.exec(inputStatBlock)[0]

  //AC "Armor Class (\d+)"
  parsedData["ac"] = matchFollowingDigits("Armor Class", inputStatBlock)

  //HP "Hit Points (\d+)"
  parsedData["hp"] = matchFollowingDigits("Hit Points", inputStatBlock)

  //Speed "Speed (\d+)"
  parsedData["speed"] = matchFollowingDigits("Speed", inputStatBlock)

  //Attr "STR\n(\d+)"
  parsedData.attr = {};
  parsedData.attr["str"] = matchFollowingDigits("STR", inputStatBlock)
  parsedData.attr["dex"] = matchFollowingDigits("DEX", inputStatBlock)
  parsedData.attr["con"] = matchFollowingDigits("CON", inputStatBlock)
  parsedData.attr["wis"] = matchFollowingDigits("WIS", inputStatBlock)
  parsedData.attr["int"] = matchFollowingDigits("INT", inputStatBlock)
  parsedData.attr["cha"] = matchFollowingDigits("CHA", inputStatBlock)

  //Saving Throws "Saving Throws\s([a-zA-Z]+.*,\s[a-zA-Z]+.*)"
  specificThrows = matchCommaListOfString("Saving Throws", inputStatBlock)

  if (specificThrows) {
    parsedData.savingthrows = {}
    specificThrows.forEach(function (savingThrow, index) {
      specificThrowMatch = /(\w+)\s(\+|\-)(\d+)/g.exec(savingThrow);
      parsedData.savingthrows[index] = {}
      parsedData.savingthrows[index].attr = specificThrowMatch[1]
      parsedData.savingthrows[index].sign = specificThrowMatch[2]
      parsedData.savingthrows[index].value = specificThrowMatch[3]
    })
  }

  //Skills "Skills\s(\w+)\s\+(\d+)[,|\n]\s(\w+)\s\+(\d+)"
  specificSkills = matchCommaListOfString("Skills", inputStatBlock)

  if (specificSkills) {
    parsedData.skills = {}
    specificSkills.forEach(function (skill, index) {
      skillMatch = /(\w+)\s(\+|\-)(\d+)/g.exec(skill);
      parsedData.skills[index] = {}
      parsedData.skills[index].skill = skillMatch[1]
      parsedData.skills[index].sign = skillMatch[2]
      parsedData.skills[index].value = skillMatch[3]
    })
  }

  //DR split(',')
  specificDR = matchCommaListOfString("Damage Resistances", inputStatBlock)

  if (specificDR) {
    parsedData.DamageResistances = {}
    specificDR.forEach(function (dr, index) {
      parsedData.DamageResistances[index] = dr.trim()
    })
  }

  //DI split(',')
  specificDI = matchCommaListOfString("Damage Immunities", inputStatBlock)

  if (specificDI) {
    parsedData.damageImmunities = {}
    specificDI.forEach(function (di, index) {
      parsedData.damageImmunities[index] = di.trim()
    })
  }

  //CI split(',')
  specificCI = matchCommaListOfString("Condition Immunities", inputStatBlock)

  if (specificCI) {
    parsedData.conditionImmunities = {}
    specificCI.forEach(function (ci, index) {
      parsedData.conditionImmunities[index] = ci.trim()
    })
  }

  //Senses "Senses\s([a-zA-Z0-9]+.*,\s[a-zA-Z0-9]+.*)" then split(,)
  specificSenses = matchCommaListOfString("Senses", inputStatBlock)

  if (specificSenses) {
    parsedData.senses = {}
    specificSenses.forEach(function (sense, index) {
      parsedData.senses[index] = sense.trim()
    })
  }

  //Languages split(',')
  specificLang = matchCommaListOfString("Languages", inputStatBlock)

  if (specificLang) {
    parsedData.languages = {}
    specificLang.forEach(function (language, index) {
      parsedData.languages[index] = language.trim()
    })
  }

  //Challenge "Challenge\s(\d+)"
  parsedData.cr = matchFollowingDigits("Challenge", inputStatBlock)

  // var indexOfLastBracketInChallenge = keywordPositions["Challenge"] + inputStatBlock.substring(keywordPositions["Challenge"], inputStatBlock.length).indexOf(')') + 1;

  // return inputStatBlock.substring(indexOfLastBracketInChallenge, inputStatBlock.length);
}

function compare(a, b) {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }
  return 0;
}