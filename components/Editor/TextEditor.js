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
  FaAlignJustify,
} from 'react-icons/fa'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cloneDeep } from 'lodash'
import { findContentById } from '@/utils/utility/findContentById'
import { motion } from 'framer-motion'

export default function TextEditor({
  updateContent,
  element,
  data,
  style,
  closeEditor,
  edit,
  updateStyle,
  width,
  height,
}) {
  const [elementData] = useState(findContentById(element.id, data.data.content))

  const editor = useEditor({
    extensions: [StarterKit],
    content: elementData.content,
    autofocus: 'all',
    onUpdate({ editor }) {
      updateContent(editor.getText())
    },
  })

  return (
    <>
      {editor && (
        <div
          id="textEditorToolbar"
          className="fixed top-0 left-0 z-50 shadow-sm text-lg flex items-center justify-between bg-white text-slate-900 py-2 px-3 w-full cursor-default"
          style={{
            width: 'calc(100% - 340px)',
            top: '53px',
            left: '340px',
          }}
        >
          <div
            style={{ width: '590px', maxWidth: '100%' }}
            className="space-x-3 text-lg flex items-items justify-between"
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
                  className={`${editor.isActive('bold') ? 'active-text-toolbar' : ''} p-1`}
                >
                  <FaBold />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={`${editor.isActive('italic') ? 'active-text-toolbar' : ''} p-1`}
                >
                  <FaItalic />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={`${editor.isActive('strike') ? 'active-text-toolbar' : ''} p-1`}
                >
                  <FaStrikethrough />
                </button>

                <button
                  onClick={() => {
                    const newStyle = cloneDeep(style)
                    newStyle.textAlign = 'left'
                    updateStyle(newStyle)
                  }}
                  className={`${style.textAlign === 'left' ? 'active-text-toolbar' : ''} p-1 rounded`}
                >
                  <FaAlignLeft />
                </button>
                <button
                  onClick={() => {
                    const newStyle = cloneDeep(style)
                    newStyle.textAlign = 'center'
                    updateStyle(newStyle)
                  }}
                  className={`${style.textAlign === 'center' ? 'active-text-toolbar' : ''} p-1 rounded`}
                >
                  <FaAlignCenter />
                </button>
                <button
                  onClick={() => {
                    const newStyle = cloneDeep(style)
                    newStyle.textAlign = 'right'
                    updateStyle(newStyle)
                  }}
                  className={`${style.textAlign === 'right' ? 'active-text-toolbar' : ''} p-1 rounded`}
                >
                  <FaAlignRight />
                </button>
                <button
                  onClick={() => {
                    const newStyle = cloneDeep(style)
                    newStyle.textAlign = 'justify'
                    updateStyle(newStyle)
                  }}
                  className={`${style.textAlign === 'justify' ? 'active-text-toolbar' : ''} p-1 rounded`}
                >
                  <FaAlignJustify />
                </button>
              </div>

              <div className="pl-16 space-x-6 flex">
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

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: editor ? 1 : 0, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <div style={style}>
          <EditorContent editor={editor} />
        </div>
      </motion.div>
    </>
  )
}
