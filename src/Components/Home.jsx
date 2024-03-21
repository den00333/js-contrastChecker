import {useEffect, useState} from 'react';
const Home = () => {
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#d8d4d4');
  const [contrast, setContrast] = useState(1);
  const [rating, setRating] = useState('Demo Text');
  const [savedColor, setSavedColor] = useState([]);

  useEffect(() => {
    contrastChecker();
  }, [textColor, bgColor]);

  const hexToRGB = (colorValue) => {
    const red = parseInt(colorValue.substring(1, 3), 16);
    const green = parseInt(colorValue.substring(3, 5), 16);
    const blue = parseInt(colorValue.substring(5, 7), 16);
    return [red, green, blue];
  };

  const getRelativeLuminance = (color) => {
    const sRGB = color.map((val) => {
      const s = val / 255;
      return s < 0.03928 ? s / 12 / 92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const calculateContrastRatio = (color1, color2) => {
    const luminance1 = getRelativeLuminance(color1);
    const luminance2 = getRelativeLuminance(color2);
  
    const light = Math.max(luminance1, luminance2);
    const dark = Math.min(luminance1, luminance2);
    const contrastVal = (light + 0.05) / (dark + 0.05);
    return contrastVal.toFixed(2);
  };

  const calcRating = (contrastVal) => {
    if (contrastVal > 12) return 'Super';
    if (contrastVal > 7) return 'Very Good';
    if (contrastVal > 5) return 'Good';
    if (contrastVal > 3) return 'Poor';
    return 'Very Poor';
  };

  const contrastChecker = () => {
    const textColorRGBArray = hexToRGB(textColor);
    const bgColorRGBArray = hexToRGB(bgColor);

    setBgColor

    const contrastVal = calculateContrastRatio(textColorRGBArray, bgColorRGBArray);
    
    setContrast(contrastVal);
    setRating(calcRating(contrastVal));
  };

  const addSavedColor = () => {
    let textAndBgColor = `${textColor}:${bgColor}:${contrast + ' ' + rating}`;
      if(!savedColor.includes(textAndBgColor)){
        setSavedColor([...savedColor, `${textColor}:${bgColor}:${contrast + ' ' + rating}`]);
      }
  }

  let reversedList = [...savedColor].reverse();
  
    return(
        <>
            <div className="container mx-auto mt-10">
                <div className="input-colors flex justify-around">
                    <div className="flex items-center mb-4">
                        <label htmlFor="text-color">Text Color: </label>
                        <input 
                            type="color" 
                            id="text-color" 
                            value={textColor} 
                            onChange={e => setTextColor(e.target.value)}
                            className='w-10 h-10 rounded border-gray-300 focus:outline-none'/>
                    </div>
                    
                    <div class="flex items-center mb-4">
                        <label htmlFor="bg-color">Background Color: </label>
                        <input 
                            type="color" 
                            id="bg-color" 
                            value={bgColor} 
                            onChange={e => setBgColor(e.target.value)}
                            className='w-10 h-10 rounded border-gray-300 focus:outline-none' />
                    </div>
                  </div>
                <div class="result mt-4">
                    <div className="p-6 text-center rounded-lg font-bold" style={{ backgroundColor: bgColor, color: textColor }}>
                    Norem ako dito madami Norem ako pero pansariling gamit ko lang 'to Norem ako dito madami                    
                      </div>
                        <p className="text-5xl text-center mt-4">{contrast}</p>
                        <p className="text-center py-2 rounded-lg">{rating}</p>
                        <p className="text-center py-2 rounded-lg">Hex for Text: {textColor}</p>
                        <p className="text-center py-2 rounded-lg">Hex for BG: {bgColor}</p>
                        
                  </div>
                  <div className='flex justify-center'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            style={{ backgroundColor: bgColor, color: textColor }}
                            onClick={addSavedColor}>Save Color</button>
                  </div>
                  <div className="flex justify-center">
                    <div className='overflow-y-auto mt-7 h-64 w-screen flex justify-center md:w-1/2 bg-gray-100 border border-gray-300 rounded-md shadow-md'>
                      
                        <ul className='pl-3'>
                        {reversedList.map((value, index) => {
                          const part = value.split(':');
                          const textC = part[0];
                          const bgC = part[1];
                          const contrAndrate = part[2];
                          return (
                            <li className='font-bold' style={{ backgroundColor: bgC, color: textC }} key={index}>{`Text ${textC} : BG ${bgC} : ${contrAndrate}`}</li>
                          );
                        })}
                        </ul>
                      </div>
                    </div>
              </div>

            
        </>
    )
}

export default Home;