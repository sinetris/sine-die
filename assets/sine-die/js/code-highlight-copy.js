class CodeBlockCopyButton {
  #button
  #preCodeBlock
  #labelCopy = 'Copy'
  #labelCopied = 'Copied!'
  #iconCopy = 'content_copy'
  #iconCopied = 'done_outline'
  constructor(preCodeBlock) {
    let button = document.createElement('button');
    button.addEventListener("click", this.copyCode.bind(this));
    preCodeBlock.parentNode.insertBefore(button, preCodeBlock);
    this.#button = button;
    this.setCopyButton();
    this.#preCodeBlock = preCodeBlock;
  }

  copyCode() {
    let codeText = this.getCodeText();
    navigator.clipboard.writeText(codeText);
    setTimeout(this.setCopyButton.bind(this), 3.0 * 1000);
    this.setCopiedButton();
  }

  setCopyButton() {
    this.#button.setAttribute('aria-label', this.#labelCopy);
    this.#button.setAttribute('data-symbol', 'copy');
    this.#button.textContent = this.#iconCopy;
  }

  setCopiedButton() {
    this.#button.setAttribute('aria-label', this.#labelCopied);
    this.#button.setAttribute('data-symbol', 'copied');
    this.#button.textContent = this.#iconCopied;
  }

  getCodeText() {
    let codeBlock = this.#preCodeBlock.querySelector("code[data-lang]");
    let codeLines = codeBlock.querySelectorAll(".line > .cl");
    let codeText = Array.from(codeLines, (elem) => elem.textContent).join("");
    return codeText;
  }
}
