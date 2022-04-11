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
                         'fatty', 'conch', 'savoy', 'eater', 'butch', 'eaten']

actually_food_words_that_dont_appear_in_the_dictionary_i_used = [
    'umami',
    'mirin',
    'rolls',
    'gumbo',
    'beets',
    'maple',
    'satay',
    'nacho',
    'knife',
    'grits',
    'nutty',
    'crumb',
    'tacos',
    'dashi',
    'jello',
    'mirin',
    'wings',
    'chive',
    'dried',
    'tapas',
    'beers',
    'chewy',
    'rinds',
    'yummy',
    'stock',
    'tater',
    'slice',
    'morel',
    'tuile',
    'farro',
    'saute',
    'flans',
    'oreos',
    'heinz',
    'bhaji',
    'torte',
    'crisp',
    'chips',
    'anise',
    'punch',
    'tuber',
    'ugali',
    'ladle',
    'beans',
    'spuds',
    'stove',
    'spork',
    'herbs',
    'lager',
    'seeds',
    'liver',
    'namul',
    'lassi',
    'ranch',
    'cater',
    'manti',
    'straw',
    'grain',
    'crabs',
    'jelly',
    'adobo',
    'taste',
    'pilaf',
    'mochi',
    'vegan',
    'latke',
    'queso',
    'curds',
    'roast',
    'fries',
    'chard',
    'mints',
    'minty',
    'dates',
    'clams',
    'prune',
    'aspic',
    'rujak',
    'gummy',
    'cakes',
    'baozi',
    'melty',
]
for word in not_really_food_words:
    food_words.remove(word)

for word in actually_food_words_that_dont_appear_in_the_dictionary_i_used:
    food_words.append(word)

# Fix guess list
guesses_words.append('urmom')  # your welcome Zack
guesses_words.append('jabba')  # your welcome Zack twice
guesses_words.append('soare')  # your welcome Mason

for word in food_words:
    if word in guesses_words:
        guesses_words.remove(word)

with open('../../api/data/wordlist.json', 'w+') as wlj:
    json.dump(food_words, wlj)

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
