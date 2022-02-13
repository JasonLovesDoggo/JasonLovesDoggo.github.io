import json
from tkinter import *
from tkinter import messagebox


class App:
    def __init__(self, root):
        self.root = root
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        self.backs = 0
        self.prev = []  # True means last word was a food word False means not
        self.food_words = []
        self.non_food_words = []
        self.list = json.load(
            open('./5_letter_words.json', 'r')
        )
        self.text = Label(self.root, text=self.list[0])
        self.yes = Button(self.root, text="Yes", command=self.yes_func)
        self.no = Button(self.root, text="No", command=self.no_func)
        self.save = Button(self.root, text="save word lists", command=self.save_func)
        self.back = Button(self.root, text='Back', command=self.back_func)
        self.text.pack()
        self.yes.pack()
        self.no.pack()
        self.save.pack()
        self.back.pack()

    def on_closing(self):
        if messagebox.askokcancel("Quit", "Do you want to quit?"):
            if messagebox.askokcancel("Quit", "Are you sure you want to quit?"):
                self.save_func()
                root.destroy()

    def back_func(self):
        self.backs += 1
        print(f'{self.backs=}')
        print(f'{self.prev=}')
        if self.prev[abs(self.backs)]:
            del self.food_words[-1]
        else:
            del self.non_food_words[-1]
        del self.prev[-1]
        self.text.configure(text=self.list[self.list.index(self.text.cget("text")) - 1])

    def save_func(self):
        print(f'{self.food_words=}')
        print(f'{self.non_food_words=}')
        # food list
        with open('./food_words.json', 'w+') as food_words_file:
            json.dump(self.food_words, food_words_file)

        # non food list
        with open('./non_food_words.json', 'w+') as non_food_words_file:
            json.dump(self.non_food_words, non_food_words_file)

    def yes_func(self):
        self.backs = 0
        self.prev.append(True)
        text = self.text.cget("text")
        self.food_words.append(text)
        try:
            self.text.configure(text=self.list[self.list.index(self.text.cget("text")) + 1])
        except IndexError:
            self.yes.destroy()
            self.no.destroy()
            self.text.configure(text="You got through all the words!")

    def no_func(self):
        self.backs = 0
        self.prev.append(False)
        text = self.text.cget("text")
        self.non_food_words.append(text)
        try:
            self.text.configure(text=self.list[self.list.index(self.text.cget("text")) + 1])
        except IndexError:
            self.yes.destroy()
            self.no.destroy()
            self.text.configure(text="You got through all the words!")


root = Tk()


App(root)
root.mainloop()
