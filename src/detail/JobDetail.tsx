import { Anchor, Group, Text, Title } from "@mantine/core"
import { data } from "../hooks/data.ts"
import { useAtomValue } from "jotai"
import { idAtom } from "../hooks/atom.ts"

export const JobDetailArea = () => {
	const id = useAtomValue(idAtom)

	return <>{id && <JobDetail id={id} />}</>
}

export const JobDetail = ({ id }: { id: number }) => {
	const x = data[id]

	return (
		<article>
			<Anchor
				href={`https://work.mma.go.kr/caisBYIS/search/cygonggogeomsaekView.do?cygonggo_no=${x.채용번호}`}
			>
				<Title>{x.채용제목}</Title>
			</Anchor>
			<Group>
				<Title order={3}>주소</Title>
				<Text>{x.주소}</Text>
			</Group>
			<Group>
				<Title order={3}>담당업무</Title>
				<Text>{x.담당업무}</Text>
			</Group>
			<Group>
				<Title order={3}>출퇴근시간</Title>
				<Text>{x.출퇴근시간 ?? "정보 없음"}</Text>
				<Title order={3}>교대근무</Title>
				<Text>{x.교대근무 ?? "정보 없음"}</Text>
				<Title order={3}>특근/잔업</Title>
				<Text>{x.특근_잔업 ?? "정보 없음"}</Text>
				<Title order={3}>수습기간</Title>
				<Text>{x.수습기간 ?? "정보 없음"}</Text>
			</Group>
			<section>
				<Title order={3}>비고</Title>
				<pre>{x.비고}</pre>
			</section>
		</article>
	)
}
