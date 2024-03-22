import { useAtom } from "jotai"
import {
	업종Atom,
	역종Atom,
	요원Atom,
	주소Atom,
	지역Atom,
} from "../hooks/atom.ts"
import { MultiSelect, Stack } from "@mantine/core"
import {
	근무지시도,
	근무지주소,
	업종구분명,
	역종분류명,
	요원구분명,
} from "../hooks/data.ts"

export const FilterGroup = () => {
	const [역종, set역종] = useAtom(역종Atom)
	const [요원, set요원] = useAtom(요원Atom)
	const [업종, set업종] = useAtom(업종Atom)
	const [지역, set지역] = useAtom(지역Atom)
	const [주소, set주소] = useAtom(주소Atom)

	return (
		<Stack gap="xs">
			<MultiSelect
				label="역종"
				data={역종분류명}
				value={역종}
				onChange={(v) => set역종(v ?? [])}
				clearable
			/>
			<MultiSelect
				label="요원"
				data={요원구분명}
				value={요원}
				onChange={(v) => set요원(v ?? [])}
				clearable
			/>
			<MultiSelect
				label="업종"
				data={업종구분명}
				value={업종}
				onChange={(v) => set업종(v ?? [])}
				clearable
			/>

			<MultiSelect
				label="지역"
				data={근무지시도}
				value={지역}
				onChange={(v) => set지역(v ?? [])}
				clearable
			/>
			<MultiSelect
				label="세부지역"
				data={근무지주소.filter((x) => 지역.some((y) => x.startsWith(y)))
					.sort()}
				value={주소}
				onChange={(v) => set주소(v ?? [])}
				clearable
			/>
		</Stack>
	)
}
