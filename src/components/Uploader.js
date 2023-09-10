const Uploader = ({ handleFile, fontFileName, error, fontFormat }) => {

    return (
        <div className="uploader">
            <input tabIndex={1} name="file-upload-btn" className="upload-btn" type="file" accept=".woff, .ttf, .otf" onChange={handleFile} />
            {fontFileName && !error && (
                <p>
                    Name: <span style={{color: "#347eff"}}>{fontFileName} </span>
                    Format: <span style={{color: "#347eff"}}>{fontFormat.toUpperCase()}</span>
                </p>
            )}
            {error && <p className="error">Error: {error}.</p>}
        </div>
    );
}
 
export default Uploader;