from lab_utils import LabPredictor

class Lab1(LabPredictor):
    def __init__(self):
        super().__init__()

        self.dummy_words = ["hello", "hei", "hola"]

    def predict(self, input_text):
        """
        TODO: here you should implement the logic for the first lab
        - utilize n-grams and probability distribution to predict the next word
        - feel free to add any other features you think might be useful
        """
        # return self.dummy_words
        n_items = 4
        return input_text.split()[-n_items:]

    def train(self, train_data=None):
        # We will not be training any model in the first lab!
        return None