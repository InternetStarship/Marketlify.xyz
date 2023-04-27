import exportHTML from '@/utils/exportHTML'
import { sanitizeFileName } from '@/utils/santizeFileName'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export function exportFunnel(funnel) {
  const pages = []
  funnel.pages.map(pageId => {
    const key = `marketlify_v3_page_${pageId}`
    const page = JSON.parse(localStorage.getItem(key))
    const html = exportHTML(page.data)
    pages.push({
      name: page.name,
      html: html,
    })
  })

  const zip = new JSZip()

  pages.forEach(page => {
    zip.file(`${sanitizeFileName(page.name)}.html`, page.html)
  })

  zip.generateAsync({ type: 'blob' }).then(blob => {
    saveAs(blob, `${sanitizeFileName(funnel.name)}.zip`)
  })
}
