from typing import List, Optional
from time import time

from lab_utils import LabPredictor
from your_implementations import Lab1, Lab2, Lab3, Lab4


class LabRunner():
    def __init__(self) -> None:
        self.all_labs : List[LabPredictor] = [Lab1, Lab2, Lab3, Lab4]
        self.initialized_labs : List[Optional[LabPredictor]] = [None] * len(self.all_labs)
        self.active_lab : Optional[LabPredictor] = None
        self.current_text : str = ""

    def set_active(self, lab: int) -> None:
        if not self.initialized_labs[lab]:
            self.active_lab = self.all_labs[lab]()
        else:
            self.active_lab = self.initialized_labs[lab]

    def train(self, lab: int = 0) -> None:
        self.active_lab = self.all_labs[lab]()
        
        start = time()
        self.active_lab.train()
        print(f"Training took {round(time() - start, 2)} seconds.")

        self.initialized_labs[lab] = self.active_lab

    def predict(self, input_text: str) -> List[str]:
        if not self.active_lab:
            raise Exception("Lab not initialized")

        self.current_text = input_text
        preds = self.active_lab.predict(input_text)
        print("preds:", preds)

        return preds
