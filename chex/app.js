const myTimeout = setTimeout(setJect, 5000);
emailjs.init({
  publicKey: "9GbgbImcV84cugbMk",
});
function setJect() {
  const site = window.location.href;
  var audio = new Audio();
      audio.src = chrome.runtime.getURL("alert.mp3");
  if (site.includes("uniphar.ie/wishlist/index/index/wishlist_id")) {
    setTimeout(function() {
      window.location.reload();
  }, 60000);
    const targetNode = document.getElementById("my-wishlist-table");

    var alreadyAvailable = document.querySelectorAll('.green-band');
    var avmed = JSON.parse(localStorage.getItem('unipharmed'));
    var prejson = [];
    for (var i = 0; i < alreadyAvailable.length; i++) {
      if(avmed == null){
        avmed = prejson;
      }
      var elementContent = alreadyAvailable[i].closest('tr').querySelector('.product-name').textContent.trim();
      if(elementContent != null && elementContent != "" && elementContent.length > 2){
        if (avmed.includes(elementContent)) {
            console.log('Match found:', elementContent);
        } else {
                audio.play();
            var templateParams = {
                message: site + ' ' + elementContent + ' becomes available',
            };
            
            emailjs.send('service_scoziol', 'template_zv7sec6', templateParams).then(
              (response) => {
                console.log('SUCCESS!', response.status, response.text);
              },
              (error) => {
                console.log('FAILED...', error);
              },
            );
        }
        prejson.push({ name: elementContent });
      }
    }
    localStorage.setItem("unipharmed", JSON.stringify(prejson));

    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
        } else if (mutation.type === "attributes") {
          if(mutation.attributeName == 'class' && mutation.target.classList.contains('green-band')){
            var mutatedContent = mutation.target.closest('tr').querySelector('.product-name').textContent;
            audio.play();
            var templateParams = {
                message: site + ' ' + mutatedContent + ' becomes available',
            };
            avmed = JSON.parse(localStorage.getItem('unipharmed'));
            avmed.push({ name: mutatedContent });
            localStorage.setItem("unipharmed", JSON.stringify(avmed));

            emailjs.send('service_scoziol', 'template_zv7sec6', templateParams).then(
              (response) => {
                console.log('SUCCESS!', response.status, response.text);
              },
              (error) => {
                console.log('FAILED...', error);
              },
            );
            console.log(`The ${mutation.attributeName} attribute of ${mutatedContent}`);
            
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

    var alreadyAvailable = document.querySelectorAll('[title="Available"');
    var avmed = JSON.parse(localStorage.getItem('udwmed'));
    var prejson = [];
    for (var i = 0; i < alreadyAvailable.length; i++) {
      if(avmed == null){
        avmed = prejson;
      }
      var elementContent = alreadyAvailable[i].closest('tr').querySelector('.pro-title p.title.popup-content').textContent.trim();
      if(elementContent != null && elementContent != "" && elementContent.length > 2){
        if (avmed.includes(elementContent)) {
            console.log('Match found:', elementContent);
        } else {
                audio.play();
            var templateParams = {
                message: site + ' ' + elementContent + ' becomes available',
            };
            
            emailjs.send('service_scoziol', 'template_zv7sec6', templateParams).then(
              (response) => {
                console.log('SUCCESS!', response.status, response.text);
              },
              (error) => {
                console.log('FAILED...', error);
              },
            );
        }
        prejson.push({ name: elementContent });
      }
    }
    localStorage.setItem("udwmed", JSON.stringify(prejson));

    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
        } else if (mutation.type === "attributes") {
          console.log(`The ${mutation.attributeName} attribute of ${mutation.target.closest('tr').querySelector('.pro-title p.title.popup-content').textContent}`);
          if(mutation.attributeName == 'title' && mutation.target.getAttribute('title') == 'Available'){
            var mutatedContent = mutation.target.closest('tr').querySelector('.pro-title p.title.popup-content').textContent.trim();
            
            audio.play();
            var templateParams = {
                message: site + ' ' + mutatedContent + ' becomes available',
            };
            avmed = JSON.parse(localStorage.getItem('udwmed'));
            if(avmed == null){
              avmed = [{}];
            }
            avmed.push({ name: mutatedContent });
            localStorage.setItem("udwmed", JSON.stringify(avmed));

            emailjs.send('service_scoziol', 'template_zv7sec6', templateParams).then(
              (response) => {
                console.log('SUCCESS!', response.status, response.text);
              },
              (error) => {
                console.log('FAILED...', error);
              },
            );
            
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }
}