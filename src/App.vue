<script setup>
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { onMounted, ref } from "vue";
const pdfurl = ref("");
async function modifyPdf() {
  const url = "https://pay-staging.zkeduo.com/test/2n.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  console.log("existingPdfBytes", existingPdfBytes);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  console.log(pages);
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText("This text was added with JavaScript!", {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  });

  // const pdfBytes = await pdfDoc.save();\
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

  pdfurl.value = pdfDataUri;
}
async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;
  page.drawText("this is  a  pdf demo", {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });

  // const pdfBytes = await pdfDoc.save()
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  console.log(pdfDataUri);
  document.getElementById("pdf").src = pdfDataUri;
}

async function createForm() {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([550, 750]);

  const form = pdfDoc.getForm();

  page.drawText("", { x: 50, y: 700, size: 10 });

  const superheroField = form.createTextField("test");
  // superheroField.setText('this is a form')
  superheroField.addToPage(page, { x: 55, y: 640 });
  const name = form.getTextField("test");
  console.log(name);

  // page.drawText('Select your favorite rocket:', { x: 50, y: 600, size: 20 })

  // page.drawText('Falcon Heavy', { x: 120, y: 560, size: 18 })
  // page.drawText('Saturn IV', { x: 120, y: 500, size: 18 })
  // page.drawText('Delta IV Heavy', { x: 340, y: 560, size: 18 })
  // page.drawText('Space Launch System', { x: 340, y: 500, size: 18 })

  // const rocketField = form.createRadioGroup('favorite.rocket')
  // rocketField.addOptionToPage('Falcon Heavy', page, { x: 55, y: 540 })
  // rocketField.addOptionToPage('Saturn IV', page, { x: 55, y: 480 })
  // rocketField.addOptionToPage('Delta IV Heavy', page, { x: 275, y: 540 })
  // rocketField.addOptionToPage('Space Launch System', page, { x: 275, y: 480 })
  // rocketField.select('Saturn IV')

  // page.drawText('Select your favorite gundams:', { x: 50, y: 440, size: 20 })

  // page.drawText('Exia', { x: 120, y: 400, size: 18 })
  // page.drawText('Kyrios', { x: 120, y: 340, size: 18 })
  // page.drawText('Virtue', { x: 340, y: 400, size: 18 })
  // page.drawText('Dynames', { x: 340, y: 340, size: 18 })

  // const exiaField = form.createCheckBox('gundam.exia')
  // const kyriosField = form.createCheckBox('gundam.kyrios')
  // const virtueField = form.createCheckBox('gundam.virtue')
  // const dynamesField = form.createCheckBox('gundam.dynames')

  // exiaField.addToPage(page, { x: 55, y: 380 })
  // kyriosField.addToPage(page, { x: 55, y: 320 })
  // virtueField.addToPage(page, { x: 275, y: 380 })
  // dynamesField.addToPage(page, { x: 275, y: 320 })

  // exiaField.check()
  // dynamesField.check()

  // page.drawText('Select your favorite planet*:', { x: 50, y: 280, size: 20 })

  // const planetsField = form.createDropdown('favorite.planet')
  // planetsField.addOptions(['Venus', 'Earth', 'Mars', 'Pluto'])
  // planetsField.select('Pluto')
  // planetsField.addToPage(page, { x: 55, y: 220 })

  // page.drawText('Select your favorite person:', { x: 50, y: 180, size: 18 })

  // const personField = form.createOptionList('favorite.person')
  // personField.addOptions([
  //   'Julius Caesar',
  //   'Ada Lovelace',
  //   'Cleopatra',
  //   'Aaron Burr',
  //   'Mark Antony',
  // ])
  // personField.select('Ada Lovelace')
  // personField.addToPage(page, { x: 55, y: 70 })

  // page.drawText(`* Pluto should be a planet too!`, { x: 15, y: 15, size: 15 })

  // const pdfBytes = await pdfDoc.save()
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  pdfurl.value = pdfDataUri;
  //this.pdf.value=pdfDataUri
}
function savePdf() {
  console.log(pdfurl.value);
}

onMounted(() => {
  createForm();
  //modifyPdf()
});
</script>

<template>
  <iframe :src="pdfurl"></iframe>

  <!-- <div>
    拖拽表单控件到pdf指定位置
  </div> -->

  <button @click="savePdf">保存pdf</button>
</template>

<style scoped>

</style>
