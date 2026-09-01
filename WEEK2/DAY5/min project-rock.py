#!/usr/bin/env python3
"""
Card Game - Deck Management System
"""
# pyright: reportUndefinedVariable=false
import random


class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __str__(self):
        return f"{self.value} of {self.suit}"


class Deck:
    SUITS = ("Hearts", "Diamonds", "Clubs", "Spades")
    VALUES = ("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K")

    def __init__(self):
        """Initializes the deck with all 52 cards."""
        self.cards = []
        self.reset_deck()

    def reset_deck(self):
        """Resets the deck back to a full 52-card standard set."""
        self.cards = [Card(suit, value) for suit in self.SUITS for value in self.VALUES]

    def shuffle(self):
        """Ensures the deck has all 52 cards and rearranges them randomly."""
        if len(self.cards) != 52:
            self.reset_deck()
        random.shuffle(self.cards)

    def deal(self):
        """Deals a single card from the deck and removes it from the list.
        Returns None if the deck is empty."""
        if len(self.cards) == 0:
            print("The deck is empty. No cards left to deal.")
            return None

        return self.cards.pop()


if __name__ == "__main__":
    my_deck = Deck()
    print(f"Initial deck size: {len(my_deck.cards)} cards")

    my_deck.shuffle()
    print("Deck has been shuffled.")

    print("\nDealing 3 cards:")
    for _ in range(3):
        dealt_card = my_deck.deal()
        print(f"Dealt: {dealt_card}")

    print(f"\nRemaining cards in deck: {len(my_deck.cards)}")