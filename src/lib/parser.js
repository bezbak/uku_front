import showdown from 'showdown';
import parse from 'html-react-parser';

const converter = new showdown.Converter();

export const parseMarkdown = (markdown) => {
  const html = converter.makeHtml(markdown) || '';
  return parse(html);
};

export const parseHtml = (htmlString) => {
  return parse(htmlString)
}
