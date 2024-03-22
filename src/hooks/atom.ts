import { atomWithStorage } from "jotai/utils"

export const 역종Atom = atomWithStorage<string[]>("역종분류명", [])
export const 요원Atom = atomWithStorage<string[]>("요원구분명", [])
export const 업종Atom = atomWithStorage<string[]>("업종구분명", [])
export const 지역Atom = atomWithStorage<string[]>("근무지시도", [])
export const 주소Atom = atomWithStorage<string[]>("근무지주소", [])
export const idAtom = atomWithStorage<number | null>("채용번호", null)
