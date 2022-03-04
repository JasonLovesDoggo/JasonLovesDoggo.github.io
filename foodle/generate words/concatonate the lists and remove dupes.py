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

x = [
  "fresh",
  "crust",
  "serve",
  "flesh",
  "seedy",
  "corny",
  "salad",
  "spicy",
  "kebab",
  "pulpy",
  "vodka",
  "peach",
  "drink",
  "tangy",
  "sugar",
  "aroma",
  "shake",
  "spill",
  "brine",
  "sweet",
  "mince",
  "olive",
  "zesty",
  "butch",
  "scrap",
  "apron",
  "cacao",
  "bland",
  "quart",
  "smear",
  "patty",
  "hunky",
  "treat",
  "fungi",
  "booze",
  "thyme",
  "grate",
  "soggy",
  "enjoy",
  "mocha",
  "smoke",
  "lunch",
  "paste",
  "carve",
  "apple",
  "honey",
  "cream",
  "diner",
  "onion",
  "eater",
  "juicy",
  "icing",
  "eaten",
  "whisk",
  "sushi",
  "candy",
  "grape",
  "burnt",
  "dough",
  "trout",
  "filet",
  "donut",
  "bread",
  "dairy",
  "tasty",
  "puree",
  "diary",
  "penne",
  "ramen",
  "fishy",
  "steak",
  "caper",
  "pizza",
  "plate",
  "broil",
  "cumin",
  "gravy",
  "yeast",
  "cider",
  "creme",
  "grill",
  "flour",
  "beefy",
  "scone",
  "toast",
  "saucy",
  "spice",
  "feast"
]