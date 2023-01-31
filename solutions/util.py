import re
from typing import List

from nltk import word_tokenize
from nltk.corpus import stopwords

stop = stopwords.words('english')
def filter_word(word):
    return word.lower() not in stop and word.isalnum()

def preprocess(text: str) -> List[str]:
    text = text.lower()

    text = re.sub(r"[\(\)\[\]\{\}]", "", text)
    punctuation_marks = r"([?!.,:;\-\'\#])"
    text = re.sub(punctuation_marks, r" \1 ", text)  # don't => don ' t etc

    tokens = word_tokenize(text)

    return tokens
