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
    def __init__(self, n_gram=1) -> None:
        print(f"Loading {n_gram}-gram model...")

    def predict(self, input_text):
        return ["predict", "some", "words"]

class BigramModel(NgramModel):
    def __init__(self) -> None:
        super().__init__(n_gram=2)

class TrigramModel(NgramModel):
    def __init__(self) -> None:
        super().__init__(n_gram=3)


# TODO: find a way to filter out which words to return (i.e. valid ones, tokens)
# TODO: determine a cold-start strategy, i.e. what to return if no input is given
# TODO: what to do when encountering never before seen combinations?
# TODO: what to do when encountering a word that is not in the vocabulary?
# --> Find similar words in the corpus?

class Lab1(LabPredictor):
    def __init__(self):
        super().__init__()
        brown_categories = ['news', 'editorial', 'reviews', 'government', 'learned', 'hobbies', 'humor']
        self.corpora = nltk.corpus.brown.categories(brown_categories)
        self.model = TrigramModel()  # TODO: the trigram model
        self.backoff_model = BigramModel()  # TODO: the bigram model as a back-off
        
        self.start_words = ["predict", "some", "words"]

    def predict(self, input_text):
        if not bool(input_text):
            # TODO: implement a better strategy for first word selection
            return self.start_words  

        # TODO: make use of the backoff model when the input is too short for trigrams
        cold_start = False
        if cold_start:
            return self.backoff_model.predict(input_text)
        # alternatively, you can switch between the tri- and bigram models
        # based on the output probabilities. This is optional.

        return self.model.predict(input_text)

    def train(self):
        print("Training...")
        # TODO: train the model and backoff_model
        print("Done training.")