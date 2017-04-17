/**
* name
*/
var Tower;
(function (Tower) {
    var Point = laya.maths.Point;
    var MyNode = (function () {
        function MyNode() {
            this.pos = new Point();
            this.f = 0;
            this.g = 0;
            this.h = 0;
            this.isWall = false;
            this.parent = null;
        }
        MyNode.prototype.debug = function (log) {
            console.log(log);
        };
        MyNode.prototype.reset = function () {
            this.h = this.g = this.f = 0;
            this.parent = null;
        };
        MyNode.prototype.toString = function () {
            return "pos:{" + this.pos.x + "," + this.pos.y + "} f:{" + this.f + "} g:{" + this.g + "} h:{" + this.h + "} isWall:{" + this.isWall + "} ";
        };
        return MyNode;
    }());
    Tower.MyNode = MyNode;
    var Astar = (function () {
        function Astar(map, lyrIdx) {
            this.grid = new Array();
            this.init(map, lyrIdx);
        }
        Astar.prototype.init = function (map, lyrIdx) {
            var xCount = map.numColumnsTile;
            var yCount = map.numRowsTile;
            for (var i = 0; i < xCount; i++) {
                this.grid[i] = new Array();
                for (var j = 0; j < yCount; j++) {
                    this.grid[i][j] = new MyNode();
                    this.grid[i][j].f = this.grid[i][j].g = this.grid[i][j].h = 0;
                    this.grid[i][j].parent = null;
                    this.grid[i][j].isWall = (map.getLayerByIndex(lyrIdx).getTileData(i, j) > 0);
                    this.grid[i][j].pos = new Point(i, j);
                }
            }
        };
        Astar.prototype.search = function (startTile, endTile) {
            var start = this.grid[startTile.x][startTile.y];
            start.reset();
            var end = this.grid[endTile.x][endTile.y];
            end.reset();
            //this.init(grid);
            var openList = new Array();
            var closedList = new Array();
            openList.push(start);
            while (openList.length > 0) {
                // Grab the lowest f(x) to process next
                var lowInd = 0;
                for (var i = 0; i < openList.length; i++) {
                    // End case -- result has been found, return the traced path
                    if (openList[i].pos == end.pos) {
                        var curr = openList[i];
                        var ret = [];
                        while (curr.parent) {
                            ret.push(curr.pos);
                            curr = curr.parent;
                        }
                        return ret.reverse();
                    }
                    if (openList[i].f < openList[lowInd].f) {
                        lowInd = i;
                    }
                }
                var currentNode = openList[lowInd];
                // End case -- result has been found, return the traced path
                /*if(currentNode.pos == end.pos)
                {
                  var curr = currentNode;
                  var ret = [];
                  while(curr.parent) {
                    ret.push(curr.pos);
                    curr = curr.parent;
                  }
                  return ret.reverse();
                }*/
                // Normal case -- move currentNode from open to closed, process each of its neighbors
                openList.splice(lowInd, 1);
                closedList.push(currentNode);
                var neighbors = this.neighbors(currentNode);
                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i];
                    if ((closedList.indexOf(neighbor) >= 0) || neighbor.isWall) {
                        continue; // not a valid node to process, skip to next neighbor
                    }
                    // g score is the shortest distance from start to current node, we need to check if
                    //   the path we have arrived at this neighbor is the shortest one we have seen yet
                    var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                    var gScoreIsBest = false;
                    if (openList.indexOf(neighbor) < 0) {
                        // This the the first time we have arrived at this node, it must be the best
                        // Also, we need to take the h (heuristic) score since we haven't done so yet
                        gScoreIsBest = true;
                        neighbor.h = this.heuristic(neighbor.pos, end.pos);
                        openList.push(neighbor);
                    }
                    else if (gScore < neighbor.g) {
                        // We have already seen the node, but last time it had a worse g (distance from start)
                        gScoreIsBest = true;
                    }
                    if (gScoreIsBest) {
                        // Found an optimal (so far) path to this node.   Store info on how we got here and
                        //  just how good it really is...
                        neighbor.parent = currentNode;
                        neighbor.g = gScore;
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.debug(neighbor.toString());
                    }
                    if (neighbor.pos == end.pos)
                        break;
                }
            }
            // No result was found -- empty array signifies failure to find path
            return [];
        };
        Astar.prototype.heuristic = function (pos0, pos1) {
            // This is the Manhattan distance
            var d1 = Math.abs(pos1.x - pos0.x);
            var d2 = Math.abs(pos1.y - pos0.y);
            return d1 + d2;
        };
        Astar.prototype.neighbors = function (node) {
            var ret = new Array();
            var x = node.pos.x;
            var y = node.pos.y;
            if (this.grid[x - 1] && this.grid[x - 1][y]) {
                //this.grid[x-1][y].reset();
                ret.push(this.grid[x - 1][y]);
            }
            if (this.grid[x + 1] && this.grid[x + 1][y]) {
                //this.grid[x+1][y].reset();
                ret.push(this.grid[x + 1][y]);
            }
            if (this.grid[x][y - 1] && this.grid[x][y - 1]) {
                //this.grid[x][y-1].reset();
                ret.push(this.grid[x][y - 1]);
            }
            if (this.grid[x][y + 1] && this.grid[x][y + 1]) {
                //this.grid[x][y+1].reset();
                ret.push(this.grid[x][y + 1]);
            }
            return ret;
        };
        return Astar;
    }());
    Tower.Astar = Astar;
})(Tower || (Tower = {}));
//# sourceMappingURL=Astar.js.map