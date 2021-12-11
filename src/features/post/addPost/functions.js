

  export const previewImg = (file , setpreview) => {
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);
      reader.onloadend = () => {
        setpreview((img) => {
          return [...img, reader.result];
        });
      };
    }
  };

 export  const removePreview = (img , setpreview , preview)=>{
    const filteredPreview = preview.filter((item)=>item !== img);
    setpreview(filteredPreview)
}

