const Uploader = ({ handleFile, fontFileName, error }) => {

    return (
        <div className="uploader">
            <span className="upload-label">Click to select a file: </span>
            <input type="file" accept=".woff, .ttf, .otf" onChange={handleFile} />
            {error && <p className="error">Error: {error}</p>}
            {fontFileName && <p>Font name: {fontFileName}</p>}
        </div>
    );
}
 
export default Uploader;