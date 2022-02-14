import json

with open('known_5_letter_words.json', 'r') as known_five_letter_words_file:
    known_five_letter_words = json.load(known_five_letter_words_file)

with open('non_food_words.json', 'r') as non_food_words_file:
    non_food_words = json.load(non_food_words_file)


with open('food_words.json', 'r') as food_words_file:
    food_words = json.load(food_words_file)

all_5_letter_words = non_food_words + known_five_letter_words

for word in all_5_letter_words:
    if word in food_words:
        print(word)
        x = all_5_letter_words.pop(word)
        print(x)


valid_guesses = list(dict.fromkeys(all_5_letter_words))
print(f'{valid_guesses}')
