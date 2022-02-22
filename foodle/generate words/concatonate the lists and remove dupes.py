import json

known_five_letter_words_file = open('total.json', 'w+')
kflv = json.load(known_five_letter_words_file)

oldpossibleguesses = kflv['oldguesses']
guesses = kflv['guesses']
words = kflv['words']

total_guess_pre1 = oldpossibleguesses + guesses
for word in total_guess_pre1:
    if word in words:
        total_guess_pre1.remove(word)

valid_guesses = list(dict.fromkeys(total_guess_pre1))


kflv['guesses'] = valid_guesses
print(kflv)
known_five_letter_words_file.write('')
json.dump(kflv, known_five_letter_words_file)
known_five_letter_words_file.close()
