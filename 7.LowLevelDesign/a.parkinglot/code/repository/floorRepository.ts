import { Floor } from "../domain/floor.js"

export class FloorRepository{
    floors: Map<string, Floor> = new Map()
    floorNumberToId: Map<number, string> = new Map()

    save(floor: Floor){
        const id = floor.getId()
        this.floors.set(id, floor)
        this.floorNumberToId.set(floor.getFloorNumber(), id)
    }

    getFloorById(id: string): Floor{
        const floor = this.floors.get(id)
        if(!floor){
            throw new Error('no floor with the given id')
        }
        return floor
    }

    getFloorByNumber(floorNum: number): Floor{
        const floorId = this.floorNumberToId.get(floorNum)
        if(!floorId){
            throw new Error(`no such floor`)
        }

        const floor = this.floors.get(floorId)
        if(!floor){
            throw new Error('no floor with the given floor number')
        }

        return floor
    }

    addFloor(floor: Floor){
        this.save(floor)
    }

    existsFloorByNumber(floorNum: number): boolean{
        return this.floorNumberToId.has(floorNum)
    }

    updateFloor(floor: Floor){
        this.floors.set(floor.getId(), floor)
    }

    findAll(){
        return [...this.floors.values()]
    }
}