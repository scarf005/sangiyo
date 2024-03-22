import type { JobEntry } from "../../scripts/type.d.ts"
import rawData from "../data.json"
import { distinct } from "../utils.ts"

export const data: Record<string, JobEntry> = rawData

export const dataList: JobEntry[] = Object.values(data)
export const 역종분류명 = distinct(dataList.map((item) => item.역종분류명))
export const 요원구분명 = distinct(dataList.map((item) => item.요원구분명))
export const 업종구분명 = distinct(dataList.map((item) => item.업종구분명))
export const 근무지시도 = distinct(dataList.map((item) => item.근무지시도))
export const 근무지주소 = distinct(dataList.map((item) => item.근무지주소))
