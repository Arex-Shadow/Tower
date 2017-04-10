/**
* name 
*/
module Tower
{
	export class MyPoint
	{
		public x:number;
		public y:number;
		constructor(a,b)
    {
      this.init(a,b);
    }
		public init(a,b)
		{
			this.x = a;
			this.y = b;
		}
	}
  export class MyNode
  {
     public pos:MyPoint;
     public f:number;
     public g:number;
     public h:number;
     public isWall:boolean;
     public debug(log:string)
     {
       console.log(log);
     }
     public parent:MyNode;
  }
	export class Astar
	{
      public grid:MyNode[][];
      constructor(map :laya.map.TiledMap, lyrIdx:number)
      {
          this.init(map, lyrIdx);
      }
      init(map :laya.map.TiledMap, lyrIdx:number) 
      {
          let xCount:number = map.numColumnsGrid;
          let yCount:number = map.numRowsGrid;
          for(let i=0; i < xCount; i++)
          {
            for(let j=0; j < yCount; j++)
            {
                this.grid[i][j].pos = new MyPoint(i,j);
                this.grid[i][j].f = this.grid[i][j].g = this.grid[i][j].h = 0;
                this.grid[i][j].parent = null;
                this.grid[i][j].isWall = (map.getLayerByIndex(lyrIdx).getTileData(i,j) > 0);
            }
          }
        }
        search(start, end) : any[]
        {
          //this.init(grid);
          let openList:MyNode[];
          let closedList:MyNode[];
          openList.push(start);
          while(openList.length > 0) 
          {
              // Grab the lowest f(x) to process next
              let lowInd = 0;
              for(let i=0; i<openList.length; i++) {
                if(openList[i].f < openList[lowInd].f) { lowInd = i; }
              }
              let currentNode = openList[lowInd];
        
              // End case -- result has been found, return the traced path
              if(currentNode.pos == end.pos) 
              {
                var curr = currentNode;
                var ret = [];
                while(curr.parent) {
                  ret.push(curr);
                  curr = curr.parent;
                }
                return ret.reverse();
              }
      
              // Normal case -- move currentNode from open to closed, process each of its neighbors
              openList.splice(lowInd, 1);
              closedList.push(currentNode);
              let neighbors = this.neighbors(currentNode);
    
              for(let i=0; i<neighbors.length;i++) 
              {
                var neighbor = neighbors[i];
                if((closedList.indexOf(neighbor) >= 0) || neighbor.isWall) 
                {
                  continue;// not a valid node to process, skip to next neighbor
                }
                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                var gScoreIsBest = false;
                if(openList.indexOf(neighbor) < 0) 
                {
                  // This the the first time we have arrived at this node, it must be the best
                  // Also, we need to take the h (heuristic) score since we haven't done so yet
                  gScoreIsBest = true;
                  neighbor.h = this.heuristic(neighbor.pos, end.pos);
                  openList.push(neighbor);
                }
                else if(gScore < neighbor.g) 
                {
                  // We have already seen the node, but last time it had a worse g (distance from start)
                  gScoreIsBest = true;
                }
        
                if(gScoreIsBest) 
                {
                  // Found an optimal (so far) path to this node.   Store info on how we got here and
                  //  just how good it really is...
                  neighbor.parent = currentNode;
                  neighbor.g = gScore;
                  neighbor.f = neighbor.g + neighbor.h;
                  neighbor.debug("F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h);
                }
              }
          }
  
          // No result was found -- empty array signifies failure to find path
          return [];
        }
        heuristic(pos0, pos1):number 
        {
          // This is the Manhattan distance
          let d1 = Math.abs (pos1.x - pos0.x);
          let d2 = Math.abs (pos1.y - pos0.y);
          return d1 + d2;
        }
        neighbors(node) 
        {
          let ret:MyNode[];
          let x = node.pos.x;
          let y = node.pos.y;
          if(this.grid[x-1] && this.grid[x-1][y])
          {
            ret.push(this.grid[x-1][y]);
          }
          if(this.grid[x+1] && this.grid[x+1][y]) 
          {
            ret.push(this.grid[x+1][y]);
          }
          if(this.grid[x][y-1] && this.grid[x][y-1]) 
          {
            ret.push(this.grid[x][y-1]);
          }
          if(this.grid[x][y+1] && this.grid[x][y+1]) 
          {
            ret.push(this.grid[x][y+1]);
          }
          return ret;
        }
  }
}