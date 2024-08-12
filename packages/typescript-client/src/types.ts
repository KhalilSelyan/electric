export type Value =
  | string
  | number
  | boolean
  | bigint
  | null
  | Value[]
  | { [key: string]: Value }

export type Offset = `-1` | `${number}_${number}`

interface Header {
  [key: string]: Value
}

export type ControlMessage = {
  headers: Header
}

export type ChangeMessage<T> = {
  key: string
  value: T
  headers: Header & { operation: `insert` | `update` | `delete` }
  offset: Offset
}

// Define the type for a record
export type Message<T extends Value = { [key: string]: Value }> =
  | ControlMessage
  | ChangeMessage<T>

/**
 * Common properties for all columns.
 * `dims` is the number of dimensions of the column. Only provided if the column is an array.
 * `not_null` is true if the column has a `NOT NULL` constraint and is omitted otherwise.
 */
export type CommonColumnProps = {
  dims?: number
  not_null?: boolean
}

export type RegularColumn = {
  type: string
} & CommonColumnProps

export type VarcharColumn = {
  type: `varchar`
  max_length?: number
} & CommonColumnProps

export type BpcharColumn = {
  type: `bpchar`
  length?: number
} & CommonColumnProps

export type TimeColumn = {
  type: `time` | `timetz` | `timestamp` | `timestamptz`
  precision?: number
} & CommonColumnProps

export type IntervalColumn = {
  type: `interval`
  fields?:
    | `YEAR`
    | `MONTH`
    | `DAY`
    | `HOUR`
    | `MINUTE`
    | `YEAR TO MONTH`
    | `DAY TO HOUR`
    | `DAY TO MINUTE`
    | `DAY TO SECOND`
    | `HOUR TO MINUTE`
    | `HOUR TO SECOND`
    | `MINUTE TO SECOND`
} & CommonColumnProps

export type IntervalColumnWithPrecision = {
  type: `interval`
  precision?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  fields?: `SECOND`
} & CommonColumnProps

export type BitColumn = {
  type: `bit`
  length: number
} & CommonColumnProps

export type NumericColumn = {
  type: `numeric`
  precision?: number
  scale?: number
} & CommonColumnProps

export type ColumnInfo =
  | RegularColumn
  | VarcharColumn
  | BpcharColumn
  | TimeColumn
  | IntervalColumn
  | IntervalColumnWithPrecision
  | BitColumn
  | NumericColumn

export type Schema = { [key: string]: ColumnInfo }

export type TypedMessages<T extends Value = { [key: string]: Value }> = {
  messages: Array<Message<T>>
  schema: ColumnInfo
}
