/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */
import findContentById from '@/utils/findContentById'
import { useState } from 'react'
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUndoAlt,
  FaRedoAlt,
  FaEdit,
  FaTimes,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
} from 'react-icons/fa'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function TextEditor({ updateContent, element, data, style, closeEditor, edit }) {
  const [elementData, setElementData] = useState(findContentById(element.id, data.content))

  const editor = useEditor({
    extensions: [StarterKit],
    content: elementData.content,
    autofocus: 'all',
    onUpdate({ editor }) {
      updateContent(editor.getHTML())
    },
  })

  return (
    <>
      {editor && (
        <div
          id="textEditorToolbar"
          className="fixed top-0 left-0 z-50 shadow-lg text-lg flex items-center justify-between bg-white text-slate-900 py-2 px-3 w-full cursor-default"
          style={{
            width: 'calc(100% - 293px)',
            top: '53px',
            left: '293px',
          }}
        >
          <div
            style={{ width: '550px', maxWidth: '100&%' }}
            className="space-x-3 text-lg flex items-items justify-evenly"
          >
            <div className="flex">
              <button className="toolbar-button font-bold text-base" onClick={edit}>
                <FaEdit className="mr-2" /> Edit Style
              </button>
            </div>
            <div className="flex text-lg">
              <div className="space-x-3 flex items-items bg-slate-100 rounded-md p-1 px-4">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? 'is-active' : ''}
                >
                  <FaBold />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? 'is-active' : ''}
                >
                  <FaItalic />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={editor.isActive('strike') ? 'is-active' : ''}
                >
                  <FaStrikethrough />
                </button>

                <button
                // onClick={() => editor.chain().focus().toggleStrike().run()}
                // disabled={!editor.can().chain().focus().toggleStrike().run()}
                // className={editor.isActive('strike') ? 'is-active' : ''}
                >
                  <FaAlignLeft />
                </button>
                <button
                // onClick={() => editor.chain().focus().toggleStrike().run()}
                // disabled={!editor.can().chain().focus().toggleStrike().run()}
                // className={editor.isActive('strike') ? 'is-active' : ''}
                >
                  <FaAlignCenter />
                </button>
                <button
                // onClick={() => editor.chain().focus().toggleStrike().run()}
                // disabled={!editor.can().chain().focus().toggleStrike().run()}
                // className={editor.isActive('strike') ? 'is-active' : ''}
                >
                  <FaAlignRight />
                </button>
              </div>

              <div className="pl-12 space-x-6 flex">
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                >
                  <FaUndoAlt />
                </button>
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                >
                  <FaRedoAlt />
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <button className="toolbar-button  font-bold text-base" onClick={closeEditor}>
              <FaTimes className="mr-1" /> Close
            </button>
          </div>
        </div>
      )}
      <div style={style}>
        <EditorContent editor={editor} />
      </div>
    </>
  )
}
