from lab_utils import LabPredictor

""" Welcome to the first lab!

As you can see from the import above, we will be implementing a class that inherits from LabPredictor, a pattern which will be used for all labs, for consistency :-)

All this does it to ensure you implement the following:

- a "predict" method, which returns a list which will be shown in the frontend as buttons for selecting the next word(s)

- a train method, which contains all steps needed to build your model, whether it's based on simple rules or a neural network


"""

import nltk

class BigramModel:
    pass

class TrigramModel:
    pass

# TODO: find a way to filter out which words to return (i.e. valid ones, tokens)
# TODO: determine a cold-start strategy, i.e. what to return if no input is given
# TODO: what to do when encountering never before seen combinations?
# TODO: what to do when encountering a word that is not in the vocabulary?
# --> Find similar words in the corpus?

class Lab1(LabPredictor):
    def __init__(self):
        super().__init__()
        self.dummy_words = ["hello", "hei", "hola"]

        web_data = nltk.corpus.webtext.words()
        # self.model = BigramModel(web_data)
        self.model = TrigramModel(web_data)

    def predict(self, input_text):
        """
        TODO: here you should implement the logic for the first lab
        - utilize n-grams and probability distribution to predict the next word
        - feel free to add any other features you think might be useful
        """
        # n_items = 4
        # return input_text.split()[-n_items:]
        # return self.dummy_words
        if input_text == "":
            return self.dummy_words
        return self.model.predict(input_text)

    def train(self, train_data=None):
        # We will not be training any model in the first lab!
        return None