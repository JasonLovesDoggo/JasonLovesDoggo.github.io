import json

kflv = None
with open('food_words.json', 'r') as foods:
    food_words = list(json.load(foods))
with open('5_letter_words.json', 'r') as guesses:
    guesses_words = list(json.load(guesses))

guesses_words.append('urmom')  # your welcome Zack

for word in food_words:
    if word in guesses_words:
        guesses_words.remove(word)

foods_words = food_words
guesses = guesses_words
results = {
    'words': foods_words,
    'valid': guesses
}
results_file = open('results.json', 'w+')
json.dump(results, results_file)
