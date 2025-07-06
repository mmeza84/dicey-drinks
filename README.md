# Dicey Drinks

## A utility to track dice rolls for randomly generated drinks!

### Configuration

Items are separated into 3 categories:

- Spirits - These are all the liquors, anything over ~15% ABV.
- Mixers - Any lightly alcoholic/non-alcoholic drinks, juices, etc.
- Flair - Currently just glitter, but will add the ability to roll for different flair.

### Roll

- Step 1: Roll a d4 to determine the drink type (even: cocktail, odd: shot).
- Step 2: If shots, roll a d4 to determine the spirit count (1-4). If cocktails, roll a d6 to determine the spirit count (1-6).
- Step 3: Roll a d4/6/8/10/12/20 to determine the spirits (based on how many spirits are available, round down to nearest dice).
- Step 4: Roll a d4 to determine the mixer count (1-4).
- Step 5: Roll a d4/6/8/10/12/20 to determine the mixers (based on how many mixers are available, round down to nearest dice).
- Step 6: Roll a d4 to determine if flair is included (even: included).
