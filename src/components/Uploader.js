const Uploader = ({ handleFile, fontFileName, error }) => {

    return (
        <div className="uploader">
            <span className="upload-label">Click to select a file: </span>
            <input type="file" accept=".woff, .ttf, .otf" onChange={handleFile} />
            {fontFileName && <p>Font name: {fontFileName}</p>}
            {error && <p className="error">Error: {error}</p>}
        </div>
    );
}
 
export default Uploader;