import nltk
from lab_utils import LabPredictor

# pylint: disable=pointless-string-statement
""" Welcome to the first lab!
As you can see from the import above,
we will be implementing a class that inherits from LabPredictor,
a pattern which will be used for all labs, for consistency :-)

All this does it to ensure you implement the following:

- a "predict" method, which returns a list which will be shown in the frontend
    as buttons for selecting the next word(s)

- a train method, which contains all steps needed to build your model,
    whether it's based on simple rules or a neural network
"""
# pylint: disable=too-few-public-methods
class NgramModel:
    def __init__(self, corpora, n_gram) -> None:
        print(f"Loading {n_gram}-gram model...")

    def predict(self, input_text):
        return ["predict", "some", "words"]

class BigramModel(NgramModel):
    def __init__(self, corpora) -> None:
        super().__init__(corpora, 2)

class TrigramModel(NgramModel):
    def __init__(self, corpora) -> None:
        super().__init__(corpora, 3)

from solutions.lab1 import BigramModel, TrigramModel

# TODO: find a way to filter out which words to return (i.e. valid ones, tokens)
# TODO: determine a cold-start strategy, i.e. what to return if no input is given
# TODO: what to do when encountering never before seen combinations?
# TODO: what to do when encountering a word that is not in the vocabulary?
# --> Find similar words in the corpus?

class Lab1(LabPredictor):
    def __init__(self):
        super().__init__()
        # corpora = \
        #     nltk.corpus.gutenberg.words() +\
        #     nltk.corpus.brown.words() +\
        #     nltk.corpus.webtext.words()
        corpora = nltk.corpus.gutenberg
        self.corpora_words = corpora.words()

        # calculate most common starting word in sentences:
        n_most_common_startwords = nltk.FreqDist(
            [sent[0] for sent in corpora.sents()]).most_common(4)
        self.most_common_startwords = [word for word, _ in n_most_common_startwords]
        print("most_common_startword:", self.most_common_startwords)
        
        self.model = None
        self.backoff_model = None

    def predict(self, input_text):
        if not bool(input_text):
            return self.most_common_startwords

        # as long as we don't have enough data to predict the next word...
        min_length = 1 if isinstance(self.model, BigramModel) else 2
        # TODO: implement a better way to select words when invalid input is given
        if len(input_text.split()) < min_length:
            return self.backoff_model.predict(input_text)

        return self.model.predict(input_text)

    def train(self):
        print("Training...")
        self.model = TrigramModel(self.corpora_words)
        self.backoff_model = BigramModel(self.corpora_words)
        print("Done training.")