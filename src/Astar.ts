/**
* name 
*/
module Tower
{
  import Point = laya.maths.Point;
  export class MyNode
  {
     public posTile:Point = new Point();
     public posScreen:Point = new Point();
     public f:number = 0;
     public g:number = 0;
     public h:number = 0;
     public isWall:boolean = false;
     public isKey:boolean = false;
     public isMaster:boolean = false;
     public debug(log:string)
     {
       console.log(log);
     }
     public parent:MyNode = null;
     constructor() {}
     reset()
     {
       this.h = this.g = this.f = 0;
       this.parent = null;
     }
     toString():string
     {
       return `pos:{${this.posTile.x},${this.posTile.y}} f:{${this.f}} g:{${this.g}} h:{${this.h}} isWall:{${this.isWall}} `;
     }
  }

  const WALL_LAYER_IDX:number = 1;
  const NPC_LAYER_IDX:number = 2;
	export class Astar
	{
      

      public grid:Array<Array<MyNode>> = new Array<Array<MyNode>>();
      constructor(map :laya.map.TiledMap)
      {
          this.init(map);
      }
      init(map :laya.map.TiledMap) 
      {
          let yCount:number = map.numColumnsTile;
          let xCount:number = map.numRowsTile;
          for(let i=0; i < xCount; i++)
          {
            this.grid[i] = new Array<MyNode>();
            for(let j=0; j < yCount; j++)
            {
                this.grid[i][j] = new MyNode();
                this.grid[i][j].f = this.grid[i][j].g = this.grid[i][j].h = 0;
                this.grid[i][j].parent = null;
                this.grid[i][j].isWall = (map.getLayerByIndex(WALL_LAYER_IDX).getTileData(j,i) > 0);
                this.grid[i][j].isMaster = (map.getLayerByIndex(NPC_LAYER_IDX).getTileData(j,i) > 0);
                this.grid[i][j].posTile = new Point(i,j);
                let result : laya.maths.Point = new laya.maths.Point();
                map.getLayerByIndex(WALL_LAYER_IDX).getScreenPositionByTilePos(j, i, result);
                this.createText(i, j, this.grid[i][j].isWall, this.grid[i][j].isMaster, result);
                this.grid[i][j].posScreen = result;
                this.grid[i][j].posScreen.x += map.tileWidth / 2;
                this.grid[i][j].posScreen.y += map.tileHeight / 2;
            }
          }
        }
        private createText(i,j,isWall, isNPC, pos): void 
		    {
          let label: Laya.Label = new Laya.Label();
          label.font = "Microsoft YaHei";
          label.text = `${i},${j},${isWall?'T':'F'},${isNPC?'T':'F'}`;
          label.fontSize = 14;
          label.color = "#00FFFF";
          Laya.stage.addChild(label);
          label.x = pos.x;
          label.y = pos.y;
          console.log(label.pos);
		    }
        search(startTile, endTile) : any[]
        {  
          let start = this.grid[startTile.x][startTile.y];
          start.reset();
          let end = this.grid[endTile.x][endTile.y];
          end.reset();
          //this.init(grid);
          let openList = new Array<MyNode>();
          let closedList = new Array<MyNode>();
          openList.push(start);
          while(openList.length > 0) 
          {
              // Grab the lowest f(x) to process next
              let lowInd = 0;
              for(let i=0; i<openList.length; i++) 
              {
                // End case -- result has been found, return the traced path
                if(openList[i].posTile == end.posTile) 
                {
                  let curr = openList[i];
                  let ret = [];
                  while(curr.parent) {
                    ret.push(curr.posScreen);
                    curr = curr.parent;
                  }
                  return ret.reverse();
                }
                if(openList[i].f < openList[lowInd].f) { lowInd = i; }
              }
              let currentNode = openList[lowInd];
        
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
              let neighbors = this.neighbors(currentNode);
    
              for(let i=0; i<neighbors.length;i++) 
              {
                let neighbor = neighbors[i];
                if((closedList.indexOf(neighbor) >= 0) || neighbor.isWall) 
                {
                  continue;// not a valid node to process, skip to next neighbor
                }
                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                // Give priority to the path without NPC
                var gScore = currentNode.g + 1 + (currentNode.isMaster ? 1 : 0); // 1 is the distance from a node to it's neighbor
                var gScoreIsBest = false;
                if(openList.indexOf(neighbor) < 0) 
                {
                  // This the the first time we have arrived at this node, it must be the best
                  // Also, we need to take the h (heuristic) score since we haven't done so yet
                  gScoreIsBest = true;
                  neighbor.h = this.heuristic(neighbor.posTile, end.posTile);
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
                  neighbor.debug(neighbor.toString());
                }
                if(neighbor.posTile == end.posTile) break;
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
          let ret = new Array<MyNode>();
          let x = node.posTile.x;
          let y = node.posTile.y;
          if(this.grid[x-1] && this.grid[x-1][y])
          {
            //this.grid[x-1][y].reset();
            ret.push(this.grid[x-1][y]);
          }
          if(this.grid[x+1] && this.grid[x+1][y]) 
          {
            //this.grid[x+1][y].reset();
            ret.push(this.grid[x+1][y]);
          }
          if(this.grid[x][y-1]) 
          {
            //this.grid[x][y-1].reset();
            ret.push(this.grid[x][y-1]);
          }
          if(this.grid[x][y+1]) 
          {
            //this.grid[x][y+1].reset();
            ret.push(this.grid[x][y+1]);
          }
          return ret;
        }
  }
}