/**
 * | 항목명(국문)         | 항목명(영문)     | N | 샘플데이터                          | 항목설명         |
 * | -------------------- | ---------------- | - | ----------------------------------- | ---------------- |
 * | bokrihs              | 복리후생         | 1 | 국민연금, 고용보험, 산재보험        | 복리후생         |
 * | ccdatabalsaengDtm    | 최초발생일       | 0 | 2016-04-05                          | 최초발생일       |
 * | cjdatabyeongyeongDtm | 최종변동일       | 0 | 2016-04-05                          | 최종변동일       |
 * | cjhakryeok           | 최종학력         | 1 | 고등학교졸업 이상                   | 최종학력         |
 * | cygonggoNo           | 채용번호         | 1 | 2000000011623                       | 채용번호         |
 * | cyjemokNm            | 채용제목         | 1 | 모집 합니다.(현역, 보충역 지원가능) | 채용제목         |
 * | damdangjaFnm         | 담당자           | 1 | 박유*                               | 담당자           |
 * | ddeopmuNm            | 담당업무         | 0 | 주조, 검사                          | 담당업무         |
 * | ddjyeonrakcheoNo     | 담당자연락처     | 1 | 063-212-4314                        | 담당자연락처     |
 * | dpyeonrakcheoNo      | 대표연락처       | 0 | 063-212-4314                        | 대표연락처       |
 * | eopcheNm             | 업체명           | 1 | 엔아이비                            | 업체명           |
 * | eopjongGbcd          | 업종구분코드     | 1 | 11101                               | 업종구분코드     |
 * | eopjongGbcdNm        | 업종구분명       | 1 | 철강                                | 업종구분명       |
 * | geunmujysido         | 근무지시도       | 1 | 전라북도                            | 근무지시도       |
 * | geunmujy             | 근무지주소       | 1 | 전라북도 전주시 덕진구 여의동       | 근무지주소       |
 * | gmjybjusoCd          | 근무지법정동코드 | 1 | 4511313000                          | 근무지법정동코드 |
 * | grNs                 | 경력년수         | 0 | 1년이상                             | 경력년수         |
 * | gyeongryeokGbcdNm    | 경력구분         | 1 | 신입                                | 경력구분         |
 * | gyjogeonCd           | 급여조건코드     | 1 | 6                                   | 급여조건코드     |
 * | gyjogeonCdNm         | 급여조건명       | 1 | 1800~2000만원                       | 급여조건명       |
 * | hmpgAddr             | 홈페이지주소     | 0 |                                     | 홈페이지주소     |
 * | jeopsubb             | 접수방법         | 1 | 이메일, 우편                        | 접수방법         |
 * | jggyeyeolCd          | 전공계열코드     | 0 | 03                                  | 전공계열코드     |
 * | jggyeyeolCdNm        | 전공계열명       | 0 | 공학계                              | 전공계열명       |
 * | magamDt              | 마감일자         | 1 | 2016-05-31                          | 마감일자         |
 * | oegukeoCd            | 외국어코드       | 0 | 03                                  | 외국어코드       |
 * | oegukeo              | 외국어명         | 0 | 영어                                | 외국어명         |
 * | ogegsneungryeokCdNm  | 외국어구사능력   | 0 | (중)                                | 외국어구사능력   |
 * | sschaeyongYn         | 상시채용여부     | 1 | N                                   | 상시채용여부     |
 * | yeokjongBrcd         | 역종분류코드     | 1 | 6                                   | 역종분류코드     |
 * | yeokjongBrcdNm       | 역종분류명       | 1 | 현역                                | 역종분류명       |
 * | yowonGbcd            | 요원구분코드     | 1 | 1                                   | 요원구분코드     |
 * | yowonGbcdNm          | 요원구분명       | 1 | 산업기능요원                        | 요원구분명       |
 * | yuhyoYn              | 유효여부         | 1 | Y                                   | 유효여부         |
 * | SAEOPJA_DRNO         | 사업자번호       | 1 | 1398130999                          | 사업자번호       |
 * | MJINWON_NM           | 모집인원명       | 1 | 2명                                 | 모집인원명       |
 * | GMHYEONGTAE_NM       | 근무형태명       | 1 | 주5일                               | 근무형태명       |
 * | JUSO_CD              | 주소코드         | 1 | 2820011100                          | 주소코드         |
 */

