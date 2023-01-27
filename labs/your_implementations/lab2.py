from collections import Counter

import nltk
import spacy
from lab_utils import LabPredictor

# TODO: import the TrigramModel you implemented in Lab 1
# I suggest you to move this to a separate "models.py" file:
from solutions.models import TrigramModel


class Lab2(LabPredictor):
    def __init__(self):
        super().__init__()

        corpus = None  # TODO: load sentences from the brown corpus
        # TODO: convert the sentences to raw text (no tokens)
        # I suggest you to select a subset for faster training
        print(f"Corpus size: {len(corpus)}")

        self.nlp = None  # TODO: load an english spacy model
        # TODO: handle the corpus with spacy
        # and extract the POS tags and words
        self.words, self.tags = [], []

        # TODO: select a strategy for cold start
        # or reuse from Lab 1

        self.model = None  # the model will be loaded in `train`

    def predict(self, text):
        print(f"Lab2 receiving: {text}")
        if not bool(text):
            return None  # TODO: apply cold start strategy

        tokens = None  # TODO: preprocess the text
        predictions = self.model.predict(tokens)

        # TODO: calculate the POS tags for the prediicted trigrams
        # IMPORTANT: you cannot simply take the POS tag of a single word
        # because the POS tag of a word depends on the context
        # -> you might need to change the output of your predictions to return the entire ngram

        # TODO: apply your own idea of using POS tags to filter the predictions
        # this could mean returning the most common POS tag for the next words, only returning verbs (if you wish to do that)
        # ... or something else entirely
        # this is an open task :-)
        filtered_predictions = []

        return filtered_predictions

    def train(self):
        # TODO: use the trigram model from Lab 1 again
        self.model = TrigramModel(self.words)

        spacy_model = "en_core_web_sm"
        print(f"Loading spaCy model {spacy_model}")
        # TODO: load only spacy models for pos tagging
        # look how up to disable unnecessary features!
        to_disable = []
        self.nlp = None
