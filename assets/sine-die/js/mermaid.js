import mermaid from "mermaid";


const mermeidElementsSelector = 'pre.mermaid code';

const mermeidElements = document.querySelectorAll(mermeidElementsSelector);

for (var i = 0; i < mermeidElements.length; i++) {
  window.colorSchemaManager.registerEventHandler(mermeidElements[i], update);
}

function update(event) {
  let element = event.target;

  if (element.parentElement.dataset.base64src) {
    element.removeAttribute('data-processed');
    const diagramBytesString = Uint8Array.fromBase64(element.parentElement.dataset.base64src)
    const diagramText = new TextDecoder().decode(diagramBytesString);
    element.textContent = diagramText;
    mermaid.initialize({
      startOnLoad: false,
      darkMode: event.isDarkMode,
      theme: event.isDarkMode ? 'dark' : 'base',
    });
    mermaid.run({ nodes: [element] });
  }
}

mermaid.initialize({
  startOnLoad: false,
  darkMode: window.colorSchemaManager.isDarkMode,
  theme: window.colorSchemaManager.isDarkMode ? 'dark' : 'base',
});

mermaid.run({
  nodes: mermeidElements,
});
