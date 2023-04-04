function prepareDBQuery(word, response) {
  let parameters = {
    word: word,
    partOfSpeech1: null,
    definition1: null,
    synonyms1: null,
    antonyms1: null,
    partOfSpeech2: null,
    definition2: null,
    synonyms2: null,
    antonyms2: null,
  };
  console.log('Reaching here');
  console.log(`Response : ${response}`);
  if (response.length >= 2) {
    parameters.partOfSpeech1 = response[0].partOfSpeech;
    parameters.definition1 = response[0].definitions[0].definition;
    parameters.synonyms1 = response[0].synonyms.join(',');
    parameters.antonyms1 = response[0].antonyms.join(',');
    parameters.partOfSpeech2 = response[1].partOfSpeech;
    parameters.definition2 = response[1].definitions[0].definition;
    parameters.synonyms2 = response[1].synonyms.join(',');
    parameters.antonyms2 = response[1].antonyms.join(',');
  } else if (response.length == 1) {
    parameters.partOfSpeech1 = response[0].partOfSpeech;
    parameters.definition1 = response[0].definitions[0].definition;
    parameters.synonyms1 = response[0].synonyms.join(',');
    parameters.antonyms1 = response[0].antonyms.join(',');
  }

  return parameters;
}

module.exports = prepareDBQuery;
