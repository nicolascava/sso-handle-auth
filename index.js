import url from 'url';
import {isString} from 'lodash';

function handleAuth(targetDomain) {
  if (!isString(targetDomain)) throw new Error('Handle Auth Module Init - targetDomain must be a string.');

  if (!url.parse(targetDomain).hostname) {
    throw new Error('Handle Auth Module Init - targetDomain must be a valid URL.');
  }

  return (req, res) => {
    res.removeHeader('X-Frame-Options');
    res.status(200);
    res.send(`
      <DOCTYPE!>
      <html>
        <head>
          <script>
            function handleMessage(event) {
              if (event.origin !== '${targetDomain}') return;
              
              if (event.data.ssid) {
                document.cookie = 'ssid=' + event.data.ssid;
                event.source.postMessage({created: true}, event.origin);
              } else if (event.data.destroy) {
                document.cookie = 'ssid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                event.source.postMessage({destroyed: true}, event.origin);
              }
            }

            if (window.postMessage && window.parent) {
              window.addEventListener('message', handleMessage, false);
            }
          </script>
        </head>
      </html>
    `);
  };
}

export default handleAuth;
