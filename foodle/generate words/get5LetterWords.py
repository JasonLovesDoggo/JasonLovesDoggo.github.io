
import json

all_words = []
five_letter_words = []
with open('./all_words.json', "r") as words:
    jsonwords = json.load(words)
    for word in jsonwords.keys():
        all_words.append(word)
for word in all_words:
    if len(word) == 5:
        five_letter_words.append(word)

print(len(five_letter_words))
with open('./5_letter_words.json', 'w+') as five:
    json.dump(five_letter_words, five)
