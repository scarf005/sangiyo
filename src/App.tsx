import { useMemo } from "react"

import type { Item } from "../scripts/type.d.ts"
import "./App.css"

import json from "../scripts/jobs.json"
import desc from "../scripts/descriptions.json"

import {
	Anchor,
	Card,
	Checkbox,
	Grid,
	Group,
	MultiSelect,
	RangeSlider,
	ScrollArea,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"

const defaultData: Item[] = json

const distinct = <T,>(xs: T[]) => Array.from(new Set(xs))

const 역종분류명 = distinct(defaultData.map((item) => item.역종분류명))
const 요원구분명 = distinct(defaultData.map((item) => item.요원구분명))
const 업종구분명 = distinct(defaultData.map((item) => item.업종구분명))
const 근무지시도 = distinct(defaultData.map((item) => item.근무지시도))
const 근무지주소 = distinct(defaultData.map((item) => item.근무지주소))

const pays = distinct(
	defaultData.flatMap((item) => [item.최소급여, item.최대급여])
		.filter((x) => x !== 0),
)
	.sort((a, b) => a - b)

const payMarks = pays
	.map((x, i) => ({ value: i, label: x }))

const filter = (xs: string | string[], key: keyof Item, data: Item[]): Item[] =>
	xs.length > 0 ? data.filter((item) => xs.includes(item[key] as string)) : data

const useFilter = (
	data: Item[],
	filters: { key: keyof Item; xs: string[] }[],
) =>
	useMemo(
		() => filters.reduce((acc, { key, xs: xs }) => filter(xs, key, acc), data),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data, ...filters.map((filter) => filter.xs)],
	)

export const App = () => {
	const [역종, set역종] = useLocalStorage<string[]>({
		key: "역종분류명",
		defaultValue: [],
	})
	const [요원, set요원] = useLocalStorage<string[]>({
		key: "요원구분명",
		defaultValue: [],
	})
	const [업종, set업종] = useLocalStorage<string[]>({
		key: "업종구분명",
		defaultValue: [],
	})
	const [지역, set지역] = useLocalStorage<string[]>({
		key: "근무지시도",
		defaultValue: [],
	})
	const [주소, set주소] = useLocalStorage<string[]>({
		key: "근무지주소",
		defaultValue: [],
	})
	const [usePay, setUsePay] = useLocalStorage<boolean>({
		key: "급여검색여부",
		defaultValue: false,
	})

	// const data = []
	const data = useFilter(defaultData, [
		{ key: "역종분류명", xs: 역종 },
		{ key: "요원구분명", xs: 요원 },
		{ key: "업종구분명", xs: 업종 },
		{ key: "근무지시도", xs: 지역 },
		{ key: "근무지주소", xs: 주소 },
	])

	const PaySlider = () => (
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

	const SelectGroup = () => (
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
	return (
		<main>
			<Grid overflow="hidden" h="100%">
				<Grid.Col
					span={6}
					style={{
						border: "2px solid green",
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
				>
					<SelectGroup />
					<PaySlider />
					<Text>총 {defaultData.length}중 {data.length}개</Text>
					<div style={{ overflowY: "scroll" }}>
						<Stack>
							{data.map((x) => (
								<Card shadow="xl" key={x.채용번호}>
									<Anchor
										href={`https://work.mma.go.kr/caisBYIS/search/cygonggogeomsaekView.do?cygonggo_no=${x.채용번호}`}
										target="_blank"
										rel="noreferrer"
									>
										<Title order={3}>{x.채용제목}</Title>
									</Anchor>
									<Text>
										{x.업체명} - ({x.근무지주소})
									</Text>
									<Anchor
										href={x.홈페이지주소}
										target="_blank"
										rel="noreferrer"
									>
										{x.홈페이지주소}
									</Anchor>
									<Checkbox />
								</Card>
							))}
						</Stack>
					</div>
				</Grid.Col>
				<Grid.Col span={6}>
					text
				</Grid.Col>
			</Grid>
		</main>
	)
}
