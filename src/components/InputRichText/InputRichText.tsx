import { Editor } from '@tinymce/tinymce-react'
import { memo } from 'react'

interface Props {
  label?: string
  defaultValue?: string
  classNameWrapper?: string
  onChange?: () => void
}

const InputRichText = ({ label, defaultValue, classNameWrapper, onChange }: Props) => {
  return (
    <div className={classNameWrapper}>
      <label className='mb-2 block text-sm font-semibold empty:hidden'>{label}</label>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
        initialValue={defaultValue}
        onEditorChange={onChange}
        init={{
          height: 500,
          nowrap: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        }}
      />
    </div>
  )
}

export default memo(InputRichText)
