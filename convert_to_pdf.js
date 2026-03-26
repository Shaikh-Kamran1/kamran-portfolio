const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport for proper rendering
    await page.setViewport({
      width: 816,  // 8.5 inches at 96 DPI
      height: 1056 // 11 inches at 96 DPI
    });

    // Load the HTML file
    const htmlPath = path.resolve(__dirname, 'resume_latex_style.html');
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF with all links
    const pdfPath = path.resolve(__dirname, 'Kamran_Shaikh_Resume.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'letter',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: false,
      displayHeaderFooter: false
    });

    await browser.close();
    console.log(`✅ PDF created successfully: ${pdfPath}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
