import 'normalize.css/normalize.css'
import Uploader from './components/Uploader'
import Input from './components/Input'
import Preview from './components/Preview'
import Nav from './components/Nav'
import { useState } from 'react'
import opentype from 'opentype.js';

function App() {
  const [fontFile, setFontFile] = useState(null)
  const [input, setInput] = useState('')
  const [fontFileName, setFontFileName] = useState(null)
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

          applyFontToElement(arrayBuffer, fontName)
        } catch (error) {
          console.error(error)
          setError('Cannot parse font file')
        }
      }

      reader.readAsArrayBuffer(file);
  }

  const applyFontToElement = (fontData, fontName) => {

    if (!fontData) {
      console.error('Font data is missing.')
      return
    }
  
    const base64FontData = btoa(
      String.fromCharCode.apply(null, new Uint8Array(fontData))
    )
  
    if (!base64FontData) {
      console.error('Failed to encode font data in Base64.')
      return
    }

    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      @font-face {
        font-family: "${fontName}";
        src: url('data:font/opentype;base64,${base64FontData}') format('opentype');
      }
      
      .custom-font {
        font-family: "${fontName}";
      }
    `

    document.head.appendChild(styleElement)
    setCustomFontClass('custom-font')
  };

  return (
    <div className="App">
      <Nav />
      <div className="container">
        <Preview input={input} fontFileName={fontFileName} customFontClass={customFontClass} />
        <Uploader handleFile={handleFile} fontFileName={fontFileName} error={error} />
        <Input handleInput={handleInput} />
      </div>
    </div>
  );
}

export default App;
