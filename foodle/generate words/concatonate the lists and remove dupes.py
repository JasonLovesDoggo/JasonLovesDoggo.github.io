import json

with open('food_words.json', 'r') as foods:
    food_words = list(json.load(foods))
with open('5_letter_words.json', 'r') as guesses:
    guesses_words = list(json.load(guesses))

# Fix food list

not_really_food_words = ['heath', 'stink', 'grade', 'unfed', 'pound', 'belly', 'swirl', 'chill', 'retch', 'grime',
                         'pluck', 'crimp', 'whack', 'light', 'moist', 'choke', 'nasty', 'stove', 'snout', 'chunk',
                         'cheek', 'plant', 'hasty', 'trash', 'larva', 'hairy', 'tipsy', 'delve', 'glass', 'fluff',
                         'stalk', 'liver', 'cinch', 'waste', 'stein', 'vomit', 'baker', 'crave', 'opium', 'derby',
                         'stank', 'acorn', 'snail', 'poppy', 'moldy', 'molar', 'musky', 'fluid', 'hazel', 'leafy',
                         'fatty', 'conch', 'savoy', 'eater', 'butch']

actually_food_words_that_dont_appear_in_the_dictionary_i_used = []  #empty rn

for word in not_really_food_words:
    food_words.remove(word)

for word in actually_food_words_that_dont_appear_in_the_dictionary_i_used:
    food_words.append(word)

# Fix guess list

guesses_words.append('urmom')  # your welcome Zack
guesses_words.append('soare')  # your welcome Mason

for word in food_words:
    if word in guesses_words:
        guesses_words.remove(word)
results = {
    "words": food_words,
    "valid": guesses_words
}

# dump data into actual file

x = f"""const words =
{results};
export default words;"""""
with open('../src/words_5.ts', 'w') as word_ts_file:
    word_ts_file.write(x)
