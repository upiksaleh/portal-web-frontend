import { UIContentBlocksBaseProps } from './_base';
import ParagraphTool from './tools/paragraph';
import ImageTool from './tools/image';
import EmbedTool from './tools/embed';
import HeadingTool from './tools/heading';
import ListTool from './tools/list';
import CodeTool from './tools/code';
import AttachesTool from './tools/attaches';
import TableTool from './tools/table';
import QuoteTool from './tools/quote';
import DelimiterTool from './tools/delimiter';
import RawTool from './tools/raw';
import ChecklistTool from './tools/checklist';

const tools = {
  paragraph: ParagraphTool,
  image: ImageTool,
  embed: EmbedTool,
  header: HeadingTool,
  list: ListTool,
  nestedlist: ListTool,
  code: CodeTool,
  attaches: AttachesTool,
  table: TableTool,
  quote: QuoteTool,
  delimiter: DelimiterTool,
  raw: RawTool,
  checklist: ChecklistTool,
};

export function UIContentBlocks({
  time,
  blocks,
  version,
}: UIContentBlocksBaseProps) {
  const items: any = [];
  blocks = blocks ?? [];
  if (!blocks.length) {
    return <div>Belum ada data.</div>;
  }
  blocks.forEach((block, i) => {
    if (tools[block.type]) {
      const Comp = tools[block.type];
      items.push(<Comp key={i} {...block} />);
    }
  });
  return <div className="contents-blocks">{items}</div>;
}