export type RawItem = {
	/** 복리후생 @example "국민연금, 고용보험, 산재보험" */
	bokrihs: string

	/** 최초발생일 @example "2016-04-05" */
	ccdatabalsaengDtm?: string

	/** 최종변동일 @example "2016-04-05" */
	cjdatabyeongyeongDtm?: string

	/** 최종학력 @example "고등학교졸업 이상" */
	cjhakryeok: string

	/** 채용번호 @example "2000000011623" */
	cygonggoNo: string

	/** 채용제목 @example "모집 합니다.(현역, 보충역 지원가능)" */
	cyjemokNm: string

	/** 담당자 @example "박유*" */
	damdangjaFnm: string

	/** 담당업무 @example "주조, 검사" */
	ddeopmuNm: string // 실제로는 필수 포함

	/** 담당자연락처 @example "063-212-4314" */
	ddjyeonrakcheoNo: string

	/** 대표연락처 @example "063-212-4314" */
	dpyeonrakcheoNo?: string

	/** 업체명 @example "엔아이비" */
	eopcheNm: string

	/** 업종구분코드 @example "11101" */
	eopjongGbcd: string

	/** 업종구분명 @example "철강" */
	eopjongGbcdNm: string

	/** 근무지시도 @example "전라북도" */
	geunmujysido: string

	/** 근무지주소 @example "전라북도 전주시 덕진구 여의동" */
	geunmujy: string

	/** 근무지법정동코드 @example "4511313000" */
	gmjybjusoCd: string

	/** 경력년수 @example "1년이상" */
	grNs?: string

	/** 경력구분 @example "신입" */
	gyeongryeokGbcdNm: string

	/** 급여조건코드 @example "6" */
	gyjogeonCd: string

	/** 급여조건명 @example "1800~2000만원" */
	gyjogeonCdNm: string

	/** 홈페이지주소  */
	hmpgAddr?: string

	/** 접수방법 @example "이메일, 우편" */
	jeopsubb: string

	/** 전공계열코드 @example "03" */
	jggyeyeolCd?: string

	/** 전공계열명 @example "공학계" */
	jggyeyeolCdNm?: string

	/** 마감일자 @example "2016-05-31" */
	magamDt: string

	/** 외국어코드 @example "03" */
	oegukeoCd?: string

	/** 외국어명 @example "영어" */
	oegukeo?: string

	/** 외국어구사능력 @example "(중)" */
	ogegsneungryeokCdNm?: string

	/** 상시채용여부 * @example "N" */
	sschaeyongYn?: string

	/** 역종분류코드 @example "6" */
	yeokjongBrcd: string

	/** 역종분류명 @example "현역" */
	yeokjongBrcdNm: string

	/** 요원구분코드 @example "1" */
	yowonGbcd: string

	/** 요원구분명 @example "산업기능요원" */
	yowonGbcdNm: string

	/** 유효여부 @example "Y" */
	yuhyoYn: string

	/** 사업자번호 @example "1398130999" */
	SAEOPJA_DRNO: string

	/** 모집인원명 @example "2명" */
	MJINWON_NM: string

	/** 근무형태명 @example "주5일" */
	GMHYEONGTAE_NM: string

	/** 주소코드 @example "2820011100" */
	JUSO_CD: string
}

export type Item = {
	/** 복리후생 @example ["국민연금", "고용보험", "산재보험"] */
	복리후생?: string[]

	/** 최초발생일 @example "2016-04-05" */
	최초발생일?: string

	/** 최종변동일 @example "2016-04-05" */
	최종변동일?: string

	/** 최종학력 @example "고등학교졸업 이상" */
	최종학력: string

	/** 채용번호 @example "2000000011623" */
	채용번호: number

	/** 채용제목 @example "모집 합니다.(현역, 보충역 지원가능)" */
	채용제목: string

	/** 담당자 @example "박유*" */
	담당자: string

	/** 담당업무 @example "주조, 검사" */
	담당업무?: string

	/** 담당자연락처 @example "063-212-4314" */
	담당자연락처?: string

	/** 대표연락처 @example "063-212-4314" */
	대표연락처?: string

	/** 업체명 @example "엔아이비" */
	업체명: string

	/** 업종구분코드 @example "11101" */
	업종구분코드: number

	/** 업종구분명 @example "철강" */
	업종구분명: string

	/** 근무지시도 @example "전라북도" */
	근무지시도: string

	/** 근무지주소 @example "전라북도 전주시 덕진구 여의동" */
	근무지주소: string

	/** 근무지법정동코드 @example "4511313000" */
	근무지법정동코드: number

	/** 경력년수 @example "1년이상" */
	경력년수?: string

	/** 경력구분 @example "신입" */
	경력구분: string

	/** 급여조건코드 @example "6" */
	급여조건코드: number

	/** 급여조건명 @example "1800~2000만원" */
	급여조건명: string

	/** 홈페이지주소 */
	홈페이지주소?: string

	/** 접수방법 @example "이메일, 우편" */
	접수방법?: string[]

	/** 전공계열코드 @example "03" */
	전공계열코드?: number

	/** 전공계열명 @example "공학계" */
	전공계열명?: string

	/** 마감일자 @example "2016-05-31" */
	마감일자: string

	/** 외국어코드 @example "03" */
	외국어코드?: number

	/** 외국어명 @example "영어" */
	외국어명?: string

	/** 외국어구사능력 @example "(중)" */
	외국어구사능력?: string

	/** 상시채용여부 @example "N" */
	상시채용여부?: string

	/** 역종분류코드 @example "6" */
	역종분류코드: number

	/** 역종분류명 @example "현역" */
	역종분류명: string

	/** 요원구분코드 @example "1" */
	요원구분코드: number

	/** 요원구분명 @example "산업기능요원" */
	요원구분명: string

	/** 유효여부 @example "Y" */
	유효여부: string

	/** 사업자번호 @example "1398130999" */
	사업자번호?: number

	/** 모집인원명 @example "2명" */
	모집인원명?: string

	/** 근무형태명 @example "주5일" */
	근무형태명?: string

	/** 주소코드 @example "2820011100" */
	주소코드?: number
}
