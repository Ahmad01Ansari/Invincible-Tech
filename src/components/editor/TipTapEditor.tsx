"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import Youtube from "@tiptap/extension-youtube";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { generateJSON } from "@tiptap/html";
import { marked } from "marked";
import TipTapRenderer from "@/components/blog/TipTapRenderer";
import { Extension, nodeInputRule } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import Heading from "@tiptap/extension-heading";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { 
  Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Code, 
  Heading1, Heading2, Image as ImageIcon, Link as LinkIcon, 
  Video, Table as TableIcon, Sun, Moon, Terminal, Eye, EyeOff
} from "lucide-react";
import { useState, useEffect } from "react";

const lowlight = createLowlight(common);

/**
 * Technical Asset Extension: 
 * Renamed from 'image' to establish a unique, non-colliding identity in the schema.
 * Ensures the 'src' attribute is NEVER dropped during parsing or rendering.
 * [ASSET_IDENTITY_VERIFIED: 2026-04-05T11:30:00Z]
 */
const TechnicalImage = Image.extend({
  name: "technicalAsset", // Use a custom name to avoid collisions
  
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src'),
      },
      alt: {
        default: 'Technical Blueprint',
        parseHTML: element => element.getAttribute('alt'),
      },
    }
  },
  
  parseHTML() {
    return [
      {
        tag: 'img[src]', // Capture ANY img tag and convert it to technicalAsset
        getAttrs: element => {
           if (typeof element === 'string') return false;
           return {
             src: element.getAttribute('src'),
             alt: element.getAttribute('alt')
           }
        }
      },
    ]
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /!\[(.+|.*?)\]\((.+|.*?)(\s+".*")?\)\s$/,
        type: this.type,
        getAttributes: match => {
          const [, alt, src] = match;
          return { src, alt };
        },
      }),
    ];
  },
});

/**
 * Smart Paste Extension:
 * Intercepts clipboard data and converts Markdown to TipTap-compatible HTML.
 */
const PasteMarkdown = Extension.create({
  name: "pasteMarkdown",
  addProseMirrorPlugins() {
    const { editor } = this;
    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            const text = event.clipboardData?.getData("text/plain");
            if (!text) return false;

            // Detection for Markdown patterns (headers, bold, lists, etc.)
            const isMarkdown = /(\*\*|__).*(\*\*|__)|#\s|#{2,6}\s|^\s*[-*+]\s|\[.*\]\(.*\)|!\[.*\]\(.*\)/m.test(text);
            
            if (isMarkdown) {
              try {
                // Use custom renderer for images to ensure perfect attribute parity
                const renderer = new marked.Renderer();
                renderer.image = ({ href, title, text }) => {
                   return `<img data-type="technicalAsset" src="${href}" alt="${text}" title="${title || ''}" />`;
                };

                const html = marked.parse(text, { 
                   renderer,
                   gfm: true,
                   breaks: true 
                }) as string;
                
                if (html) {
                  editor.chain().focus().insertContent(html).run();
                  return true;
                }
              } catch (e) {
                console.error("Custom Paste conversion failed:", e);
              }
            }
            return false;
          },
        },
      }),
    ];
  },
});

interface EditorProps {
  content: any;
  onChange: (json: any) => void;
}

export default function TipTapEditor({ content, onChange }: EditorProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      PasteMarkdown,
      StarterKit.configure({
        heading: false, // Use configured heading extension below
        codeBlock: false,
        dropcursor: false,
        gapcursor: false,
        link: false,
        underline: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlockLowlight.configure({ lowlight }),
      Underline,
      Link.configure({ openOnClick: false }),
      TechnicalImage.configure({ allowBase64: true }),
      Placeholder.configure({ placeholder: "Paste your technical insight (or Markdown from ChatGPT) here..." }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      Youtube.configure({ controls: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      // CLIENT_TRACE: Inspect the Asset Meta in your browser console (F12)
      if (typeof window !== 'undefined') {
        const jsonStr = JSON.stringify(json);
        const hasAsset = jsonStr.includes('"type":"technicalAsset"');
        if (hasAsset) {
          // Deep Inspection Log
          const assetNode = json.content.find((n: any) => n.type === 'technicalAsset' || (n.content && n.content.some((cn: any) => cn.type === 'technicalAsset')));
          console.log("📡 CLIENT_TRACE (Asset Captured):", { 
             status: "LOCKED", 
             hasSrc: jsonStr.includes('"src":"http'),
             nodePreview: JSON.stringify(assetNode).substring(0, 100)
          });
        }
      }
      onChange(json);
    },
    editorProps: {
      attributes: {
        class: `prose ${isDarkMode ? 'prose-invert text-text-high' : 'prose-slate text-slate-800'} max-w-none focus:outline-none min-h-[600px] font-mono text-sm leading-relaxed p-8`,
      },
      handleDOMEvents: {
        focus: () => { setIsFocused(true); return false; },
        blur: () => { setIsFocused(false); return false; },
      },
    },
  });

  // Sync content if it changes externally (important for Edit mode)
  useEffect(() => {
    if (editor && content && editor.getJSON() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="w-full relative py-8 border-y border-border-dim/20">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 mb-6 sticky top-0 bg-obsidian z-20 pb-4 border-b border-border-dim/10">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}><Heading1 size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 size={16} /></ToolbarButton>
        <div className="w-px h-4 bg-border-dim/30 mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered size={16} /></ToolbarButton>
        <div className="flex-grow" />
        <ToolbarButton onClick={() => setIsDarkMode(!isDarkMode)} active={!isDarkMode}>{isDarkMode ? <Sun size={16} /> : <Moon size={16} />}</ToolbarButton>
        <ToolbarButton onClick={() => setIsPreviewMode(!isPreviewMode)} active={isPreviewMode}>{isPreviewMode ? <EyeOff size={16} /> : <Eye size={16} />}</ToolbarButton>
      </div>

      {/* Editor Surface */}
      <div className={`transition-all duration-300 rounded-sm border-2 ${isFocused ? 'border-accent-orange' : 'border-border-dim/20'} ${isDarkMode ? 'bg-surface-100' : 'bg-white'}`}>
        {isPreviewMode ? (
          <div className="bg-obsidian/40 p-8 min-h-[600px] overflow-y-auto">
            <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em] mb-12 border-b border-border-dim/10 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Terminal size={12} className="text-accent-orange" />
                 <span>Blog Lifecycle Preview</span>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-accent-orange text-[10px]">VERIFIED_OUTPUT</span>
                 <span className="h-2 w-2 rounded-full bg-accent-orange animate-pulse" />
              </div>
            </div>
            <TipTapRenderer content={editor.getJSON()} />
          </div>
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}

function ToolbarButton({ children, onClick, active }: { children: React.ReactNode, onClick: () => void, active?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors ${active ? "bg-accent-orange text-obsidian" : "text-text-low hover:text-white hover:bg-white/10"}`}>
      {children}
    </button>
  );
}
