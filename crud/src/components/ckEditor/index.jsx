

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import 'ckeditor5/ckeditor5.css';
import "./index.css"



const CkEditor = ({ ckChange, values, handleBlur, touched, errors }) => {


    const toolbarConfig = {
        language: "en",
        toolbar: [
            'heading',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'undo',
            'redo',
        ],
        height: '500px', // You can set the height here
    };


    return (
        <>
            <CKEditor
                className="custom_ck_style"
                config={toolbarConfig}
                editor={ClassicEditor}
                data={values.description}
                onBlur={handleBlur}
                onChange={(event, editor) => ckChange(event, editor)}
            />
            {touched.description && errors.description ? (
                <div className="error_text">{errors.description}</div>
            ) : null}
        </>
    );
}
export default CkEditor;