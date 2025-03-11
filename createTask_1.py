BOARD = []
Dimension = 4
gameStat = True
score = 0

#-------Function Definition Central-------#

def init():
    global BOARD  # Ensures we're modifying the global BOARD
    BOARD = [[0] * Dimension for _ in range(Dimension)]
    print(BOARD)

userInput = input("Which direction would you like to move in? Right, Left, Up, or Down? ")

def move():
    if userInput.lower() == "right":  # Now it correctly converts input to lowercase
        print("Success")
    else:
        print("Failure")


#-------Function Call Central-------#
init()
move()
