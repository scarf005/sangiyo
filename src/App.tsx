import { useReducer, useState } from "react"
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"

import type { Item } from "../scripts/type.d.ts"
import "./App.css"
import json from "../scripts/jobs.json"

const defaultData: Item[] = json
const columnHelper = createColumnHelper<Item>()

const accessors: (keyof Item)[] = [
	"업체명",
	"근무지시도",
	"채용제목",
	"업종구분명",
	"요원구분명",
]

const columns = accessors.map((accessor) =>
	columnHelper.accessor(accessor, {
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
	})
).concat()

export const App = () => {
	const [data, _setData] = useState(() => [...defaultData])
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder ? null : flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder ? null : flexRender(
										header.column.columnDef.footer,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</>
	)
}
