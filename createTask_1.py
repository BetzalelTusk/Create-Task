BOARD = []
Dimension = 4
gameStat = True
score = 0

def initBoard():
    for i in range(Dimension):
        BOARD.append([])
        for j in range(Dimension):
            BOARD[i].append(9)

initBoard()