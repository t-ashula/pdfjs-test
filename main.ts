import * as fs from "fs";
import * as pdfjsLib from "pdfjs-dist";

(async () => {
  const pdfPath = "20bb7.pdf";
  const pdfData = new Uint8Array(fs.readFileSync(pdfPath));

  const doc = await pdfjsLib.getDocument({
    data: pdfData,
    cMapUrl: "node_modules/pdfjs-dist/cmaps/",
    cMapPacked: true,
  }).promise;
  const page = await doc.getPage(1);
  const content = await page.getTextContent();
  const text = content.items
    .map((item) => ("str" in item ? item.str : ""))
    .join("");
  console.log(JSON.stringify({ text }));
})();
