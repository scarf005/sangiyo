import { useAtomValue } from "jotai"
import { 업종Atom, 역종Atom, 요원Atom, 주소Atom, 지역Atom } from "./atom.ts"
import { dataList } from "./data.ts"
import { useMemo } from "react"
import type { JobEntry } from "../../scripts/type.d.ts"
import { filter } from "../utils.ts"

const useFilter = (
	data: JobEntry[],
	filters: { key: keyof JobEntry; xs: string[] }[],
) =>
	useMemo(
		() => filters.reduce((acc, { key, xs }) => filter(xs, key, acc), data),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data, ...filters.map((filter) => filter.xs)],
	)

export const useFilteredData = () => {
	const 역종 = useAtomValue(역종Atom)
	const 요원 = useAtomValue(요원Atom)
	const 업종 = useAtomValue(업종Atom)
	const 지역 = useAtomValue(지역Atom)
	const 주소 = useAtomValue(주소Atom)

	return useFilter(dataList, [
		{ key: "역종분류명", xs: 역종 },
		{ key: "요원구분명", xs: 요원 },
		{ key: "업종구분명", xs: 업종 },
		{ key: "근무지시도", xs: 지역 },
		{ key: "근무지주소", xs: 주소 },
	])
}
