/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import MarkdownItAbbr from 'markdown-it-abbr';
import MarkdownItCheckbox from 'markdown-it-checkbox';
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItLinkAttributes from 'markdown-it-link-attributes';
import MarkdownMark from 'markdown-it-mark';
import MarkdownSanitizer from 'markdown-it-sanitizer';
import MarkdownKatex from '@iktakahiro/markdown-it-katex';


const generateMd = (options = {}) => {
  const { packages = [], ...mdOpts } = options;

  const newMd = new MarkdownIt(mdOpts);
  packages.forEach(([pack, opts]) => {
    newMd.use(pack, opts);
  });
  return newMd;
};

const defaultOpts = {
  linkify: true,
  breaks: true,
  packages: [
    [MarkdownItAbbr, {}],
    [MarkdownItCheckbox, {}],
    [MarkdownItEmoji, {}],
    [MarkdownItFootnote, {}],
    [MarkdownItLinkAttributes, { attrs: { target: '_blank' } }],
    [MarkdownMark, {}],
    [MarkdownSanitizer, {}],
    [MarkdownKatex, { strict: false }],
  ],
};

const md = generateMd(defaultOpts);

const propTypes = {
  sentence: PropTypes.string,
  options: PropTypes.shape({}),
  className: PropTypes.string,
};

const Markdown = ({ sentence, options, className }) => {
  let newMd = null;
  if (options) newMd = generateMd({ ...defaultOpts, ...options });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: (newMd || md).render(sentence || "") }}
      className={`markdown-body markdown-preview ${className || ""}`}
    />
  );
};

Markdown.propTypes = propTypes;
export default Markdown;
