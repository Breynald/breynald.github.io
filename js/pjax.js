(function() {
    // eslint-disable-next-line no-unused-vars
    let pjax;

    function initPjax() {
        try {
            const Pjax = window.Pjax || function() {};
            pjax = new Pjax({
                selectors: [
                    'head title',
                    '.columns',
                    '.navbar-start',
                    '.navbar-end',
                    '.searchbox',
                    '#back-to-top',
                    '[data-pjax]',
                    '.pjax-reload'
                ]
            });
        } catch (e) {
            console.warn('PJAX error: ' + e);
        }
    }

    // // Listen for start of Pjax
    // document.addEventListener('pjax:send', function() {
    //     return;
    //     // TODO pace start loading animation
    // })

    // // Listen for completion of Pjax
    // document.addEventListener('pjax:complete', function() {
    //     return;
    //     // TODO pace stop loading animation
    // })
    
	// listen pjax:end event in pjax.js
    document.addEventListener('pjax:end', function () {
        // MathJax is global, can be used directly
        MathJax.typesetPromise();
    });



    document.addEventListener('DOMContentLoaded', () => initPjax());
}());
