f_in = open('lemmad2013.txt', 'r')
f_out = open('words.txt', 'w')

words = f_in.readlines()

for w in words:
    w = w.strip()
    if len(w) == 5 and w.isalpha() and all(x.islower() and not x in ['c', 'q', 'w', 'x', 'y'] for x in w):
        f_out.write(w + '\n')