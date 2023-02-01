from lab_utils import LabPredictor

# pylint: disable=pointless-string-statement
"""
Second Lab! POS tagging with spaCy.

- As for Lab 1, it's up to you to change anything with the structure, 
    as long as you keep the class name (Lab2, inheriting from LabPredictor)
    and the methods (predict, train)


While NLTK has pre-tagged corpora available, I want you to use spaCy to
compute POS tags on just the text (same as Lab 1),
which is more realistic for a real-world application.

An important note:
- Can you compute the POS tag from a single token, or do you need to look at the context (i.e. sentence)?

"""

class Lab2(LabPredictor):
    def __init__(self):
        super().__init__()
        corpus = []
        # TODO: select a strategy for cold start (when missing words)
        self.model = None  # the model will be loaded/made in `train`

    def predict(self, text):
        print(f"Lab2 receiving: {text}")

        # TODO: apply your own idea of using POS tags to alter/filter the predictions
        # you can also implement anything you wish from spacy.
        # there's a lot of interesting stuff in the spacy docs.

        return ["this", "is", "lab", "2"]

    def train(self) -> None:
        # TODO: use the trigram model from Lab 1 or the one provided in the solutions folder
        # TODO: NEW TO LAB 2: load spacy model for POS tagging
        pass
