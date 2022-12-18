from typing import List
from lab1 import Lab1
from lab2 import Lab2
from lab3 import Lab3
from lab4 import Lab4

class LabRunner():
    def __init__(self) -> None:
        self.all_labs = [Lab1(), Lab2(), Lab3(), Lab4()]
    
    def predict(self, input_text: str, lab: int = 0) -> List[str]:
        preds = self.all_labs[lab].predict(input_text)
        return preds
