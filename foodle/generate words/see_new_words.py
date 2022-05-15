import json
from typing import List

old_words: List = json.load(open('../../api/data/wordlist.json', 'r'))
new_words: List = [  # put an array of words here
]

new_words = sorted(set(new_words), key=new_words.index)
unknown_words = []
for word in new_words:
    if word not in old_words:
        unknown_words.append(word)

print(unknown_words)
