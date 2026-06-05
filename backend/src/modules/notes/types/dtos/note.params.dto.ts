import type{
    ParamsDictionary
} from "express-serve-static-core"

export interface NoteParamDto extends ParamsDictionary{
    note_id:string
}