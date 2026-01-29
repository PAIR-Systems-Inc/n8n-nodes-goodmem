import type {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeListSearchItems,
} from 'n8n-workflow';
import { goodmemApiRequest } from '../shared/transport';

type IssueSearchItem = {
	number: number;
	title: string;
	html_url: string;
};

type IssueSearchResponse = {
	items: IssueSearchItem[];
	total_count: number;
};

export async function getIssues(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? +paginationToken : 1;
	const per_page = 100;

	let responseData: IssueSearchResponse = {
		items: [],
		total_count: 0,
	};

	responseData = await goodmemApiRequest.call(this, 'GET', '/space', {
		page,
	});

	const results: INodeListSearchItems[] = responseData.items.map((item: IssueSearchItem) => ({
		name: item.title,
		value: item.number,
	})); // TODO: fix this to be accurate

	const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : undefined;
	return { results, paginationToken: nextPaginationToken };
}
