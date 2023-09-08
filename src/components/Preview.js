import { useState } from "react"

const Preview = ({ input, customFontClass }) => {
    const [checked, setChecked] = useState('')
    const [fontClass, setFontClass] = useState('')
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [light, setlight] = useState(false)
    const outputText = document.getElementById('outputText')

    const handleChecked = () => {
        if (checked === '') {
            setChecked('checked')
            setFontClass(customFontClass)
        } else {
            setChecked('')
            setFontClass('')
        }
    }

    const handleBold = () => {
        if (!bold) {
            setBold(true)
            outputText.style.fontWeight = 700
        } else if (bold) {
            setBold(false)
            outputText.style.fontWeight = 400
        }
    }

    const handlelight = () => {
        if (!light) {
            setlight(true)
            outputText.style.fontWeight = 100
        } else if (light) {
            setlight(false)
            outputText.style.fontWeight = 400
        }
    }

    const handleItalic = () => {
        if (!italic) {
            setItalic(true)
            outputText.style.fontStyle = 'italic'
        } else if (italic) {
            setItalic(false)
            outputText.style.fontStyle = ''
        }
    }

    return (
        <div className="preview">
            <div className="output">
                <div id="outputText" className={fontClass}>{input}</div>
                <div className="toggler">
                    <p>Preview font</p>
                    <div className="switch">
                        <label className="switch">
                            <input type="checkbox"  onChange={handleChecked} checked={checked} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <span className="format-btn">
                    <button onClick={handleBold} style={{fontWeight: 'bold'}}>Bold</button>
                    <button onClick={handlelight} style={{fontWeight: 'light'}}>Light</button>
                    <button onClick={handleItalic} style={{fontStyle: 'italic'}}>Italic</button>
                </span>
            </div>
        </div>
    );
}
 
export default Preview;