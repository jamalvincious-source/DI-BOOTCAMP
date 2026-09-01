import random
from exercise2 import Dog  # Assuming Exercise 2 code is saved in exercise2.py


class PetDog(Dog):

    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        # Extract names from Dog instances or strings passed in *args
        names = [self.name]
        for dog in args:
            if isinstance(dog, Dog):
                names.append(dog.name)
            else:
                names.append(str(dog))

        dog_names = ", ".join(names)
        print(f"{dog_names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll",
                "stands on his back legs",
                "shakes your hand",
                "plays dead",
            ]
            trick = random.choice(tricks)
            print(f"{self.name} {trick}")
        else:
            print(f"{self.name} is not trained yet!")


# Step 3: Test PetDog Methods
if __name__ == "__main__":
    dog1 = PetDog("Rex", 3, 15)
    dog2 = PetDog("Buddy", 2, 10)
    dog3 = PetDog("Max", 4, 20)

    # Test train()
    dog1.train()

    # Test play(*args) passing other PetDog instances
    dog1.play(dog2, dog3)

    # Test do_a_trick()
    dog1.do_a_trick()
    dog2.do_a_trick()  # Untrained dog test