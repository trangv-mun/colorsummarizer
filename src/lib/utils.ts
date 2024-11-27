/* eslint-disable  @typescript-eslint/no-explicit-any */

const getColorIndicesForCoord = (x: number, y: number, width: number) => {
  const redIdx = y * (width * 4) + x * 4;

  return [redIdx, redIdx + 1, redIdx + 2, redIdx + 3]
}

const mapColors = (origCanvas: CanvasRenderingContext2D[], origImageDatas: ImageData[], canvas: CanvasRenderingContext2D[], imageDatas: ImageData[], width: number, newWidth: number, newHeight: number, pixels: any) => {  
  const scale = newWidth / width;

  Object.keys(pixels).map((index: any) => {  

    const item = pixels[index];
    const currOrgCanva = origCanvas[item.cluster];
    const origImageData = origImageDatas[item.cluster];
    const data = origImageData.data;
    const currRedIdx = item.y * (width * 4) + item.x * 4;

    data[currRedIdx] = item.rgb[0];
    data[currRedIdx + 1] = item.rgb[1];
    data[currRedIdx + 2] = item.rgb[2];
    data[currRedIdx + 3] = 255;

    currOrgCanva?.putImageData(origImageData, 0, 0);
  });

  canvas.map((canva, i) => {
    const imageData = imageDatas[i];
    const origImageData = origImageDatas[i];
    
    /*Reference https://phoboslab.org/log/2012/09/drawing-pixels-is-hard */
    for( let y = 0; y < newHeight; y++ ) {
      for( let x = 0; x < newWidth; x++ ) {
          const index = (Math.floor(y / scale) * width + Math.floor(x / scale)) * 4;
          const indexScaled = (y * newWidth + x) * 4;
          imageData.data[indexScaled] = origImageData.data[index];
          imageData.data[indexScaled+1] = origImageData.data[index+1];
          imageData.data[indexScaled+2] = origImageData.data[index+2];
          imageData.data[indexScaled+3] = origImageData.data[index+3];
      }
    }
    canva.putImageData( imageData, 0, 0 );
  })
}

const fillMissingKeys = (obj: any) => {
  const objectKeys = Object.keys(obj);
  let keyArr: string[] = [];
  const parseObj: {[key: string]: any[]} = {};

  objectKeys.map(key => {
    keyArr = [...keyArr, ...Object.keys(obj[key])];
    parseObj[key] = [];
  })

  const minMax = getMinMax(keyArr);

  if(minMax) {
    for(let i = minMax[0]; i <= minMax[1]; i++) {
      objectKeys.map((key:string) => {
        if(obj[key][i]) {
          parseObj[key].push(obj[key][i][0])
        }
        else {
          parseObj[key].push(0)
        }
      })
    }
    return {
      data: parseObj,
      tickValues: generateRange(minMax[0], minMax[1], 10) 
    };
  }

  return null;
}

const getMinMax = (arr: any[]) => {
  if (!arr) {
    return null;
  }
  let minV = parseInt(arr[0]);
  let maxV = parseInt(arr[0]);

  for (const a of arr) {
    if (parseInt(a) < minV) minV = parseInt(a);
    if (parseInt(a) > maxV) maxV = parseInt(a);
  }

  return [minV, maxV];
};

const generateRange = (start: number, end: number, step = 10) => {
  const rangeArray = [];
  for (let i = start; i <= end; i += step) {
    rangeArray.push(i);
  }
  return rangeArray;
}

export { getColorIndicesForCoord, mapColors, fillMissingKeys, getMinMax, generateRange}