import * as React from 'react';
import * as ReactDOM from 'react-dom';

function render() {
    ReactDOM.render(
        <App />,
        document.body
    );
}

render();

function App() {
    return (
        <>
            <h2>Hello from React!</h2>
            <FrameLoader
                targetPath={"/home/georgehill/Dropbox/GH Data (Dropbox)/Data 1 (Ind)/a Business, Current/FF/experiments/embedding-pdfs/embed-pdfs/my-new-app/src/test.pdf"}
            />
        </>
    );
}


function FrameLoader(props) {

    const { targetPath } = props;

    const [fileId, setFileId] = React.useState(null);

    React.useEffect(() => {
        let okToSetFileId = true;
        const thePromise = window.electron.ipcApi.askForFileToBeServed(
            targetPath
        );
        thePromise.then(processTheResult);
        function processTheResult(result) {
            if (okToSetFileId) setFileId(result);
        }
        function cleanUp() {
            okToSetFileId = false;
        }
        return cleanUp;
    }, []);

    const useSrc = (fileId === null) ?
        null : `protocol://secretString/${fileId}`;

    console.log(useSrc);

    /*
                    <iframe
                        sandbox={""}
                        key={targetPath}
                        src={useSrc}
                        className="ff-fileViewer-iframe"
                    >
                    </iframe>
    */

    /*
                <webview
                    src={useSrc}
                >
                </webview>
    */

    /*
    <embed
        type="application/pdf"
        src={useSrc}
    >
    </embed>
    */

    return (
        <>
            {(useSrc === null) ?
                null
                :
                <iframe
                    src={useSrc}
                    sandbox={""}
                >
                </iframe>
            }
        </>
    );

}
