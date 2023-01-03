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

# from solutions.lab1 import BigramModel, TrigramModel

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
        self.corpora = nltk.corpus.webtext.words()
        self.model = None

    def cold_start(self, input_text):
        # TODO: implement a better way to select words when invalid input is given
        return ["hello", "I", "where"]

    def predict(self, input_text):
        if not input_text:
            input_text = ""

        # as long as we don't have enough data to predict the next word...
        min_length = 1 if isinstance(self.model, BigramModel) else 2
        cold_start = len(input_text.split()) < min_length
        if cold_start:
            return self.cold_start(input_text)

        return self.model.predict(input_text)

    def train(self):
        print("Training...")
        # self.model = BigramModel(self.corpora)
        self.model = TrigramModel(self.corpora)
        print("Done training.")