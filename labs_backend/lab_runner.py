from lab1 import Lab1
from lab2 import Lab2
from lab3 import Lab3
from lab4 import Lab4

class LabRunner():
    def __init__(self) -> None:
        self.lab1 = Lab1()
        self.lab2 = Lab2()
        self.lab3 = Lab3()
        self.lab4 = Lab4()
    
    def predict(self, input_text: str):
        preds = {
            "lab1": self.lab1.predict(input_text),
            "lab2": self.lab2.predict(input_text),
            "lab3": self.lab3.predict(input_text),
            "lab4": self.lab4.predict(input_text),
        } 
        return preds
