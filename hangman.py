import re

f_in = open('lemmad2013.txt', 'r')
f_out = open('hangman.txt', 'w')

words = f_in.readlines()

pattern = r"^[abdefghijklmopršzžtuvõäöü\-]+$"

for w in words:
    w = w.strip()
    if len(w) >= 5 and re.match(pattern, w):
        f_out.write(w + '\n')