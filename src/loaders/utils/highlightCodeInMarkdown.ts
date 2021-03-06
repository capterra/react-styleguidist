import remark from 'remark';
import visit from 'unist-util-visit';
import highlightCode from './highlightCode';
import noAutoLink from './noAutoLinkRemarkPlugin';

function highlight() {
	return (ast: any) => {
		visit(ast, 'code', (node: any) => {
			node.value = highlightCode(node.value, node.lang);
		});
	};
}

/**
 * Highlight code in code snippets in Markdown.
 *
 * @param {string} markdown
 * @returns {string}
 */
export default function highlightCodeInMarkdown(markdown: string): string {
	return remark()
		.use(highlight)
		.use(noAutoLink)
		.processSync(markdown)
		.toString();
}
