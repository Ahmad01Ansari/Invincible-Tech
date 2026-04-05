"use client";

import React, { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import Youtube from "@tiptap/extension-youtube";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import Heading from "@tiptap/extension-heading";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { marked } from "marked";
import { generateHTML } from "@tiptap/html";
import { Node } from "@tiptap/core";

const lowlight = createLowlight(common);

const TechnicalImage = Node.create({
  name: "technicalAsset",
  group: "block",
  inline: false,
  draggable: true,
  
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: 'Technical Blueprint',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', { ...HTMLAttributes, 'data-type': 'technicalAsset' }]
  },
});

const RENDERER_EXTENSIONS = [
  TechnicalImage.configure({ allowBase64: true }),
  StarterKit.configure({
    heading: false,
    codeBlock: false,
    bulletList: {},
    orderedList: {},
    dropcursor: false,
    gapcursor: false,
    link: false,
    underline: false,
  }),
  Heading.configure({ levels: [1, 2, 3] }),
  CodeBlockLowlight.configure({ lowlight }),
  Underline,
  Link.configure({ openOnClick: false }),
  Image.configure({ allowBase64: true }),
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  Youtube.configure({ controls: false }),
  TaskList,
  TaskItem.configure({ nested: true }),
];

interface TipTapRendererProps {
  content: any;
}

/**
 * Ultimate TipTap Renderer (V2): 
 * Generates pure HTML from JSON to guarantee perfect visibility and zero hydration lag.
 * This is the most robust way to ensure images and technical markdown always appear correctly.
 */
export default function TipTapRenderer({ content }: TipTapRendererProps) {
  const htmlContent = useMemo(() => {
    if (!content) return "";

    // Case 1: Raw Markdown String (Legacy / Fallback)
    if (typeof content === "string") {
      try {
        return marked.parse(content, { gfm: true, breaks: true }) as string;
      } catch (e) {
        return content;
      }
    }

    // Case 2: TipTap JSON (Modern)
    try {
      const html = generateHTML(content, RENDERER_EXTENSIONS);
      // Diagnostic Trace: Inspect the exact URLs being generated
      if (typeof window !== 'undefined' && html.includes('<img')) {
        const firstImgMatch = html.match(/<img[^>]+src="([^">]+)"/);
        console.log("📡 RENDERER_TRACE:", firstImgMatch ? `URL_FOUND: ${firstImgMatch[1].substring(0, 50)}...` : "NO_SRC_IN_IMG_TAG");
        if (html.includes('src="null"') || html.includes('src="undefined"')) {
           console.warn("⚠️ RENDERER_TRACE: Detected broken/null URL in output.");
        }
      }
      return html;
    } catch (e) {
      console.error("Renderer failed to generate HTML from JSON:", e);
      return "ERROR_GENERATING_CONTENT";
    }
  }, [content]);

  return (
    <div 
      className="prose prose-invert max-w-none 
        prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight 
        prose-p:text-text-low prose-p:leading-relaxed prose-p:font-mono prose-p:text-sm
        prose-img:rounded-lg prose-img:border prose-img:border-border-dim/10
        prose-blockquote:border-l-accent-orange prose-blockquote:bg-accent-orange/5 prose-blockquote:py-2 prose-blockquote:px-6
        prose-code:text-accent-neon prose-code:bg-surface-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:text-[13px]
        prose-ul:text-text-low prose-ol:text-text-low"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
}
