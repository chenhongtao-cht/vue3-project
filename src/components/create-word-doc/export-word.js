import JSZipUtils from "jszip-utils";
import docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import ImageModule from 'docxtemplater-image-module-free'

function getDateTime() {
  const date = new Date()
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let M = date.getMinutes();
  let s = date.getSeconds();
  m = m < 10 ? `0${m}` : m
  d = d < 10 ? `0${d}` : d
  h = h < 10 ? `0${h}` : h
  M = M < 10 ? `0${M}` : M
  s = s < 10 ? `0${s}` : s
  return `${y}${m}${d}_${h}${M}${s}`
}

/**
 * 将base64格式的数据转为ArrayBuffer
 * @param {Object} dataURL base64格式的数据
 */
function base64DataURLToArrayBuffer(dataURL) {
  const base64Regex = /^data:image\/(png|jpg|jpeg|svg|svg\+xml);base64,/;
  if (!base64Regex.test(dataURL)) {
    return false;
  }
  const stringBase64 = dataURL.replace(base64Regex, "");
  let binaryString;
  if (typeof window !== "undefined") {
    binaryString = window.atob(stringBase64);
  } else {
    // eslint-disable-next-line node/no-deprecated-api
    binaryString = new Buffer(stringBase64, "base64").toString("binary");
  }
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes.buffer;
}

export function exportWordFile(templateUrl, docxData, fileName, imgSize = {}) {
  // 读取并获得模板文件的二进制内容
  JSZipUtils.getBinaryContent(
    templateUrl,
    (error, content) => {
      console.log("error, content", error, content);
      // 抛出异常
      if (error) {
        throw error;
      }
      // 图片处理
      const opts = { centered: true }
      opts.getImage = base64DataURLToArrayBuffer
      opts.getSize = function (img, tagValue, tagName) {
        // 自定义指定图像大小
        // eslint-disable-next-line no-prototype-builtins
        if (imgSize.hasOwnProperty(tagName)) {
          return imgSize[tagName];
        } else {
          return [600, 260];
        }
      }

      const imageModule = new ImageModule(opts);

      // 创建一个PizZip实例，内容为模板的内容
      const zip = new PizZip(content);
      // 创建并加载docxtemplater实例对象
      // eslint-disable-next-line new-cap
      const doc = new docxtemplater()
      doc.attachModule(imageModule);
      doc.loadZip(zip);
      doc.setOptions({
        nullGetter: function () {
          return "";
        }
      });
      // 设置模板变量的值，对象的键需要和模板上的变量名一致，值就是你要放在模板上的值
      doc.setData({
        ...docxData,
      });

      try {
        // 用模板变量的值替换所有模板变量
        doc.render();
      } catch (error) {
        // 抛出异常
        const e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        };
        console.log(JSON.stringify({ error: e }));
        throw error;
      }

      // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      const name = `${fileName}_${getDateTime()}`
      saveAs(out, name);
    }
  );
}
