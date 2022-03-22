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

actually_food_words_that_dont_appear_in_the_dictionary_i_used = [
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
    'munch',
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
]
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

x = ['ALl words',
    ['fresh', 'crust', 'serve', 'flesh', 'seedy', 'corny', 'salad', 'spicy', 'kebab', 'pulpy', 'vodka', 'peach',
     'drink', 'tangy', 'sugar', 'aroma', 'shake', 'spill', 'brine', 'sweet', 'mince', 'olive', 'zesty', 'scrap',
     'apron', 'cacao', 'bland', 'quart', 'smear', 'patty', 'hunky', 'treat', 'fungi', 'booze', 'thyme', 'grate',
     'soggy', 'enjoy', 'mocha', 'smoke', 'lunch', 'paste', 'carve', 'apple', 'honey', 'cream', 'diner', 'onion',
     'juicy', 'icing', 'eaten', 'whisk', 'sushi', 'candy', 'grape', 'burnt', 'dough', 'trout', 'filet', 'donut',
     'bread', 'dairy', 'tasty', 'puree', 'diary', 'penne', 'ramen', 'fishy', 'steak', 'caper', 'pizza', 'plate',
     'broil', 'cumin', 'gravy', 'yeast', 'cider', 'creme', 'grill', 'flour', 'beefy', 'scone', 'toast', 'saucy',
     'spice', 'feast', 'syrup', 'maize', 'cocoa', 'mango', 'chili', 'salty', 'pesto', 'salsa', 'spoon', 'crepe',
     'water', 'briny', 'bagel', 'melon', 'pasta', 'taffy', 'basil', 'wafer', 'snack', 'bacon', 'juice', 'wheat',
     'berry', 'fruit', 'sauce', 'fried', 'baste', 'pecan', 'curry', 'lemon', 'latte', 'broth', 'guava', 'fudge',
     'femur', 'gourd', 'oreos', 'heinz', 'bhaji', 'torte', 'crisp', 'chips', 'anise', 'punch', 'tuber', 'ugali',
     'ladle', 'beans', 'spuds', 'stove', 'spork', 'herbs', 'lager', 'seeds', 'liver', 'namul', 'lassi', 'ranch',
     'cater', 'manti', 'straw', 'grain', 'crabs', 'jelly', 'adobo', 'taste', 'pilaf', 'mochi', 'vegan', 'latke',
     'munch', 'queso', 'curds', 'roast', 'fries', 'chard', 'mints', 'minty', 'dates', 'clams', 'prune', 'aspic',
     'rujak', 'gummy', 'cakes', 'baozi']]

