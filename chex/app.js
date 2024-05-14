const myTimeout = setTimeout(setJect, 5000);
emailjs.init({
  publicKey: "9GbgbImcV84cugbMk",
});
function setJect() {
  const site = window.location.href;
  if (site.includes("uniphar.ie/wishlist/index/index/wishlist_id")) {
    setTimeout(function() {
      window.location.reload();
  }, 60000);
    const targetNode = document.getElementById("my-wishlist-table");
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
        } else if (mutation.type === "attributes") {
          if(mutation.attributeName == 'class' && mutation.target.classList.contains('green-band')){
            var audio = new Audio();
            audio.src = chrome.runtime.getURL("alert.mp3");
            audio.play();
            var templateParams = {
              message: site + ' ' + mutation.target.closest('tr').querySelector('.product-name').textContent + ' becomes available',
            };
            
            emailjs.send('service_scoziol', 'template_zv7sec6', templateParams).then(
              (response) => {
                console.log('SUCCESS!', response.status, response.text);
              },
              (error) => {
                console.log('FAILED...', error);
              },
            );
            // alert(`${mutation.target.closest('tr').querySelector('.product-name').innerHTML} becomes available`);
            console.log(`The ${mutation.attributeName} attribute of ${mutation.target.closest('tr').querySelector('.product-name').innerHTML}`);
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  } else if (site.includes("udw.ie/WishList")) {
    setTimeout(function() {
      window.location.reload();
  }, 60000);
    const targetNode = document.querySelector("#target-load table");
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
        } else if (mutation.type === "attributes") {
          console.log(`The ${mutation.attributeName} attribute of ${mutation.target.closest('tr').querySelector('.pro-title p.title.popup-content').textContent}`);
          if(mutation.attributeName == 'title' && mutation.target.getAttribute('title') == 'Available'){
            var audio = new Audio();
            audio.src = chrome.runtime.getURL("alert.mp3");
            audio.play();
            var templateParams = {
              message: site + ' ' + mutation.target.closest('tr').querySelector('.pro-title p.title.popup-content').textContent + ' becomes available',
            };
            
            emailjs.send('service_scoziol', 'template_zv7sec6', templateParams).then(
              (response) => {
                console.log('SUCCESS!', response.status, response.text);
              },
              (error) => {
                console.log('FAILED...', error);
              },
            );
            // alert(`${mutation.target.closest('tr').querySelector('.product-name').innerHTML} becomes available`);
            // console.log(`The ${mutation.attributeName} attribute of ${mutation.target.closest('tr').querySelector('.product-name').innerHTML}`);
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }
}