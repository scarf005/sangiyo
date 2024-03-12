import { unescapeHtml } from "https://deno.land/x/escape@1.4.2/mod.ts"
import { Item, RawItem } from "./type.d.ts"

// @deno-types="https://raw.githubusercontent.com/TobiasNickel/tXml/master/tXml.d.ts"
import * as txml from "https://esm.sh/txml@5.1.1"

type XMLResult = {
	response: {
		header: { resultCode: string; resultMsg: string }
		body: {
			items: { item: RawItem[] }
			numOfRows: string
			pageNo: string
			totalCount: string
		}
	}
}

export const parseJobs = (xml: string) => {
	const response =
		(txml.parse(xml, { simplify: true }) as unknown as XMLResult).response

	const { resultCode, resultMsg } = response.header
	if (resultCode !== "00") throw new Error(resultCode, { cause: resultMsg })

	return response.body.items.item.map(parseRawItem)
}

const parseArr = (x?: string) => x?.split(",").map((x) => x.trim())

function parseDate(x: string): Date
function parseDate(x: string | undefined): Date | undefined
function parseDate(x: string | undefined): Date | undefined {
	return x
		? new Date(`${x.slice(0, 4)}-${x.slice(4, 6)}-${x.slice(6)}`)
		: undefined
}

function parseNum(x: string): number
function parseNum(x?: string): number | undefined
function parseNum(x?: string): number | undefined {
	return x ? parseInt(x, 10) : undefined
}

export const parseRawItem = (x: RawItem): Item => ({
	복리후생: parseArr(x.bokrihs),
	최초발생일: parseDate(x.ccdatabalsaengDtm),
	최종변동일: parseDate(x.cjdatabyeongyeongDtm),
	최종학력: x.cjhakryeok,
	채용번호: parseNum(x.cygonggoNo),
	채용제목: unescapeHtml(x.cyjemokNm),
	담당자: x.damdangjaFnm,
	담당업무: unescapeHtml(x.ddeopmuNm),
	담당자연락처: x.ddjyeonrakcheoNo,
	대표연락처: x.dpyeonrakcheoNo,
	업체명: x.eopcheNm,
	업종구분코드: parseNum(x.eopjongGbcd),
	업종구분명: x.eopjongGbcdNm,
	근무지시도: x.geunmujysido,
	근무지주소: x.geunmujy,
	근무지법정동코드: parseNum(x.gmjybjusoCd),
	경력년수: x.grNs,
	경력구분: x.gyeongryeokGbcdNm,
	급여조건코드: parseNum(x.gyjogeonCd),
	급여조건명: x.gyjogeonCdNm,
	홈페이지주소: x.hmpgAddr,
	접수방법: parseArr(x.jeopsubb),
	전공계열코드: parseNum(x.jggyeyeolCd),
	전공계열명: x.jggyeyeolCdNm,
	마감일자: parseDate(x.magamDt),
	외국어코드: parseNum(x.oegukeoCd),
	외국어명: x.oegukeo,
	외국어구사능력: x.ogegsneungryeokCdNm,
	상시채용여부: x.sschaeyongYn,
	역종분류코드: parseNum(x.yeokjongBrcd),
	역종분류명: x.yeokjongBrcdNm,
	요원구분코드: parseNum(x.yowonGbcd),
	요원구분명: x.yowonGbcdNm,
	유효여부: x.yuhyoYn,
	사업자번호: parseNum(x.SAEOPJA_DRNO),
	모집인원명: x.MJINWON_NM,
	근무형태명: x.GMHYEONGTAE_NM,
	주소코드: parseNum(x.JUSO_CD),
})

if (import.meta.main) {
	const json = {
		"bokrihs":
			"국민연금, 고용보험, 산재보험, 건강보험, 연차, 월차, 정기휴가, 향후정직원, 기숙사운영, 사원식당",
		"ccdatabalsaengDtm": "20240305",
		"cjdatabyeongyeongDtm": "20240305",
		"cjhakryeok": "고등학교졸업",
		"cygonggoNo": "2000000339689",
		"cyjemokNm": "성실한 특례병을 모십니다.",
		"damdangjaFnm": "장성우",
		"ddeopmuNm": "주조관련 지원",
		"ddjyeonrakcheoNo": "070-4020-8103",
		"dpyeonrakcheoNo": "055-296-1011",
		"eopcheNm": "대신금속(주)",
		"eopjongGbcd": "12105",
		"eopjongGbcdNm": "민영방산",
		"geunmujy": "경상남도 창원시 의창구 팔용동",
		"geunmujysido": "경상남도",
		"gmhyeongtaeNm": "주5일",
		"gmjybjusoCd": "4812112900",
		"gyeongryeokGbcdNm": "신입",
		"gyjogeonCd": "11",
		"gyjogeonCdNm": "3000~3200만원",
		"hmpgAddr": "www.ds-sl.com",
		"jeopsubb": "병역일터 이력서, 우편, 팩스, 연락후 내사",
		"jusoCd": "4812112900",
		"magamDt": "20240331",
		"mjinwonNm": "2명",
		"saeopjaDrno": "6098107963",
		"yeokjongBrcd": "006",
		"yeokjongBrcdNm": "현역",
		"yowonGbcd": "1",
		"yowonGbcdNm": "산업기능요원",
		"yuhyoYn": "Y",
	}

    // @ts-expect-error: 몇몇 스펙이 실제 반환값과 다름
	const result = parseRawItem(json)
	console.log(Deno.inspect(result, { colors: true, depth: Infinity }))

	const res = await Deno.readTextFile("./response.json")
	const parsed = JSON.parse(res).map(parseRawItem)
	await Deno.writeTextFile("./parsed.json", JSON.stringify(parsed, null, 2))
}
