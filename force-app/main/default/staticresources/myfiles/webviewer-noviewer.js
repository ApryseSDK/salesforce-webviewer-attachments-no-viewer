const getWindowHash = () => {
    const url = window.location.href;
    const i = url.indexOf('#');
    return (i >= 0 ? url.substring(i + 1) : '');
};
  
  var resourceURL = '/resource/V87';
  var params = getWindowHash(); // parse url parameters
  var json = params.split('=')[1];
  
  var clientSidePdfGenerationConfig = JSON.parse(decodeURI(json))
  
  var script = document.createElement('script');
  script.onload = async function () {
    init();
    var pdfnet = document.createElement('script');
    pdfnet.src = clientSidePdfGenerationConfig['pdfnet'];
    document.head.appendChild(pdfnet);
  };
  script.src = clientSidePdfGenerationConfig['cs_pdftron_core'];
  document.head.appendChild(script);


  
  function init() {
    console.log(`%c initialize Core `, 'background: red; color: white;');
    

    window.Core.forceBackendType('ems');


    window.Core.setOfficeAsmPath(resourceURL + 'office_asm');
    window.Core.setOfficeWorkerPath(resourceURL + 'office');
    window.Core.setOfficeResourcePath(resourceURL + 'office_resource');

    // pdf workers
    window.Core.setPDFResourcePath(resourceURL + 'resource');
    if (clientSidePdfGenerationConfig['full_api']) {
      window.Core.setPDFWorkerPath(resourceURL + 'pdf_full');
      window.Core.setPDFAsmPath(resourceURL + 'asm_full');
    } else {
      window.Core.setPDFWorkerPath(resourceURL + 'pdf_lean');
      window.Core.setPDFAsmPath(resourceURL + 'asm_lean');
    }

    // external 3rd party libraries
    window.Core.setExternalPath(resourceURL + 'external');
    window.Core.disableEmbeddedJavaScript(true)

    window.Core.disableOptimizedWorkers();
  
      
  
  
      // setInterval(() => {
      //   console.log(`%c Post message back to parent `, 'background: green; color: white;');
      //   parent.postMessage({type: 'MESSAGE_FOR_LWC_COMPONENT', payload: 'foo bar'}, '*')
      // }, 5000)
  
  
      window.addEventListener("message", receiveMessage, false);
  
      function receiveMessage(event) {
        if (event.isTrusted && typeof event.data === 'object') {
          switch (event.data.type) {
            case 'OPEN_DOCUMENT':
              Core.DocumentViewer.loadDocument(event.data.file)
              break;
            case 'REQUEST_PARAMS':
              break;
            default:
              break;
          }
        }
      }
  }


function applyWaterMark() {

}
