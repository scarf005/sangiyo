type FetchOption = {
	endpoint: string
	key: string

	/** 페이지당 결과 수 */
	rows: number

	/** 페이지 번호 (1-indexed) */
	page?: number
}

/**
 * 병무청 병역일터 채용공고 크롤링
 *
 * https://www.data.go.kr/data/3065599/openapi.do
 */
export const fetchJobs = ({ endpoint, key, rows, page = 1 }: FetchOption) =>
	fetch(`${endpoint}?${new URLSearchParams({
		numOfRows: `${rows}`,
		pageNo: `${page}`,
		ServiceKey: key,
	})}`)
