import { pick } from "$std/collections/pick.ts"
import { chunk } from "$std/collections/chunk.ts"
import { decode } from "https://deno.land/x/html_entities@v1.0/lib/html5-entities.js"
import type { ItemDetail } from "./type.d.ts"
import {
	DOMParser,
	Element,
	HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts"
import { slugify } from "./slugify.ts"

const crawlEndpoint =
	"https://work.mma.go.kr/caisBYIS/search/cygonggogeomsaekView.do"

const domParser = new DOMParser()

export const crawlJobs = ({ id }: { id: number }) =>
	fetch(`${crawlEndpoint}?${new URLSearchParams({ cygonggo_no: `${id}` })}`)
		.then((res) => res.text())
		.then((text) => domParser.parseFromString(text, "text/html"))

const tableToObject = (table: Element): Record<string, string> =>
	(Array.from(table.querySelectorAll("tr")) as Element[])
		.reduce<Record<string, string>>((acc, x) => {
			if (x.children.length % 2 !== 0) return acc

			chunk(Array.from(x.children), 2).forEach(([th, td]) => {
				acc[slugify(th.innerText)] = td.innerText
			})
			return acc
		}, {})

export const parseCrawlJobs = (document: HTMLDocument): ItemDetail | null => {
	const tables = Array
		.from(document.querySelectorAll("#content .step1 table")) as Element[]

	// "이미 마감된 채용공고입니다."
	if (tables.length === 1) return null

	const [
		병역지정업체정보,
		근무조건,
		, // 우대사항_및_복리후생,
		, // 접수방법,
		, // 담당자정보,
		비고,
	] = tables

	return {
		주소: tableToObject(병역지정업체정보)["주소"],
		...pick(tableToObject(근무조건), [
			"전직자_채용가능",
			"출퇴근시간",
			"교대근무",
			"수습기간",
			"퇴직금지급",
			"식사비지급",
			"현역배정인원",
			"현역편입인원",
			"보충역배정인원",
			"보충역편입인원",
			"자격증",
		]),
		비고: 비고.querySelector("td") &&
			decode(비고.querySelector("td")!.innerHTML.replaceAll("<br>", "\n"))
				.trim(),
	} as ItemDetail
}
