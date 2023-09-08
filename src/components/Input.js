const Input = ({ handleInput }) => {

    return (
        <div className="input">
            <textarea name="input-text" cols="50" rows="5" onChange={handleInput} placeholder="Enter your text here..."></textarea>
            <p>INSTRUCTIONS: Upload your font file, input some text, then toggle the preview button. This app uses Fira Sans as its default font.</p>
            <p className="notice">NOTE: Firefox is recommended for this app due to limitations in rendering values. When using other browsers, app may crash on certain fonts.</p>
            <small className="questions">Questions? Ask <a href="https://articulate.slack.com/team/U0126QRG1QD">@johnrey</a></small>
        </div>
    );
}
 
export default Input;