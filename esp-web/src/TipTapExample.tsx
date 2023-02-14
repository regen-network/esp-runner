import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import {HocuspocusProvider} from '@hocuspocus/provider'

const provider = new HocuspocusProvider({
    url: 'ws://127.0.0.1:5001/doc',
    name: 'example-document',
})

const TipTapExample = () => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            Collaboration.configure({
                document: provider.document,
            })],
    })

    return (
        <EditorContent editor={editor}/>
    )
}

export default TipTapExample