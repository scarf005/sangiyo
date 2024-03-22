/** 크롤링 결과에서 특수문자 제거 */
export const slugify = (x: string) =>
	x
		.replace(/[· ]/g, "_")
		.replace(/[()]/g, "")
