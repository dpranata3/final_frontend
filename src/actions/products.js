import axios from "../config/axios";

export const onAddProduct =(pCode,pName,pDesc,pPrice,pStock,pCatg,pImg)=>{
    return async dispatch =>{
        try {
            const formData = new FormData();

            formData.append("prod_code", pCode);
            formData.append("prod_name", pName);
            formData.append("prod_desc", pDesc);
            formData.append("prod_price", pPrice);
            formData.append("curr_stock", pStock);
            formData.append("prod_catg", pCatg);
            
            if (pImg) {
              formData.append("prod_image", pImg);
            }

            const res = await axios.post("/products/add", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });

            dispatch({
                type:'ADD_PROD_SUCCESS',
                payload:'Product has been added succesfully'
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const onSaveProduct =(eCode,eName,eDesc,ePrice,eStock,eSafe,eStat,pId)=>{
  return async dispatch =>{
    try {
        const formData = new FormData();

          formData.append("prod_code", eCode);
          formData.append("prod_name", eName);
          formData.append("prod_desc", eDesc);
          formData.append("prod_price", ePrice);
        // if(eImg){
        //   formData.append("prod_image", eImg);
        // }
          formData.append("curr_stock", eStock);
          formData.append("safety_stock", eSafe);
          formData.append("prod_status", eStat);
        
      

        const res = await axios.patch(`/products/edit/${pId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        dispatch({
            type:'EDIT_PROD_SUCCESS',
            payload:'Product has been edited succesfully'
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
} 