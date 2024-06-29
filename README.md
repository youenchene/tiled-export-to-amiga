# Export tiled map for amiga games

Forked from @zooperdan original contribution.

## How it works

You need 2 layers :

 - Terrain
 - Structures

Terrain is mandatory and is background.
Structures is optional and is foreground.

When you do **File** / **Export** you have 2 new formats :

 - GOGITUM Export
 - GOGITUM 16 Export

**GOGITUM Export** is a 8 bits export (1 byte).

**GOGITUM 16 Export** is a 16 bits export (2 bytes).


## How to use it

### Blitz Basic 2

#### GOGITUM Export

```
Dim map.b(#mapSize)

dummy.b 
  If ReadFile(0,"assets/level1.dat") 
  ReadMem 0,&dummy,1
  ReadMem 0,&dummy,1
  size.w=#mapSize
  ReadMem 0,&map,size
Else
  NPrint "Error reading file."
EndIf
CloseFile 0
```

#### GOGITUM 16 Export

```
Dim map.w(#mapSize)

dummy.w
If ReadFile(0,"assets/maps/W1L1.dat") 
    ReadMem 0,&dummy,2
    NPrint "w:", dummy," "
    ReadMem 0,&dummy,2
    NPrint "h:", dummy," "
    tilePos.w=0
    For yf.w=0 to (#mapHeight-1)
        For xf.w=0 to (#mapWidth-1)
            ReadMem 0,&map(tilePos),2
            tilePos=tilePos+1
        Next
    Next
Else
    NPrint "Error reading file."
EndIf
CloseFile 0
```
