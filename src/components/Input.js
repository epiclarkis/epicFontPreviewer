const Input = ({ handleInput }) => {

    return (
        <div className="input">
            <textarea tabIndex={2} name="input-text" cols="50" rows="5" onChange={handleInput} placeholder="Enter your text here..."></textarea>
            <p>Upload your font file, input some text, then toggle the preview button. This app uses Fira Sans as its default font.</p>
            <p className="questions">Questions? Ask @johnrey</p>
        </div>
    );
}
 
export default Input;