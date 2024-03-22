import { useState } from "react"
import { Checkbox, Group, RangeSlider } from "@mantine/core"
import { dataList } from "../hooks/data.ts"
import { distinct } from "../utils.ts"

export const pays = distinct(
	dataList.flatMap((item) => [item.최소급여, item.최대급여])
		.filter((x) => x !== 0),
)
	.sort((a, b) => a - b)

export const payMarks = pays
	.map((x, i) => ({ value: i, label: x }))

export const PaySlider = () => {
	const [usePay, setUsePay] = useState(false)
	return (
		<Group style={{ height: "5em" }}>
			<Checkbox
				checked={usePay}
				onChange={(e) => setUsePay(e.currentTarget.checked)}
			/>
			<RangeSlider
				style={{ width: "95%" }}
				step={1}
				min={0}
				max={pays.length - 1}
				minRange={1}
				marks={payMarks}
				disabled={!usePay}
			/>
		</Group>
	)
}
