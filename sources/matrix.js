var matrix = {
    adjugate: function (matrix) {
        /*create empty 2d array for adjugated matrix*/
        var adjugatedmatrix = [];
        for (var i in matrix) {
            adjugatedmatrix.push([]);
        }
        /*Adjugate matrix*/
        for (var i in matrix) {
            for (var j in matrix[i]) {
                adjugatedmatrix[j][i] = matrix[i][j];
            }
        }
        return adjugatedmatrix;
    },

    inverse: function (oldmatrix) {
        /*Step one - Matrix of Minors*/
        var matrixOfMinors = new Array(matrix.length);
        for (var i in oldmatrix) {
            matrixOfMinors[i] = [];
            for (var j in oldmatrix) {
                tempmatrix = [];
                for (var k in oldmatrix) {
                    tempmatrix[k] = oldmatrix[k].slice(0);
                }
                tempmatrix.splice(i, 1);
                for (var k in tempmatrix) {
                    tempmatrix[k].splice(j, 1);
                }
                matrixOfMinors[i][j] = this.determinant(tempmatrix);
            }
        }
        /*Step Two - Matrix of Cofactors*/
        var matrixOfCofactors = [];
        for (var i in oldmatrix) {
            matrixOfCofactors[i] = matrixOfMinors[i].slice(0);
            for (var j = 0; j < oldmatrix.length; j++) {
                if ((i * oldmatrix.length + j) % 2) {
                    matrixOfCofactors[i][j] = -matrixOfCofactors[i][j];
                }
            }
        }
        /*Step Three - Adjugate */
        var adjugatedmatrix = this.adjugate(matrixOfCofactors);
        /*Step Four - Multiply by 1/Determinant */
        var invertedmatrix = this.scalarmultiply(adjugatedmatrix, 1 / this.determinant(oldmatrix));
        /*Return matrix inverse*/
        return invertedmatrix;
    },

    scalarmultiply: function (oldmatrix, scalar) {
        /*Create empty 2d array for new matrix*/
        var newmatrix = [];
        for (var i in oldmatrix) {
            newmatrix.push([]);
        }
        for (var i in oldmatrix) {
            for (var j in oldmatrix[i]) {
                newmatrix[i][j] = oldmatrix[i][j] * scalar;
            }
        }
        return newmatrix;
    },

    multiply: function (oldmatrix1, oldmatrix2) {
        /*Create matrix full of zeros*/
        var newmatrix = [];
        for (var i in oldmatrix1) {
            newmatrix.push([]);
            for (var j in oldmatrix2[0]) {
                newmatrix[i].push(0);
            }
        }
        /* Checks if either matrix has as many rows */
        /* as the other matrix has columns */
        if (oldmatrix1[0].length == oldmatrix2.length) {
            for (var i in oldmatrix1) {
                for (var j in oldmatrix2) {
                    for (var k in oldmatrix2[i]) {
                        newmatrix[i][k] += oldmatrix1[i][j] * oldmatrix2[j][k];
                    }
                }
            }
        }
        return newmatrix;
    },

    determinant: function (matrix) {
        /* This function iterates using row by row */
        /* expansion and returns the determinant */
        var sum = 0;
        var s;
        if (matrix.length == 1) {
            return (matrix[0][0]);
        }
        if (matrix.length == 2) {
            return ((matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]));
        }
        if (matrix.length == 3) {
            return ((matrix[0][0] * matrix[1][1] * matrix[2][2]) + (matrix[0][1] * matrix[1][2] * matrix[2][0]) + (matrix[0][2] * matrix[1][0] * matrix[2][1]) - (matrix[0][0] * matrix[1][2] * matrix[2][1]) - (matrix[0][1] * matrix[1][0] * matrix[2][2]) - (matrix[0][2] * matrix[1][1] * matrix[2][0]));
        }
        for (var i = 0; i < matrix.length; i++) {
            var smaller = new Array(matrix.length - 1);
            for (h = 0; h < smaller.length; h++) {
                smaller[h] = new Array(smaller.length);
            }
            for (a = 1; a < matrix.length; a++) {
                for (b = 0; b < matrix.length; b++) {
                    if (b < i) {
                        smaller[a - 1][b] = matrix[a][b];
                    } else if (b > i) {
                        smaller[a - 1][b - 1] = matrix[a][b];
                    }
                }
            }
            if (i % 2 == 0) {
                s = 1;
            } else {
                s = -1;
            }
            sum += s * matrix[0][i] * (determinant(smaller));
        }
        return (sum);
    }
};
