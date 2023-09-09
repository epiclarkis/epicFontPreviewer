import 'normalize.css/normalize.css'
import Uploader from './components/Uploader'
import Input from './components/Input'
import Preview from './components/Preview'
import Nav from './components/Nav'
import { useState } from 'react'
import opentype from 'opentype.js'

function App() {
  const [fontFile, setFontFile] = useState(null)
  const [input, setInput] = useState('')
  const [fontFileName, setFontFileName] = useState(null)
  const [fontFormat, setFontFormat] = useState('')
  const [customFontClass, setCustomFontClass] = useState('')
  const [error, setError] = useState('')

  const handleInput = (e) => {
      setInput(e.target.value)
  }

  const handleFile = async (e) => {
      const file = e.target.files[0]

      if (!file) return

      const reader = new FileReader()

      reader.onload = () => {
        try {
          const arrayBuffer = reader.result
          const font = opentype.parse(arrayBuffer)
          const fontName = font.names.fullName.en

          setFontFile(arrayBuffer)
          setFontFileName(fontName)

          // Determine the font format based on the file's type
          const fontFormat = getFileFormat(file)
          setFontFormat(fontFormat)

          applyFontToElement(arrayBuffer, fontName, fontFormat)

        } catch (error) {
          console.error(error)
          setError('Cannot parse font file')
        }
      }

      reader.readAsArrayBuffer(file)
  }

  const applyFontToElement = (fontData, fontName, fontFormat) => {

    if (!fontData) {
      console.error('Font data is missing.')
      return
    }

    // Encode font data as Base64
    const base64FontData = btoa(
      String.fromCharCode.apply(null, new Uint8Array(fontData))
    )
  
    if (!base64FontData) {
      console.error('Failed to encode font data in Base64.')
      return
    }

    // Define the format string based on the provided font format
    let formatString = ''
    
    if (fontFormat === 'otf') {
      formatString = 'opentype'
    } else if (fontFormat === 'ttf') {
      formatString = 'truetype'
    } else if (fontFormat === 'woff') {
      formatString = 'woff'
    } else {
      console.error('Unsupported font format:', fontFormat)
      return
    }

    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      @font-face {
        font-family: "${fontName}";
        src: url('data:font/${fontFormat};base64,${base64FontData}') format('${formatString}');
      }
      
      .custom-font {
        font-family: "${fontName}";
      }
    `

    document.head.appendChild(styleElement)
    setCustomFontClass('custom-font')
}

  // Determine the font format based on the file type
  const getFileFormat = (file) => {
    const fileName = file.name
    const fileExtension = fileName.split('.').pop().toLowerCase()

    const formatMapping = {
      ttf: 'ttf',
      otf: 'otf',
      woff: 'woff',
    }

    const fontFormat = formatMapping[fileExtension]

    return fontFormat
  }

  return (
    <div className="App">
      <Nav />
      <div className="container">
        <Preview input={input} fontFileName={fontFileName} customFontClass={customFontClass} />
        <Uploader handleFile={handleFile} fontFileName={fontFileName} error={error} fontFormat={fontFormat} />
        <Input handleInput={handleInput} />
      </div>
    </div>
  )
}

export default App
